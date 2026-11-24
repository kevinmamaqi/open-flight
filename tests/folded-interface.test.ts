import assert from 'node:assert/strict'
import test from 'node:test'
import { classicComparisonPdf, foldedButterflyPlan } from '../packages/product-core/folded-butterflies.ts'
import { makeFoldedButterfly } from '../packages/folded-butterfly/index.ts'
import { sha256 } from '../packages/geometry/butterfly.ts'
import { workshopModels } from '../packages/geometry/workshop.ts'
import { revision } from '../packages/product-core/edition.ts'
import { sheetFor } from '../packages/product-core/aircraft.ts'
import { pdf } from '../packages/print-export/sheets.ts'

test('a matching original uses the exact W1 sheet for an unchanged model and the selected edits for a custom pair',()=>{
  for(const model of workshopModels){
    const plan=makeFoldedButterfly({species:model.species,paper:'US_LETTER'},'es')
    const original=revision(model.model,model.baseline_revision,model.name,model.parameters,model.appearance_id,null,'original','2026-11-23T00:00:00Z',model.species)
    assert.equal(sha256(classicComparisonPdf(plan)),sha256(pdf(sheetFor(original.dto,'US_LETTER','es'))))
    const tuned=makeFoldedButterfly({species:model.species,paper:'US_LETTER',span_mm:184,appearance_id:'carnival'},'es')
    const rendered=foldedButterflyPlan(tuned,'es','classic_pdf')
    assert.equal(rendered.output.sha256,sha256(classicComparisonPdf(tuned)))
    assert.notEqual(rendered.output.sha256,sha256(classicComparisonPdf(plan)))
    assert.equal(rendered.output.encoding,'base64')
    assert.equal(rendered.flat_span_mm,200)
    assert.equal(rendered.evidence_state,'concept')
  }
})
