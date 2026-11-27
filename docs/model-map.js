import {modelOrigin, originModelIds, pilotStories} from './model-origins.js?v=60abccfc0f99';
import {planeCatalog} from './assets/planes/catalog.js?v=60abccfc0f99';

// Offset the labels to keep their touch targets readable. Lines lead to the sites.
const labelPositions = {
  'boeing-747': [[9, 16], [12, 16]],
  'douglas-dc3': [[9, 49], [10, 39]],
  'john-glenn': [[28, 19], [34, 20]],
  monarch: [[27, 69], [17, 52]],
  morpho: [[43, 55], [32, 52]],
  swallowtail: [[51, 16], [53, 13]],
  'ilyushin-il62': [[69, 16], [65, 11]],
  'tupolev-tu144': [[65, 46], [59, 35]],
  'yuri-gagarin': [[88, 38], [79, 23]],
  // Three 2022 champions share Hangar-7 in Salzburg; the Sky King marks Japan.
  'red-dart': [[44, 31], [41, 29]],
  'shaheen-shin': [[57, 31], [57, 29]],
  'crescent-boomerang': [[50, 38], [48, 40]],
  'sky-king': [[94, 27], [90, 17]],
};

const labels = {
  en: {
    title: 'Where flight stories happen',
    help: 'Pick a mark on the map or choose from the list.',
    list: 'Choose from the list',
    butterflies: 'Butterflies',
    airplanes: 'Civil airplanes',
    records: 'Record paper planes',
    pilots: 'Pilot stories',
    sources: 'Sources',
    locations: 'Places on the map',
    map: 'World map of flight stories',
    credits: 'Map data by Natural Earth',
    clue: 'Look closer',
    route: 'The dashed line links the endpoints of Project Bullet.',
    pilotStory: 'Pilot story',
    seeAlso: 'More history',
    back: 'Back to',
    il62: 'Il-62',
    tu144: 'Tu-144',
    gagarin: 'Gagarin',
    glenn: 'Glenn',
  },
  es: {
    title: 'Dónde ocurren las historias de vuelo',
    help: 'Toca una marca del mapa o elige en la lista.',
    list: 'Elegir en la lista',
    butterflies: 'Mariposas',
    airplanes: 'Aviones civiles',
    records: 'Aviones de papel de récord',
    pilots: 'Historias de pilotos',
    sources: 'Fuentes',
    locations: 'Lugares en el mapa',
    map: 'Mapa mundial de historias de vuelo',
    credits: 'Datos cartográficos de Natural Earth',
    clue: 'Mira de cerca',
    route: 'La línea de puntos une el inicio y el final del Proyecto Bullet.',
    pilotStory: 'Historia de un piloto',
    seeAlso: 'Más historia',
    back: 'Volver a',
    il62: 'Il-62',
    tu144: 'Tu-144',
    gagarin: 'Gagarin',
    glenn: 'Glenn',
  },
  ru: {
    title: 'Где происходили истории полёта',
    help: 'Выбери метку на карте или открой список.',
    list: 'Выбрать из списка',
    butterflies: 'Бабочки',
    airplanes: 'Пассажирские самолёты',
    records: 'Рекордные бумажные самолёты',
    pilots: 'Истории лётчиков',
    sources: 'Источники',
    locations: 'Места на карте',
    map: 'Карта мира с историями полёта',
    credits: 'Картографические данные Natural Earth',
    clue: 'Присмотрись',
    route: 'Пунктир соединяет начало и конец перелёта Project Bullet.',
    pilotStory: 'История лётчика',
    seeAlso: 'Ещё одна история',
    back: 'Вернуться к модели',
    il62: 'Ил-62',
    tu144: 'Ту-144',
    gagarin: 'Гагарин',
    glenn: 'Гленн',
  },
};

const svgNS = 'http://www.w3.org/2000/svg';
const asset = file => new URL(`./assets/origins/${file}`, import.meta.url).href;
const coords = ({lat, lon}) => [lon + 180, 90 - lat];
let mapCount = 0;

