import {useMemo, useState} from "react";
import {SupportedLangs} from "./useSupportedLanguages";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {LangValues} from "@/types/LangInput";
import {DefaultLangValues} from "@/constants/Languages";

const AUTO_SAVE_TIMEOUT = 1000;

const setLangContentToLocalStorage = async (key: SupportedLangs, value: string) => {
  await AsyncStorage.setItem(`lang_content_${key}`, value);
}

const getLangContentFromLocalStorage = async (key: SupportedLangs) => {
  return await AsyncStorage.getItem(`lang_content_${key}`);
}

const getStoredLangValues = async () => {
  const keys = Object.keys(DefaultLangValues) as SupportedLangs[];
  const entries = await Promise.all(
    keys.map(async (key) => {
      const localStorageContent = await getLangContentFromLocalStorage(key);
      return [key, localStorageContent ?? DefaultLangValues[key]];
    })
  );
  return Object.fromEntries(entries) as LangValues;
}

let saveTimeout: NodeJS.Timeout
export const useLangInput = (lang: SupportedLangs) => {
  const [langInput, setLangInput] = useState(DefaultLangValues);

  const saveLangInput = (value: string, withTimeout = true) => {
    setLangInput((prevState) => ({...prevState, [lang]: value}));

    clearTimeout(saveTimeout)
    saveTimeout = setTimeout(() => {
      setLangContentToLocalStorage(lang, value);
    }, withTimeout ? AUTO_SAVE_TIMEOUT : 0);
  }

  const currentLangInput= useMemo(() => {
    return langInput[lang];
  }, [langInput, lang])

  const loadValues = async () => {
    const storedValues = await getStoredLangValues();
    setLangInput(() => storedValues);
    return storedValues;
  }

  return [langInput, currentLangInput, saveLangInput, loadValues] as const;
}
