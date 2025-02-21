import {StyleSheet, Text, TextStyle, StyleProp, ViewStyle, TouchableOpacity} from 'react-native';
import Colors from "@/constants/Colors";
import React from "react";
import StyleValues from "@/constants/StyleValues";

interface Props {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

export const Button = ({onPress, style, textStyle, children}: Props) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      activeOpacity={0.7}
      onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary,
    ...StyleValues.button,
    height: 36,
    justifyContent: 'center',

  },
  buttonText: {
    color: Colors.primaryForeground,
    fontWeight: 500,
  }
})