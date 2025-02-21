import {LangValues} from "@/types/LangInput";

export const DefaultLangValues: LangValues = {
  html: '<div class="red">Hello Adelina</div>',
  javascript: 'console.log("Hello Adelina")',
  css: '.red {\n\tcolor: red\n}'
} as const

export const Languages = ['HTML', 'CSS', 'JavaScript'] as const

export const LanguagesMappings = {
  html: 'HTML',
  javascript: 'JavaScript',
  css: 'CSS',
} as const

