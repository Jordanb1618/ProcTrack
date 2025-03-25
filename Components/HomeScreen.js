import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Workout } from '../models';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32; // Full width minus padding

const HomeScreen = ({ navigation }) => {
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        loadWorkouts();
    }, []);

    const loadWorkouts = async () => {
        try {
            const workoutData = await Workout.query();
            setWorkouts(workoutData);
        } catch (error) {
            console.error('Error loading workouts:', error);
        }
    };

    const renderWorkoutItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.workoutCard}
            onPress={() => navigation.navigate('WorkoutDetails', { workout: item })}
        >
            <LinearGradient
                colors={['#4a4a4a', '#303030']}
                style={styles.cardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={styles.cardContent}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.workoutType}>{item.type || 'Workout'}</Text>
                        <Text style={styles.workoutDuration}>{item.duration || 0} min</Text>
                    </View>
                    <View style={styles.cardDetails}>
                        <Text style={styles.workoutDate}>
                            {new Date(item.date || Date.now()).toLocaleDateString()}
                        </Text>
                        {item.exercises && item.exercises.length > 0 && (
                            <Text style={styles.exerciseCount}>
                                {item.exercises.length} exercises
                            </Text>
                        )}
                    </View>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );

    return (
        <LinearGradient
            colors={['#2a2a2a', '#1f1f1f']}
            style={styles.container}
        >
            <TouchableOpacity 
                style={styles.newWorkoutButton}
                onPress={() => navigation.navigate('LogWorkout')}
            >
                <LinearGradient
                    colors={['#ff0000', '#cc0000']}
                    style={styles.buttonGradient}
                >
                    <Text style={styles.newWorkoutButtonText}>Start New Workout</Text>
                </LinearGradient>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>Recent Workouts</Text>
            
            <FlatList
                data={workouts}
                renderItem={renderWorkoutItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>
                        No workouts logged yet. Start your fitness journey today!
                    </Text>
                }
            />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    listContainer: {
        gap: 1, // Minimal gap between cards
    },
    newWorkoutButton: {
        marginBottom: 20,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#ff0000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    buttonGradient: {
        padding: 16,
        alignItems: 'center',
    },
    newWorkoutButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 1,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#fff',
        textShadowColor: 'rgba(255, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    workoutCard: {
        width: CARD_WIDTH,
        height: 100, // Fixed height for rectangular cards
        marginBottom: 1, // Minimal margin for stacked effect
        overflow: 'hidden',
        elevation: 2,
        backgroundColor: '#3a3a3a', // Metallic grey base color
    },
    cardGradient: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    cardContent: {
        flex: 1,
        justifyContent: 'space-between',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    cardDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    workoutType: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    workoutDate: {
        fontSize: 14,
        color: '#ffffff',
        opacity: 0.7,
    },
    workoutDuration: {
        fontSize: 16,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    exerciseCount: {
        fontSize: 14,
        color: '#ffffff',
        opacity: 0.7,
    },
    emptyText: {
        textAlign: 'center',
        color: '#ffffff',
        marginTop: 32,
        fontSize: 16,
        opacity: 0.7,
    },
});

export default HomeScreen; 