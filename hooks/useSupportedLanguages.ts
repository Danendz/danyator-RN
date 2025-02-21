import {useMemo, useState} from "react";

export const SupportedLangsObj = {
  HTML: 'html',
  JavaScript: 'javascript',
  CSS: 'css',
} as const

export type SupportedLangsKeys = keyof typeof SupportedLangsObj;

export type SupportedLangs = typeof SupportedLangsObj[SupportedLangsKeys]

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
      default:
        return 'htmlbars'
    }
  }, [lang])

  return [lang, editorLang, setLang] as const;
}