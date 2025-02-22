import {useMemo, useState} from "react";
import {LangValues} from "@/types/LangInput";
import {countNewLines} from "@/utils";

const CUSTOM_INJECTION_SCRIPT = () => {
  const script = `
  <script>
(function() {
    // Save original console functions
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;
    
    // Override console.log
    console.log = function(...args) {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'log',
        message: args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg) : arg)).join(' ')
      }));
      originalLog.apply(console, args);
    };

    // Override console.error
    console.error = function(...args) {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'error',
        message: args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg) : arg)).join(' ')
      }));
      originalError.apply(console, args);
    };

    // Override console.warn
    console.warn = function(...args) {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'warn',
        message: args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg) : arg)).join(' ')
      }));
      originalWarn.apply(console, args);
    };
    function sendError(errorData) {
      window.ReactNativeWebView.postMessage(JSON.stringify(errorData));
    }

    // Capture synchronous errors
    window.onerror = function(message, source, lineno, colno, error) {
      sendError({
        type: 'jsError',
        message: message,
        source: source,
        lineno: lineno - $script_length,
        colno: colno,
        error: error ? error.stack : ''
      });
      // Return false to allow the error to propagate as well.
      return false;
    };

    // Capture unhandled promise rejections
    window.addEventListener('unhandledrejection', function(event) {
      sendError({
        type: 'unhandledrejection',
        timestamp: event.timeStamp,
        message: event.reason ? event.reason.toString() : 'Unhandled rejection',
        source: '',
        lineno: 0,
        colno: 0,
        error: event.reason && event.reason.stack ? event.reason.stack : ''
      });
    });
    
    
    // Get page's title
    document.addEventListener('DOMContentLoaded', function() {
      window.ReactNativeWebView.postMessage(JSON.stringify({type: 'title', value: window.document.title}));
    })
  })();
    true;
</script>
`
  const newLinesCount = countNewLines(script)
  const scriptTags = 4;

  return script.replace('$script_length', `${newLinesCount + scriptTags}`);
}

export const useHtmlContent = (langInput: LangValues) => {
  const [htmlContent, setHtmlContent] = useState(`${langInput.html}\n${langInput.javascript}\n${langInput.css}`);

  const htmlContentMemo = useMemo(() => {
    return CUSTOM_INJECTION_SCRIPT() + htmlContent
  }, [htmlContent]);

  return [htmlContent, htmlContentMemo, setHtmlContent] as const;
}