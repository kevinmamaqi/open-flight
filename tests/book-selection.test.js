import test from 'node:test'
import assert from 'node:assert/strict'
import { bookURL, readBookURL, normalizeBook, bookPlan } from '../apps/editor/book-model.js'
import { applyStudioColors, bookFromStudio, studioForBookSheet } from '../apps/editor/model-studio.js'

const page = 'https://kevinmamaqi.github.io/open-flight/book.html'
test('a cover, palettes and model order survive the printed link as independent choices', () => {
  const chosen = { lang:'es', paper:'US_LETTER', sheets:['morpho','morpho-k1','boeing-747'], coverModel:'boeing-747',
    appearances:{'boeing-747':'flag',morpho:'twilight'}, pilot:'Ana', cover:'Mi atlas' }
  const book = normalizeBook(chosen)
  const url = new URL(bookURL(book))
  assert.equal(url.search, '?lang=es')
  assert.deepEqual(normalizeBook(readBookURL(url)), book)
  assert.equal(bookPlan(book).originPages.length,2)
  assert.equal(bookPlan(book).entries[0].id,'morpho')
  assert.match(studioForBookSheet(book,'boeing-747'),/livery=flag/)
  assert.match(studioForBookSheet(book,'morpho-k1'),/appearance_id=twilight/)
  assert.match(studioForBookSheet(book,'morpho'),/appearance_id=twilight.*#design=butterfly-morpho/)
  assert.throws(()=>normalizeBook({...chosen,coverModel:'monarch'}),/cover model/)
  assert.throws(()=>normalizeBook({...chosen,appearances:{morpho:'flag'}}),/colors/)
  assert.throws(()=>normalizeBook({...chosen,appearances:JSON.parse('{"__proto__":"festival"}')}),/colors/)
  assert.deepEqual(normalizeBook(readBookURL(page+'?lang=en#m=monarch-k1&hero=unknown&a=morpho%3Ainvalid')).sheets,['monarch-k1'])
})
test('transferring a studio color preserves the family book and replaces its single previous construction', () => {
  const book = normalizeBook({sheets:['morpho-k1','boeing-747'],coverModel:'morpho-k1',cover:'Fly together',pilot:'Lili'})
  const toBook = new URL(bookFromStudio('morpho','carnival','es','US_LETTER'),page)
  const edited = normalizeBook({...book,...readBookURL(toBook),...applyStudioColors(book,toBook)})
  assert.deepEqual(edited.sheets,['morpho','boeing-747'])
  assert.equal(edited.coverModel,'morpho')
  assert.equal(edited.cover,'Fly together')
  assert.equal(edited.pilot,'Lili')
  assert.equal(edited.lang,'es')
  assert.equal(edited.paper,'US_LETTER')
  assert.equal(edited.appearances.morpho,'carnival')
  assert.deepEqual(applyStudioColors(book,page+'#flyer=morpho&paint=flag'),{})
  const both={...book,sheets:['morpho-k1','morpho','boeing-747']}
  const transferred = applyStudioColors(both,toBook)
  assert.deepEqual(transferred.sheets,both.sheets)
  assert.equal(transferred.coverModel,'morpho-k1')
})
