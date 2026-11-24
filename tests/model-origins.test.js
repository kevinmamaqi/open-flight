import assert from 'node:assert/strict';
import {test} from 'node:test';

import {planeCatalog} from '../apps/editor/assets/planes/catalog.js';
import {modelOrigin, originModelIds, pilotStories, relatedPilotStories} from '../apps/editor/model-origins.js';

test('each workshop model has localized atlas content, places and sources', () => {
  const butterflies = ['monarch', 'morpho', 'swallowtail'];
  const planeIds = planeCatalog.map(plane => plane.model_id);
  assert.deepEqual([...originModelIds].sort(), [...butterflies, ...planeIds].sort());
  for (const lang of ['en', 'es', 'ru']) {
    for (const id of originModelIds) {
      const entry = modelOrigin(id, lang);
      assert.ok(entry.model && entry.place && entry.date && entry.story && entry.discovery);
      if (lang !== 'en') assert.notEqual(entry.story, modelOrigin(id, 'en').story);
      assert.ok(entry.sources.every(({label, url}) => label && new URL(url).protocol === 'https:'));
      assert.ok(entry.locations.every(({lat, lon}) => Math.abs(lat) <= 90 && Math.abs(lon) <= 180));
    }
    for (const id of butterflies) {
      const habitat = modelOrigin(id, lang);
      assert.deepEqual(modelOrigin(id + '-k1', lang), habitat);
      assert.ok(habitat.scientificName && habitat.specimen);
      assert.ok(['wintering', 'habitat'].includes(habitat.locations[0].kind));
      assert.deepEqual(relatedPilotStories(id, lang), []);
    }
  }
  assert.equal(modelOrigin('ilyushin-il62').firstFlight, '1963-01');
  assert.equal(modelOrigin('invalid'), null);
});

test('historical pilots share country context while retaining their separate events', () => {
  const [gagarin, glenn] = pilotStories();
  assert.deepEqual(gagarin.locations.map(place => place.kind), ['training', 'spaceflight']);
  assert.match(gagarin.locations[1].place, /Kazakhstan/);
  assert.deepEqual(glenn.locations.map(place => place.kind), ['takeoff', 'landing']);
  assert.equal(relatedPilotStories('douglas-dc3')[0].id, glenn.id);
  assert.equal(relatedPilotStories('tupolev-tu144')[0].id, gagarin.id);
  assert.equal(modelOrigin(gagarin.id), null);
});
