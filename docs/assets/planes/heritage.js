// Prototype facts are shared by the workshop, atlas and printed markings.
// Il-62 sources agree on January 1963. The atlas documents their differing days.
const countries = {
  US: {en:'United States', ru:'США', es:'Estados Unidos'},
  USSR: {en:'Soviet Union', ru:'СССР', es:'Unión Soviética'},
}

function prototype(country, firstFlight, en, es, ru) {
  return {country, firstFlight, date:{en, es, ru}}
}

export const aircraftHeritage = {
  'boeing-747': prototype('US', '1969-02-09', '9 February 1969', '9 de febrero de 1969', '9 февраля 1969'),
  'douglas-dc3': prototype('US', '1935-12-17', '17 December 1935', '17 de diciembre de 1935', '17 декабря 1935'),
  'ilyushin-il62': prototype('USSR', '1963-01', 'January 1963', 'enero de 1963', 'январь 1963'),
  'tupolev-tu144': prototype('USSR', '1968-12-31', '31 December 1968', '31 de diciembre de 1968', '31 декабря 1968'),
}
export const originCountryName = id => countries[aircraftHeritage[id].country]
