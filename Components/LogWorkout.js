import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity, 
    ScrollView,
    Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Auth, DataStore } from 'aws-amplify';
import { Workout } from '../models';

const workoutTypes = [
    'Strength Training',
    'Cardio',
    'HIIT',
    'Yoga',
    'Swimming',
    'Running',
    'Cycling',
    'Other'
];

const LogWorkout = ({ navigation }) => {
    const [type, setType] = useState(workoutTypes[0]);
    const [duration, setDuration] = useState('');
    const [notes, setNotes] = useState('');
    const [exercises, setExercises] = useState([{ name: '', sets: '', reps: '', weight: '' }]);

    const addExercise = () => {
        setExercises([...exercises, { name: '', sets: '', reps: '', weight: '' }]);
    };

    const updateExercise = (index, field, value) => {
        const updatedExercises = [...exercises];
        updatedExercises[index][field] = value;
        setExercises(updatedExercises);
    };

    const saveWorkout = async () => {
        if (!duration) {
            Alert.alert('Error', 'Please enter workout duration');
            return;
        }

        try {
            const user = await Auth.currentAuthenticatedUser();
            await DataStore.save(
                new Workout({
                    userID: user.username,
                    type,
                    duration: parseInt(duration),
                    date: new Date().toISOString(),
                    notes,
                    exercises: exercises.filter(e => e.name !== ''),
                })
            );

            Alert.alert(
                'Success',
                'Workout logged successfully!',
                [{ text: 'OK', onPress: () => navigation.goBack() }]
            );
        } catch (error) {
            console.error('Error saving workout:', error);
            Alert.alert('Error', 'Failed to save workout');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>Workout Type</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={type}
                    onValueChange={(value) => setType(value)}
                    style={styles.picker}
                >
                    {workoutTypes.map((wType) => (
                        <Picker.Item key={wType} label={wType} value={wType} />
                    ))}
                </Picker>
            </View>

            <Text style={styles.label}>Duration (minutes)</Text>
            <TextInput
                style={styles.input}
                value={duration}
                onChangeText={setDuration}
                keyboardType="numeric"
                placeholder="Enter duration"
            />

            <Text style={styles.label}>Exercises</Text>
            {exercises.map((exercise, index) => (
                <View key={index} style={styles.exerciseContainer}>
                    <TextInput
                        style={styles.exerciseInput}
                        value={exercise.name}
                        onChangeText={(value) => updateExercise(index, 'name', value)}
                        placeholder="Exercise name"
                    />
                    <View style={styles.exerciseDetails}>
                        <TextInput
                            style={[styles.exerciseInput, styles.smallInput]}
                            value={exercise.sets}
                            onChangeText={(value) => updateExercise(index, 'sets', value)}
                            keyboardType="numeric"
                            placeholder="Sets"
                        />
                        <TextInput
                            style={[styles.exerciseInput, styles.smallInput]}
                            value={exercise.reps}
                            onChangeText={(value) => updateExercise(index, 'reps', value)}
                            keyboardType="numeric"
                            placeholder="Reps"
                        />
                        <TextInput
                            style={[styles.exerciseInput, styles.smallInput]}
                            value={exercise.weight}
                            onChangeText={(value) => updateExercise(index, 'weight', value)}
                            keyboardType="numeric"
                            placeholder="Weight"
                        />
                    </View>
                </View>
            ))}

            <TouchableOpacity style={styles.addButton} onPress={addExercise}>
                <Text style={styles.addButtonText}>Add Exercise</Text>
            </TouchableOpacity>

            <Text style={styles.label}>Notes</Text>
            <TextInput
                style={[styles.input, styles.notesInput]}
                value={notes}
                onChangeText={setNotes}
                placeholder="Add notes about your workout"
                multiline
            />

            <TouchableOpacity style={styles.saveButton} onPress={saveWorkout}>
                <Text style={styles.saveButtonText}>Save Workout</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    pickerContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    picker: {
        height: 50,
    },
    input: {
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 10,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    exerciseContainer: {
        marginBottom: 16,
    },
    exerciseInput: {
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 10,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    exerciseDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    smallInput: {
        flex: 1,
        marginHorizontal: 4,
    },
    notesInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    addButton: {
        backgroundColor: '#34C759',
        padding: 12,
        borderRadius: 10,
        marginBottom: 16,
    },
    addButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    saveButton: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 10,
        marginBottom: 32,
    },
    saveButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default LogWorkout; 