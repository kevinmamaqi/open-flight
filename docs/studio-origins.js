const titles = {
  en: 'Explore the world map', es: 'Explora el mapa del mundo', ru: 'Изучить карту мира',
}
const actions = {
  en: 'Use these colors in my Flight Book', es: 'Usar estos colores en mi Libro de vuelo', ru: 'Добавить эту расцветку в мою Книгу полётов',
}
export const bookColorAction = lang => actions[lang]

export function studioOrigins(details) {
  let current, mounted, loading
  async function display() {
    if (!details.open || !current) return
    loading ??= import('./model-map.js?v=48cc97ad30d5').catch(error => { loading = undefined; throw error })
    const { mountModelMap } = await loading
    if (!details.open) return
    if (mounted?.lang === current.lang) {
      mounted.cleanup?.select?.(current.model)
      return
    }
    mounted?.cleanup?.()
    const host = details.querySelector('[data-map]')
    mounted = { lang: current.lang, cleanup: mountModelMap(host, current) }
  }
  details.addEventListener('toggle', () => { void display() })
  return (model, lang) => {
    if (!model) return
    details.querySelector('summary').textContent = titles[lang]
    if (current?.model === model && current.lang === lang) return
    current = { model, lang }
    void display()
  }
}
