import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { startTimer, restartTimer, addSecond } from '../../redux/actions';

const Timer = () => {
  const dispatch = useDispatch();
  const { isPlaying, elapsedTime, timerDuration } = useSelector(state => state);

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        dispatch(addSecond());
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{formatTime(timerDuration - elapsedTime)}</Text>
      <View style={styles.buttonsContainer}>
        {!isPlaying ? (
          <TouchableOpacity
            onPress={() => dispatch(startTimer())}
            style={styles.button}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => dispatch(restartTimer())}
            style={styles.button}>
            <Text style={styles.buttonText}>Stop</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    marginHorizontal: 10,
    padding: 15,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Timer;
