export type LogTypes = 'log' | 'error' | 'warn' | 'jsError' | 'unhandledrejection'

interface LogBase {
  id: string,
  type: LogTypes,
  timestamp: string,
  message: string,
}

interface JSError {
  source: string,
  lineno: number,
  colno: number,
  error: string
}

export interface LogInfo extends LogBase {
  type: 'log'
}

export interface LogError extends LogBase {
  type: 'error'
}

export interface LogWarning extends LogBase {
  type: 'warn'
}

export interface LogUnhandledRejectionError extends LogBase, JSError {
  type: 'unhandledrejection'
}

export interface LogJsError extends LogBase, JSError {
  type: 'jsError',
}

export type Log = LogInfo | LogWarning | LogError | LogUnhandledRejectionError | LogJsError;

export const isJSError = (log: Log): log is LogUnhandledRejectionError | LogJsError => {
  return ['jsError', 'unhandledrejection'].includes(log.type)
}
