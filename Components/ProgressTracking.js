import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { Auth, DataStore } from 'aws-amplify';
import { Workout } from '../models';

const ProgressTracking = () => {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalWorkouts: 0,
        averageDuration: 0,
        workoutsByType: {},
    });

    useEffect(() => {
        fetchWorkouts();
    }, []);

    const fetchWorkouts = async () => {
        try {
            const user = await Auth.currentAuthenticatedUser();
            const userWorkouts = await DataStore.query(Workout, (w) => 
                w.userID.eq(user.username)
            );
            setWorkouts(userWorkouts);
            calculateStats(userWorkouts);
        } catch (error) {
            console.error('Error fetching workouts:', error);
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = (workoutData) => {
        const totalWorkouts = workoutData.length;
        const totalDuration = workoutData.reduce((sum, workout) => sum + workout.duration, 0);
        const averageDuration = totalWorkouts > 0 ? Math.round(totalDuration / totalWorkouts) : 0;

        const workoutsByType = workoutData.reduce((acc, workout) => {
            acc[workout.type] = (acc[workout.type] || 0) + 1;
            return acc;
        }, {});

        setStats({
            totalWorkouts,
            averageDuration,
            workoutsByType,
        });
    };

    const getWorkoutData = () => {
        const last7Workouts = workouts
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 7)
            .reverse();

        return {
            labels: last7Workouts.map(w => new Date(w.date).toLocaleDateString()),
            datasets: [{
                data: last7Workouts.map(w => w.duration),
            }],
        };
    };

    const getWorkoutTypeData = () => {
        const types = Object.keys(stats.workoutsByType);
        return {
            labels: types,
            datasets: [{
                data: types.map(type => stats.workoutsByType[type]),
            }],
        };
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading progress data...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.statsContainer}>
                <View style={styles.statCard}>
                    <Text style={styles.statTitle}>Total Workouts</Text>
                    <Text style={styles.statValue}>{stats.totalWorkouts}</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statTitle}>Avg. Duration</Text>
                    <Text style={styles.statValue}>{stats.averageDuration} min</Text>
                </View>
            </View>

            <Text style={styles.sectionTitle}>Workout Duration Trend</Text>
            {workouts.length > 0 ? (
                <LineChart
                    data={getWorkoutData()}
                    width={Dimensions.get('window').width - 32}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#ffffff',
                        backgroundGradientFrom: '#ffffff',
                        backgroundGradientTo: '#ffffff',
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                    }}
                    style={styles.chart}
                    bezier
                />
            ) : (
                <Text style={styles.noDataText}>No workout data available</Text>
            )}

            <Text style={styles.sectionTitle}>Workouts by Type</Text>
            {Object.keys(stats.workoutsByType).length > 0 ? (
                <BarChart
                    data={getWorkoutTypeData()}
                    width={Dimensions.get('window').width - 32}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#ffffff',
                        backgroundGradientFrom: '#ffffff',
                        backgroundGradientTo: '#ffffff',
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(52, 199, 89, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                    }}
                    style={styles.chart}
                />
            ) : (
                <Text style={styles.noDataText}>No workout type data available</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    statCard: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 10,
        marginHorizontal: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    statTitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
    },
    noDataText: {
        textAlign: 'center',
        color: '#666',
        marginVertical: 32,
        fontSize: 16,
    },
});

export default ProgressTracking; 