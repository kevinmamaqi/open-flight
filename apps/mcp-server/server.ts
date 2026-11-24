import { McpServer, ProtocolError, ProtocolErrorCode } from '@modelcontextprotocol/server'
import { serveStdio } from '@modelcontextprotocol/server/stdio'
import { parseArgs } from 'node:util'
import { Workspace } from '../../packages/product-core/workspace.ts'
import { catalog, Fault, version } from '../../packages/product-core/contracts.ts'

const { values } = parseArgs({
  options: { workspace: { type: 'string' }, 'read-only': { type: 'boolean' } },
})
if (!values.workspace) throw Error('Pass --workspace DIRECTORY to the stdio adapter.')
const workspace = new Workspace(values.workspace, values['read-only'])
serveStdio(
  () => {
    const instance = new McpServer(
      { name: 'open-flight', version },
      { capabilities: { tools: {}, resources: {} } },
    )
    const server = instance.server
    server.setRequestHandler('tools/list', () => ({
      tools: catalog.tools
        .filter((t) => workspace.can(t['x-operationId']))
        .map(({ name, title, description, inputSchema, outputSchema, annotations }) => ({
          name,
          title,
          description,
          inputSchema,
          outputSchema,
          annotations,
        })),
    }))
    server.setRequestHandler('tools/call', async (request) => {
      const tool = catalog.tools.find((t) => t.name === request.params.name)
      if (!tool) throw new ProtocolError(ProtocolErrorCode.InvalidParams, 'Unknown product tool.')
      try {
        const data = await workspace.call(tool['x-operationId'], request.params.arguments ?? {})
        return server.projectCallToolResult(
          {
            content:
              tool['x-operationId'] === 'getArtifact'
                ? [
                    {
                      type: 'resource_link',
                      name: data.ref.artifact_id,
                      uri: 'openflight://artifacts/' + data.ref.artifact_id,
                      mimeType: data.ref.media_type,
                    },
                  ]
                : [{ type: 'text', text: tool.title ?? tool.name }],
            structuredContent: { ok: true, data },
          },
          tool.outputSchema,
        )
      } catch (error) {
        const fault =
          error instanceof Fault
            ? error
            : new Fault(500, 'internal_error', 'The local request failed. Retry with the same key.')
        return server.projectCallToolResult(
          {
            isError: true,
            content: [{ type: 'text', text: fault.message }],
            structuredContent: { ok: false, error: fault.body },
          },
          tool.outputSchema,
        )
      }
    })
    server.setRequestHandler('resources/list', () => ({ resources: [] }))
    server.setRequestHandler('resources/templates/list', () => ({
      resourceTemplates: catalog.resourceTemplates.map(({ uriTemplate, name, title, description }) => ({
        uriTemplate,
        name,
        title,
        description,
      })),
    }))
    server.setRequestHandler('resources/read', (request) => {
      const uri = request.params.uri,
        match = /^openflight:\/\/artifacts\/([a-z0-9][a-z0-9_-]{0,95})$/.exec(uri)
      if (!match)
        throw new ProtocolError(
          ProtocolErrorCode.InvalidParams,
          'Use an exact Open Flight artifact URI.',
        )
      try {
        const { meta, bytes } = workspace.call('downloadArtifact', { artifact_id: match[1] })
        return { contents: [{ uri, mimeType: meta.ref.media_type, blob: bytes.toString('base64') }] }
      } catch (error) {
        if (error instanceof Fault)
          throw new ProtocolError(ProtocolErrorCode.InvalidParams, error.message, error.body)
        throw error
      }
    })
    return instance
  },
  { legacy: 'reject' },
)