export function mountModelMap(element, {model, lang = 'en', onSelect} = {}) {
  const doc = element.ownerDocument;
  const t = labels[lang] ?? labels.en;
  const records = [...originModelIds.map(id => modelOrigin(id, lang)), ...pilotStories(lang)];
  const byId = new Map(records.map(record => [record.id, record]));
  let selectedModel = modelOrigin(model, lang)?.id ?? originModelIds[0];
  let active = selectedModel;
  const mapId = `of-model-map-${++mapCount}`;

  function node(tag, className, text) {
    const result = doc.createElement(tag);
    if (className) result.className = className;
    if (text) result.textContent = text;
    return result;
  }

  function external(label, url) {
    const link = node('a', '', label);
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener';
    return link;
  }

  function button(className, id, text) {
    const result = node('button', className, text);
    result.type = 'button';
    result.dataset.story = id;
    return result;
  }

  function svg(tag, attributes) {
    const result = doc.createElementNS(svgNS, tag);
    for (const [name, value] of Object.entries(attributes)) result.setAttribute(name, value);
    return result;
  }

  if (!doc.head.querySelector('link[data-open-flight-model-map]')) {
    const style = node('link');
    style.rel = 'stylesheet';
    style.href = new URL('./model-map.css', import.meta.url).href;
    style.dataset.openFlightModelMap = '';
    doc.head.append(style);
  }

  const wrapper = node('section', 'of-model-map');
  wrapper.setAttribute('aria-labelledby', `${mapId}-title`);
  const title = node('h2', 'of-model-map__title', t.title);
  title.id = `${mapId}-title`;
  wrapper.append(title, node('p', 'of-model-map__help', t.help));

  const layout = node('div', 'of-model-map__layout');
  const navigation = node('div', 'of-model-map__navigation');
  const detail = node('article', 'of-model-map__detail');
  const status = node('p', 'of-model-map__status');
  status.setAttribute('role', 'status');
  wrapper.append(layout, status);
  layout.append(navigation, detail);

  const figure = node('div', 'of-model-map__map');
  figure.setAttribute('role', 'group');
  figure.setAttribute('aria-label', t.map);
  const geography = node('img', 'of-model-map__geography');
  geography.src = asset('world-land.svg');
  geography.alt = '';
  geography.width = 720;
  geography.height = 360;
  const overlay = svg('svg', {viewBox: '0 0 360 180', preserveAspectRatio: 'none', 'aria-hidden': 'true'});
  overlay.classList.add('of-model-map__overlay');
  const closeTies = svg('g', {class: 'of-model-map__ties--compact'});
  const wideTies = svg('g', {class: 'of-model-map__ties--wide'});
  const route = svg('g', {});
  overlay.append(closeTies, wideTies, route);
  figure.append(geography, overlay);
  navigation.append(figure);

  const disclosure = node('details', 'of-model-map__list');
  disclosure.append(node('summary', '', t.list));
  navigation.append(disclosure, node('p', 'of-model-map__credits'));
  navigation.lastChild.append(external(t.credits, 'https://www.naturalearthdata.com/about/terms-of-use/'));

  const markerLabels = {
    'boeing-747': '747',
    'douglas-dc3': 'DC-3',
    'ilyushin-il62': t.il62,
    'tupolev-tu144': t.tu144,
    ...Object.fromEntries(planeCatalog.filter(plane => plane.record).map(plane => [plane.model_id, plane.name[lang] ?? plane.name.en])),
    'yuri-gagarin': t.gagarin,
    'john-glenn': t.glenn,
  };
  const markers = new Map();

  for (const record of records) {
    const mainPoint = record.id === 'john-glenn' ? record.locations[1] : record.locations[0];
    const [lonX, latY] = coords(mainPoint);
    const [compact, wide] = labelPositions[record.id];
    const pin = button('of-model-map__pin', record.id);
    pin.dataset.kind = record.kind;
    pin.style.setProperty('--map-pin-left', `${compact[0]}%`);
    pin.style.setProperty('--map-pin-top', `${compact[1]}%`);
    pin.style.setProperty('--map-pin-left-wide', `${wide[0]}%`);
    pin.style.setProperty('--map-pin-top-wide', `${wide[1]}%`);
    const name = `${record.model} · ${mainPoint.place}`;
    pin.setAttribute('aria-label', name);
    pin.title = name;
    const icon = node('span', 'of-model-map__marker', markerLabels[record.id]);
    if (record.kind === 'butterfly') {
      const wings = svg('svg', {viewBox: '0 0 24 20', width: 20, height: 16, 'aria-hidden': 'true'});
      wings.append(svg('path', {fill: 'currentColor', d: 'M12 8C8 1 1 0 1 6c0 4 2 6 5 6-3 1-3 5 0 6 2 1 5-1 6-4 1 3 4 5 6 4 3-1 3-5 0-6 3 0 5-2 5-6 0-6-7-5-11 2Z'}));
      icon.append(wings);
    }
    pin.append(icon);
    figure.append(pin);
    const ties = [[closeTies, compact], [wideTies, wide]].map(([group, [x, y]]) => {
      const tie = svg('g', {class: 'of-model-map__tie'});
      tie.append(
        svg('line', {x1: lonX, y1: latY, x2: x * 3.6, y2: y * 1.8}),
        svg('circle', {cx: lonX, cy: latY, r: 2.2}),
      );
      group.append(tie);
      return tie;
    });
    markers.set(record.id, ties);
  }

  const groups = [['butterfly', t.butterflies], ['airplane', t.airplanes], ['record', t.records], ['pilot', t.pilots]];
  const groupOf = record => (record.kind === 'airplane' && record.record ? 'record' : record.kind);
  for (const [kind, label] of groups) {
    const group = node('div', 'of-model-map__list-group');
    group.setAttribute('role', 'group');
    group.setAttribute('aria-label', label);
    group.append(node('p', 'of-model-map__group-title', label));
    const list = node('ul', 'of-model-map__options');
    for (const record of records.filter(record => groupOf(record) === kind)) {
      const item = node('li');
      item.append(button('of-model-map__option', record.id, record.model));
      list.append(item);
    }
    group.append(list);
    disclosure.append(group);
  }

  function renderPlaces(record) {
    const list = node('ul', 'of-model-map__places');
    for (const point of record.locations) {
      list.append(node('li', '', [point.label, point.place, point.date].filter(Boolean).join(' · ')));
    }
    const title = node('p', 'of-model-map__group-title', t.locations);
    detail.append(title, list);
    const points = record.locations.map(coords);
    if (record.id === 'john-glenn') {
      const [[x1, y1], [x2, y2]] = points;
      route.append(svg('line', {class: 'of-model-map__route', x1, y1, x2, y2}));
      detail.append(node('p', 'of-model-map__map-note', t.route));
    }
    for (const [cx, cy] of points) {
      route.append(svg('circle', {class: 'of-model-map__point', cx, cy, r: 2.9}));
    }
  }

  function render() {
    const record = byId.get(active);
    for (const control of wrapper.querySelectorAll('.of-model-map__pin, .of-model-map__option')) {
      control.setAttribute('aria-pressed', String(control.dataset.story === active));
    }
    for (const [id, ties] of markers) {
      for (const tie of ties) tie.classList.toggle('is-active', id === active);
    }
    detail.replaceChildren();
    route.replaceChildren();

    if (record.kind === 'pilot') detail.append(node('p', 'of-model-map__group-title', t.pilotStory));
    const detailsTitle = node('h3', 'of-model-map__story-title', record.model);
    detailsTitle.tabIndex = -1;
    detail.append(detailsTitle);
    if (record.scientificName) detail.append(node('p', 'of-model-map__scientific', record.scientificName));
    detail.append(node('p', 'of-model-map__dateline', `${record.date} · ${record.place}`));
    if (record.locations.length === 1) {
      detail.append(node('p', 'of-model-map__map-note', record.locations[0].label));
    }
    detail.append(node('p', '', record.story));
    const clue = node('p', 'of-model-map__clue');
    clue.append(node('strong', '', t.clue), doc.createTextNode(' ' + record.discovery));
    detail.append(clue);
    if (record.illustration) {
      const picture = node('figure', 'of-model-map__photo');
      const photo = node('img');
      photo.src = record.kind === 'butterfly'
        ? new URL(`./assets/field-guide/${record.illustration.file}`, import.meta.url).href
        : asset(record.illustration.file);
      photo.loading = 'lazy';
      photo.alt = '';
      const caption = node('figcaption', '', record.illustration.caption + ' · ');
      caption.append(external(record.illustration.credit, record.illustration.url));
      picture.append(photo, caption);
      detail.append(picture);
    }
    if (record.specimen) detail.append(node('p', 'of-model-map__map-note', record.specimen));
    if (record.locations.length > 1) {
      renderPlaces(record);
    } else {
      const point = record.locations[0];
      const [x, y] = coords(point);
      route.append(svg('circle', {class: 'of-model-map__point', cx: x, cy: y, r: 2.9}));
    }
    if (record.people.length) {
      const people = node('ul', 'of-model-map__people');
      for (const {name, role} of record.people) people.append(node('li', '', `${name} · ${role}`));
      detail.append(people);
    }
    const sources = node('div', 'of-model-map__sources');
    sources.append(node('p', 'of-model-map__group-title', t.sources));
    const sourceList = node('ul');
    for (const {label, url} of record.sources) {
      const item = node('li');
      item.append(external(label, url));
      sourceList.append(item);
    }
    sources.append(sourceList);
    detail.append(sources);

    if (record.country) {
      const related = records.find(pilot => pilot.kind === 'pilot' && pilot.country === record.country);
      const link = record.kind === 'pilot'
        ? button('of-model-map__related', selectedModel, `${t.back} ${byId.get(selectedModel).model}`)
        : button('of-model-map__related', related.id, `${t.seeAlso} · ${related.model}`);
      detail.append(link);
    }
  }

  function activate(id, fromUser) {
    if (id === active) return;
    const record = byId.get(id);
    if (!record) return;
    const changed = record.kind !== 'pilot' && id !== selectedModel;
    if (record.kind !== 'pilot') selectedModel = id;
    active = id;
    render();
    if (fromUser) status.textContent = `${record.model}. ${record.date}. ${record.place}.`;
    if (fromUser && changed) onSelect?.(id);
  }

  wrapper.addEventListener('click', event => {
    const control = event.target.closest?.('button[data-story]');
    if (!control || !wrapper.contains(control)) return;
    const detailButton = detail.contains(control);
    activate(control.dataset.story, true);
    if (detailButton) detail.querySelector('h3').focus();
  });

  render();
  element.append(wrapper);

  const cleanup = () => wrapper.remove();
  cleanup.select = id => {
    const normalized = modelOrigin(id, lang)?.id;
    if (normalized && normalized !== selectedModel) activate(normalized, false);
  };
  return cleanup;
}
