import {isJSError, Log} from "@/types/Log";
import {StyleSheet, View, Text} from "react-native";
import {capitalizeFirstLetter} from "@/utils";
import Colors from "@/constants/Colors";

export const LogMessage = ({log}: {log: Log}) => {
  const {type, message, timestamp} = log
  const messageStyleType = `messageType${capitalizeFirstLetter(type) as Capitalize<Log['type']>}` as const;

  const textColor = type === 'log' ? Colors.primary : Colors.primaryForeground;

  if (isJSError(log)) {
    const {lineno, colno} = log

    return (
     <View style={[styles.container, styles[messageStyleType]]}>
       <View>
         <Text style={{color: Colors.primaryForeground}}>{timestamp}</Text>
       </View>
       <View style={styles.errorContainer}>
         <Text style={{color: Colors.primaryForeground}}>{message}</Text>
         <Text style={{color: Colors.primaryForeground}}>Line number: {lineno}, Column number: {colno}</Text>
       </View>
     </View>
    )
  }

  return (
      <View style={[styles.container, styles[messageStyleType]]}>
        <View>
          <Text style={{color: textColor}}>{timestamp}</Text>
        </View>
        <View>
          <Text style={{color: textColor}}>{message}</Text>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: Colors.background
  },
  messageTypeError: {
    backgroundColor: Colors.error,
  },
  messageTypeLog: {
    backgroundColor: Colors.muted
  },
  messageTypeWarn: {
    backgroundColor: Colors.warning,
  },
  messageTypeJsError: {
    backgroundColor: Colors.error,
  },
  messageTypeUnhandledrejection: {
    backgroundColor: Colors.error,
  },
  errorContainer: {
    flexDirection: "column"
  }
})