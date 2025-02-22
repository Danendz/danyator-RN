import {LangValues} from "@/types/LangInput";

export const DefaultLangValues: LangValues = {
  html: '<div class="red">Hello Adelina</div>',
  javascript: 'console.log("Hello Adelina")',
  css: '.red {\n\tcolor: red\n}',
  python: `print("Hello Adelina")`,
} as const

export const Languages = ['HTML', 'CSS', 'JavaScript', 'Python'] as const

export const LanguagesMappings = {
  html: 'HTML',
  javascript: 'JavaScript',
  css: 'CSS',
  python: 'Python',
} as const

export const CONSOLE_ONLY_LANGUAGES = ['python']