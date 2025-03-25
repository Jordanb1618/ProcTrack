import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import { Auth, DataStore } from 'aws-amplify';
import { Workout } from '../models';

const LogWorkout = ({ navigation }) => {
    const [workoutType, setWorkoutType] = useState('strength');
    const [exercises, setExercises] = useState([{ 
        name: '', 
        sets: '', 
        reps: '', 
        weight: '',
        distance: '',
        duration: '',
        laps: '',
        intensity: 'medium'
    }]);
    const [notes, setNotes] = useState('');

    const workoutTypes = {
        strength: {
            name: 'Strength Training',
            fields: ['name', 'sets', 'reps', 'weight']
        },
        cardio: {
            name: 'Cardio',
            fields: ['name', 'distance', 'duration', 'intensity']
        },
        swimming: {
            name: 'Swimming',
            fields: ['name', 'laps', 'duration', 'intensity']
        },
        hiit: {
            name: 'HIIT',
            fields: ['name', 'duration', 'intensity']
        },
        yoga: {
            name: 'Yoga',
            fields: ['name', 'duration']
        }
    };

    const intensityLevels = ['light', 'medium', 'high', 'extreme'];

    const handleExerciseChange = (index, field, value) => {
        const newExercises = [...exercises];
        newExercises[index] = {
            ...newExercises[index],
            [field]: value
        };
        setExercises(newExercises);
    };

    const addExercise = () => {
        setExercises([...exercises, { 
            name: '', 
            sets: '', 
            reps: '', 
            weight: '',
            distance: '',
            duration: '',
            laps: '',
            intensity: 'medium'
        }]);
    };

    const removeExercise = (index) => {
        const newExercises = exercises.filter((_, i) => i !== index);
        setExercises(newExercises);
    };

    const handleSubmit = async () => {
        if (exercises.length === 0) {
            console.error('No exercises entered');
            return;
        }

        try {
            const user = await Auth.currentAuthenticatedUser();
            await DataStore.save(
                new Workout({
                    userID: user.username,
                    type: workoutTypes[workoutType].name,
                    exercises: exercises.filter(e => e.name !== ''),
                    date: new Date().toISOString(),
                    notes,
                })
            );

            console.log({ workoutType, exercises, notes });
            navigation.goBack();
        } catch (error) {
            console.error('Error saving workout:', error);
            console.error('Error details:', { workoutType, exercises, notes });
            console.error('Error stack:', error.stack);
        }
    };

    const renderField = (exercise, index, field) => {
        switch (field) {
            case 'name':
                return (
                    <TextInput
                        style={styles.input}
                        placeholder="Exercise name"
                        placeholderTextColor="#888"
                        value={exercise.name}
                        onChangeText={(value) => handleExerciseChange(index, 'name', value)}
                    />
                );
            case 'sets':
                return (
                    <TextInput
                        style={styles.input}
                        placeholder="Sets"
                        placeholderTextColor="#888"
                        keyboardType="numeric"
                        value={exercise.sets}
                        onChangeText={(value) => handleExerciseChange(index, 'sets', value)}
                    />
                );
            case 'reps':
                return (
                    <TextInput
                        style={styles.input}
                        placeholder="Reps"
                        placeholderTextColor="#888"
                        keyboardType="numeric"
                        value={exercise.reps}
                        onChangeText={(value) => handleExerciseChange(index, 'reps', value)}
                    />
                );
            case 'weight':
                return (
                    <TextInput
                        style={styles.input}
                        placeholder="Weight (lbs)"
                        placeholderTextColor="#888"
                        keyboardType="numeric"
                        value={exercise.weight}
                        onChangeText={(value) => handleExerciseChange(index, 'weight', value)}
                    />
                );
            case 'distance':
                return (
                    <TextInput
                        style={styles.input}
                        placeholder="Distance (miles)"
                        placeholderTextColor="#888"
                        keyboardType="numeric"
                        value={exercise.distance}
                        onChangeText={(value) => handleExerciseChange(index, 'distance', value)}
                    />
                );
            case 'duration':
                return (
                    <TextInput
                        style={styles.input}
                        placeholder="Duration (minutes)"
                        placeholderTextColor="#888"
                        keyboardType="numeric"
                        value={exercise.duration}
                        onChangeText={(value) => handleExerciseChange(index, 'duration', value)}
                    />
                );
            case 'laps':
                return (
                    <TextInput
                        style={styles.input}
                        placeholder="Number of laps"
                        placeholderTextColor="#888"
                        keyboardType="numeric"
                        value={exercise.laps}
                        onChangeText={(value) => handleExerciseChange(index, 'laps', value)}
                    />
                );
            case 'intensity':
                return (
                    <View style={styles.pickerWrapper}>
                        <View style={styles.pickerContainer}>
                            <Picker
                                style={styles.picker}
                                selectedValue={exercise.intensity}
                                onValueChange={(value) => handleExerciseChange(index, 'intensity', value)}
                                dropdownIconColor="#ffffff"
                                mode="dropdown"
                            >
                                {intensityLevels.map((level) => (
                                    <Picker.Item 
                                        key={level} 
                                        label={level.charAt(0).toUpperCase() + level.slice(1)} 
                                        value={level}
                                        style={styles.pickerItem}
                                    />
                                ))}
                            </Picker>
                        </View>
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <LinearGradient
            colors={['#2a2a2a', '#1f1f1f']}
            style={styles.container}
        >
            <ScrollView style={styles.scrollView}>
                <Text style={styles.sectionTitle}>Select Workout Type</Text>
                <View style={styles.pickerWrapper}>
                    <View style={styles.pickerContainer}>
                        <Picker
                            style={styles.picker}
                            selectedValue={workoutType}
                            onValueChange={setWorkoutType}
                            dropdownIconColor="#ffffff"
                            mode="dropdown"
                        >
                            {Object.entries(workoutTypes).map(([key, value]) => (
                                <Picker.Item 
                                    key={key} 
                                    label={value.name} 
                                    value={key}
                                    style={styles.pickerItem}
                                />
                            ))}
                        </Picker>
                    </View>
                </View>

                {exercises.map((exercise, index) => (
                    <View key={index} style={styles.exerciseCard}>
                        <View style={styles.exerciseHeader}>
                            <Text style={styles.exerciseTitle}>Exercise {index + 1}</Text>
                            {index > 0 && (
                                <TouchableOpacity 
                                    onPress={() => removeExercise(index)}
                                    style={styles.removeButton}
                                >
                                    <Text style={styles.removeButtonText}>Remove</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                        
                        {workoutTypes[workoutType].fields.map((field) => (
                            <View key={field} style={styles.fieldContainer}>
                                {renderField(exercise, index, field)}
                            </View>
                        ))}
                    </View>
                ))}

                <TouchableOpacity 
                    style={styles.addButton} 
                    onPress={addExercise}
                >
                    <Text style={styles.buttonText}>Add Exercise</Text>
                </TouchableOpacity>

                <TextInput
                    style={[styles.input, styles.notesInput]}
                    placeholder="Add notes..."
                    placeholderTextColor="#888"
                    multiline
                    value={notes}
                    onChangeText={setNotes}
                />

                <TouchableOpacity 
                    style={styles.submitButton} 
                    onPress={handleSubmit}
                >
                    <Text style={styles.buttonText}>Save Workout</Text>
                </TouchableOpacity>
            </ScrollView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        padding: 16,
    },
    sectionTitle: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
    },
    pickerWrapper: {
        backgroundColor: '#3a3a3a',
        borderRadius: 4,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#4a4a4a',
    },
    pickerContainer: {
        backgroundColor: '#2a2a2a',
        borderRadius: 4,
        overflow: 'hidden',
    },
    picker: {
        color: '#ffffff',
        height: 50,
        backgroundColor: '#2a2a2a',
    },
    pickerItem: {
        backgroundColor: '#2a2a2a',
        color: '#ffffff',
        fontSize: 16,
    },
    exerciseCard: {
        backgroundColor: '#3a3a3a',
        padding: 16,
        marginBottom: 16,
        borderRadius: 4,
    },
    exerciseHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    exerciseTitle: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    fieldContainer: {
        marginBottom: 12,
    },
    input: {
        backgroundColor: '#2a2a2a',
        color: '#ffffff',
        padding: 12,
        borderRadius: 4,
        marginBottom: 8,
    },
    notesInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    addButton: {
        backgroundColor: '#3a3a3a',
        padding: 16,
        borderRadius: 4,
        alignItems: 'center',
        marginBottom: 16,
    },
    submitButton: {
        backgroundColor: '#ff0000',
        padding: 16,
        borderRadius: 4,
        alignItems: 'center',
        marginBottom: 32,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    removeButton: {
        backgroundColor: '#ff0000',
        padding: 8,
        borderRadius: 4,
    },
    removeButtonText: {
        color: '#ffffff',
        fontSize: 14,
    },
});

export default LogWorkout; 