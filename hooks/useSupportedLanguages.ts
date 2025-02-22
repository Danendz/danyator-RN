import {useMemo, useState} from "react";
import {CONSOLE_ONLY_LANGUAGES} from "@/constants/Languages";

export const SupportedLangsObj = {
  HTML: 'html',
  JavaScript: 'javascript',
  CSS: 'css',
  Python: 'python',
} as const

export type SupportedLangsKeys = keyof typeof SupportedLangsObj;

export type SupportedLangs = typeof SupportedLangsObj[SupportedLangsKeys]

export const isConsoleLanguage = (lang: SupportedLangs) => {
  return CONSOLE_ONLY_LANGUAGES.includes(lang);
}

export const useSupportedLanguages = () => {
  const [lang, setLang] = useState<SupportedLangs>('html');

  const editorLang = useMemo(() => {
    switch (lang) {
      case 'html':
        return 'htmlbars'
      case 'css':
        return 'css'
      case 'javascript':
        return 'javascript'
      case 'python':
        return 'python'
      default:
        return 'htmlbars'
    }
  }, [lang])

  return [lang, editorLang, setLang] as const;
}