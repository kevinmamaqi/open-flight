export const sizes = { A4: [210, 297], US_LETTER: [215.9, 279.4] } as const
export type Paper = keyof typeof sizes
export type Locale = 'en' | 'ru' | 'es'
