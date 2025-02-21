import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressTracking = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progress Tracking</Text>
      {/* Add progress tracking elements here */}
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

export default ProgressTracking;