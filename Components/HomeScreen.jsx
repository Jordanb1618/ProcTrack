import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const workouts = [
    { id: '1', name: 'Morning Run', duration: '30 mins', date: '2025-02-20' },
    { id: '2', name: 'Yoga Session', duration: '45 mins', date: '2025-02-19' },
    // Add more workout data here
  ];

  const renderItem = ({ item }) => (
    <View style={styles.workoutItem}>
      <Text style={styles.workoutName}>{item.name}</Text>
      <Text style={styles.workoutDetails}>{item.duration} - {item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to ProcTrak</Text>
      <Button
        title="Log New Workout"
        onPress={() => navigation.navigate('LogWorkout')}
      />
      <Text style={styles.subtitle}>Recent Workouts</Text>
      <FlatList
        data={workouts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
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
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  workoutItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  workoutName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  workoutDetails: {
    fontSize: 14,
    color: '#666',
  },
});

export default HomeScreen;