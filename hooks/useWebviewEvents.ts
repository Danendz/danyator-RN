import {useReducer, useState} from "react";
import {Log} from "@/types/Log";
import {WebViewMessageEvent} from "react-native-webview/lib/WebViewTypes";
import {uuid} from "expo-modules-core";
import {Events} from "@/types/WebViewEvents";

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

const createLog = (data: Log) => {
  switch (data.type) {
    case 'log':
    case 'error':
    case 'warn':
      return {
        id: uuid.v4(),
        type: data.type,
        message: data.message,
        timestamp: new Date().toLocaleTimeString(),
      }
    case 'jsError':
    case 'unhandledrejection':
      return {
        id: uuid.v4(),
        type: data.type,
        message: data.message,
        timestamp: new Date().toLocaleTimeString(),
        error: data.error,
        lineno: data.lineno,
        source: data.source,
        colno: data.colno,
      }
  }
}

export const useWebviewEvents = () => {
  const [logs, dispatch] = useReducer(logsReducer, [])
  const [title, setTitle] = useState('')

  const handleMessage = (event: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(event.nativeEvent.data) as Events;
      switch (data.type) {
        case 'log':
        case 'error':
        case 'warn':
        case 'unhandledrejection':
        case 'jsError':
          dispatch({
            type: 'add',
            log: createLog(data),
          })
          break;
        case 'title':
          console.log(data.value)
          setTitle(() => data.value)
          break;
      }
    } catch (error) {
      console.error('Error parsing message from WebView:', error);
    }
  };

  return [logs, title, dispatch, handleMessage] as const;
}