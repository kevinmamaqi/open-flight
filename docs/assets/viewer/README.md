# Paper flight viewer assets

The twelve WebP textures are rasterizations of the Open Flight workshop artwork in natural, carnival, twilight and coloring palettes. The companion mesh data in `flight-butterflies.js` uses the exact same outer contours, root creases, tab hinges and slits as the printable design. The artwork is © Open Flight, free for personal and classroom use; all other rights reserved. The original paper airframes carry CERN-OHL-W-2.0. Regenerate both from the repository root with Node 24+ and ImageMagick 7.

```sh
node scripts/generate_flight_assets.ts
```

The locally hosted `three.js` is a browser ESM build of Three.js 0.187.0, used under the MIT license. Its SHA-256 is `2debb650a388ccec337c18e0560a0e153a96d8bd4e9516d873946c79589e846e`. The official npm tarball has SHA-256 `ff540832ded0cfe919764d24a3d88f3e2a05f23303f876423e4f893841e90728`. The renderer is loaded on opening the interactive lesson. A projected Canvas 2D view uses the same geometry and controls when WebGL 2 is unavailable. [MIT license](THREE-LICENSE.txt) · [Three.js source](https://github.com/mrdoob/three.js/tree/r187) · [WebGL renderer](https://threejs.org/docs/pages/WebGLRenderer.html) · [Mesh geometry](https://threejs.org/docs/pages/BufferGeometry.html)

To reproduce the build, unpack the npm tarball into a temporary directory. Beside its extracted `package` folder, create `viewer-exports.js` with this line and use Bun 1.4.2 to build it.

```js
export { WebGLRenderer, Scene, OrthographicCamera, Group, BufferGeometry, Float32BufferAttribute, Mesh, MeshLambertMaterial, DoubleSide, ShapeUtils, Vector2, Line, LineBasicMaterial, LineDashedMaterial, AmbientLight, DirectionalLight, CanvasTexture, SRGBColorSpace, Color } from './package/build/three.module.js'
```

```sh
bun build viewer-exports.js --target browser --format esm --minify --outfile three.js
```

The flight view illustrates how a bank can curve a path. Left and right are read from behind the model. The practice mat, dashed paths and airborne markers use illustration units. A physical trial supplies distance, time and direction observations. [NASA Glenn on ailerons and bank](https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/ailerons/)
