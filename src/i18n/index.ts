import en from './en.json';
import es from './es.json';
import ptBR from './pt-br.json';

export const locales = ['en', 'es', 'pt-br'] as const;
export type Locale = (typeof locales)[number];
export const dictionaries = { en, es, 'pt-br': ptBR } satisfies Record<Locale, typeof en>;
export const languageTags = { en: 'en', es: 'es', 'pt-br': 'pt-BR' };
