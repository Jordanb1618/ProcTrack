import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LogWorkout = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log New Workout</Text>
      {/* Add form elements for logging a workout here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default LogWorkout;