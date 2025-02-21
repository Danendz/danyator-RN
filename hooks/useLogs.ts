import { useReducer } from "react";
import {Log} from "@/types/Log";
import {WebViewMessageEvent} from "react-native-webview/lib/WebViewTypes";
import {uuid} from "expo-modules-core";

type LogReducerActions =
  | { type: 'delete', id: string }
  | { type: 'add', log: Log }
  | { type: 'clear' }

const logsReducer = (state: Log[], action: LogReducerActions) => {
  switch (action.type) {
    case 'add':
      return [...state, action.log];
    case 'delete':
      return state.filter((log) => log.id !== action.id);
    case 'clear':
      return []
  }
}

export const useLogs = () => {
  const [logs, dispatch] = useReducer(logsReducer, [])

  const handleMessage = (event: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      dispatch({
        type: 'add',
        log: {
          id: uuid.v4(),
          type: data.type,
          message: data.message,
          timestamp: new Date().toLocaleTimeString(),
          error: data.error,
          lineno: data.lineno,
          source: data.source,
          colno: data.colno,
        } as Log
      })
    } catch (error) {
      console.error('Error parsing message from WebView:', error);
    }
  };

  return [logs, dispatch, handleMessage] as const;
}