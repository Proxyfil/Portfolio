import type { string } from 'astro:schema';
import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang]: string[] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    const translations = ui[lang] as Record<string, string>;
    const fallback = ui[defaultLang] as Record<string, string>;
    return translations[key as string] ?? fallback[key as string];
  }
}