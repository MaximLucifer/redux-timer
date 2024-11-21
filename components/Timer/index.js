import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useDispatch } from 'react-redux';
import { startTimer, restartTimer } from '../../redux/actions';

const Timer = () => {
  const dispatch = useDispatch();

  // Shared values for animation
  const translateX = useSharedValue(0);
  const scale = useSharedValue(1);

  // Tap gesture
  const tapGesture = Gesture.Tap().onEnd(() => {
    dispatch(startTimer());
  });

  // Long press gesture
  const longPressGesture = Gesture.LongPress()
    .minDuration(300)
    .onEnd(() => {
      dispatch(restartTimer());
    });

  // Pan gesture
  const panGesture = Gesture.Pan().onUpdate((event) => {
    translateX.value = event.translationX;
  });

  // Pinch gesture
  const pinchGesture = Gesture.Pinch().onUpdate((event) => {
    scale.value = event.scale;
  });

  // Animated styles
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: withSpring(translateX.value) },
      { scale: withSpring(scale.value) },
    ],
  }));

  return (
    <GestureDetector
      gesture={Gesture.Exclusive(
        tapGesture,
        longPressGesture,
        panGesture,
        pinchGesture
      )}
    >
      <Animated.View style={[styles.timerContainer, animatedStyle]}>
        <Text style={styles.timerText}>Use gestures on me!</Text>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Timer;
