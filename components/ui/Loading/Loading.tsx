import {Animated, Easing, StyleSheet, View} from "react-native";
import {useEffect, useRef} from "react";

export default function Loading() {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start()
  }, [rotateAnim]);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const animatedStyle = {
    transform: [{ rotate: rotateInterpolate }],
  }
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circle, animatedStyle]} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  circle: {
    width: 50,
    height: 50,
    borderWidth: 5,
    borderRadius: 25,
    borderLeftColor: 'black',
    borderRightColor: 'black',
    borderBottomColor: 'black',
    borderTopColor: 'white',
  }
})