import {StyleSheet, View, Text, ScrollView} from 'react-native';

import CodeEditor from "@rivascva/react-native-code-editor/src";
import {CodeEditorSyntaxStyles} from "@rivascva/react-native-code-editor";
import WebView from "react-native-webview";
import {useEffect, useRef, useState} from "react";
import {SupportedLangs, useSupportedLanguages} from "@/hooks/useSupportedLanguages";
import {useLangInput} from "@/hooks/useLanguagesInput";
import {useKeyboard} from "@react-native-community/hooks";
import {useSafeAreaInsets, SafeAreaView} from "react-native-safe-area-context";
import Loading from "@/components/ui/Loading/Loading";
import {useHtmlContent} from "@/hooks/useHtmlContent";
import LanguageTabs from "@/components/ui/LanguageTabs/LanguageTabs";
import Colors from "@/constants/Colors";
import {useLogs} from "@/hooks/useLogs";
import {LogMessage} from "@/components/ui/LogMessage/LogMessage";
import {Button} from "@/components/ui/Buttons/Button";

export default function TabOneScreen() {
  const [lang, editorLang, setLang] = useSupportedLanguages()
  const [langInput, currentLangInput, saveLangInput, loadValues] = useLangInput(lang)
  const [htmlContent, htmlContentMemo, setHtmlContent] = useHtmlContent(langInput)
  const [logs, dispatchLogs, handleMessages] = useLogs()
  const [isLoading, setIsLoading] = useState(true);
  const webViewRef = useRef<WebView>(null)

  const keyboard = useKeyboard()
  const insets = useSafeAreaInsets()

  const runCode = (langContent?: typeof langInput) => {
    langContent = langContent ?? langInput;

    const html = langContent.html;
    const css = `<style>${langContent.css}</style>`;
    const js = `
    <script>
${langContent.javascript}
    </script>`;

    const content = html + css + js

    if (content === htmlContent && webViewRef.current) {
      webViewRef.current.reload();
    } else {
      setHtmlContent(() => html + css + js)
    }
  }

  const handleTabChange = (newLang: string) => {
    setLang(() => newLang as SupportedLangs);
  }

  const handleEditorChange = (value: string) => {
    if (currentLangInput !== value) {
      saveLangInput(value)
    }
  }

  useEffect(() => {
    const load = async () => {
      setIsLoading(() => true);
      const storedValues = await loadValues();
      setIsLoading(() => false);

      runCode(storedValues);
    }

    load()
  }, []);

  if (isLoading) {
    return (
      <Loading/>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.editorContainer}>
        <View>
          <LanguageTabs onTabChange={handleTabChange} selectedLang={lang}/>
        </View>
        <View style={styles.editorInner}>
          <SafeAreaView>
            <CodeEditor
              key={lang}
              onChange={(str) => handleEditorChange(str)}
              initialValue={currentLangInput}
              style={{
                ...{
                  fontSize: 20,
                  inputLineHeight: 26,
                  highlighterLineHeight: 26,
                },
                ...(keyboard.keyboardShown
                  ? {marginBottom: keyboard.keyboardHeight - insets.bottom}
                  : {}),
              }}
              language={editorLang}
              syntaxStyle={CodeEditorSyntaxStyles.atomOneDark}
              showLineNumbers
            />
          </SafeAreaView>
        </View>
      </View>
      <View style={styles.outputContainer}>
        <Button onPress={() => runCode()}><Text>Run code</Text></Button>
        <View style={styles.htmlOutput}>
          <WebView ref={webViewRef} source={{html: htmlContentMemo}} style={styles.html} onMessage={handleMessages}/>
        </View>
        <Button onPress={() => dispatchLogs({type: 'clear'})}><Text>Clear</Text></Button>
        <ScrollView style={styles.consoleOutput}>
          {logs.map((log) => {
            return <LogMessage key={log.id} log={log}/>
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: Colors.background,
  },
  editorContainer: {
    flex: 1,
    padding: 8,
  },
  editor: {
    fontSize: 20,
    borderRadius: 8,
  },
  editorInner: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  outputContainer: {
    display: 'flex',
    gap: 8,
    flex: 1,
    padding: 8
  },
  htmlOutput: {
    flex: 3,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
  consoleOutput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  html: {
    flex: 1,
  }
});
