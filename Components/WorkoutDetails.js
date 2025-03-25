import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const WorkoutDetails = ({ route }) => {
    const { workout } = route.params;
    const [pokemonComments, setPokemonComments] = useState({});

    // Helper function to convert Pokemon height (decimeters) to feet
    const pokemonHeightToFeet = (height) => {
        const meters = height * 0.1;
        const feet = meters * 3.28084;
        return feet.toFixed(1);
    };

    // Helper function to convert Pokemon weight (hectograms) to pounds
    const pokemonWeightToPounds = (weight) => {
        const kg = weight * 0.1;
        const pounds = kg * 2.20462;
        return pounds.toFixed(1);
    };

    const generatePokemonComment = async (exercise) => {
        try {
            // Get a random Pokémon ID (1-151 for original Pokémon)
            const pokemonId = Math.floor(Math.random() * 151) + 1;
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
            const pokemon = await response.json();

            // Get species data for more flavor text
            const speciesResponse = await fetch(pokemon.species.url);
            const speciesData = await speciesResponse.json();

            let comment = '';
            const pokemonWeightLbs = pokemonWeightToPounds(pokemon.weight);
            const pokemonHeightFt = pokemonHeightToFeet(pokemon.height);

            if (exercise.weight) {
                const multiplier = (exercise.weight / pokemonWeightLbs).toFixed(1);
                if (exercise.weight < pokemonWeightLbs) {
                    comment = `You lifted ${exercise.weight}lbs - that's about ${multiplier}x the weight of a ${pokemon.name} (${pokemonWeightLbs}lbs)!`;
                } else {
                    comment = `Impressive! You lifted ${exercise.weight}lbs - that's ${multiplier}x heavier than a ${pokemon.name} (${pokemonWeightLbs}lbs)!`;
                }
            } else if (exercise.name.toLowerCase().includes('run') || 
                      exercise.name.toLowerCase().includes('jog') || 
                      exercise.name.toLowerCase().includes('sprint') ||
                      exercise.name.toLowerCase().includes('cardio')) {
                if (!exercise.distance) {
                    comment = `Add distance to your ${exercise.name} to see how many ${pokemon.name}s you could run past!`;
                } else {
                    // Convert distance to feet (assuming distance is in miles)
                    const distanceInFeet = exercise.distance * 5280;
                    const pokemonCount = Math.floor(distanceInFeet / pokemonHeightFt);
                    comment = `You ran ${exercise.distance} miles - that's like running past ${pokemonCount} ${pokemon.name}s lined up (each ${pokemonHeightFt}ft long)!`;
                }
            } else if (exercise.reps) {
                // Use base stats for rep comparisons
                const baseStatTotal = pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0);
                if (exercise.reps > baseStatTotal) {
                    comment = `Your ${exercise.reps} reps beat ${pokemon.name}'s total power level of ${baseStatTotal}!`;
                } else {
                    comment = `Keep pushing! A ${pokemon.name} has a power level of ${baseStatTotal}!`;
                }
            } else {
                // Get a random flavor text for general exercises
                const englishFlavorTexts = speciesData.flavor_text_entries.filter(
                    entry => entry.language.name === 'en'
                );
                const randomFlavorText = englishFlavorTexts[
                    Math.floor(Math.random() * englishFlavorTexts.length)
                ].flavor_text.replace(/\\f|\\n/g, ' ');
                
                comment = `Training like a ${pokemon.name}! ${randomFlavorText}`;
            }

            return {
                comment,
                sprite: pokemon.sprites.front_default,
                pokemonName: pokemon.name,
                types: pokemon.types.map(type => type.type.name)
            };
        } catch (error) {
            console.error('Error fetching Pokemon:', error);
            return null;
        }
    };

    useEffect(() => {
        const loadPokemonComments = async () => {
            if (workout.exercises) {
                const comments = {};
                for (const exercise of workout.exercises) {
                    comments[exercise.name] = await generatePokemonComment(exercise);
                }
                setPokemonComments(comments);
            }
        };

        loadPokemonComments();
    }, [workout]);

    return (
        <LinearGradient
            colors={['#2a2a2a', '#1f1f1f']}
            style={styles.container}
        >
            <ScrollView style={styles.scrollView}>
                {/* Header Section */}
                <View style={styles.headerSection}>
                    <Text style={styles.workoutType}>{workout.type}</Text>
                    <Text style={styles.date}>
                        {new Date(workout.date).toLocaleDateString()}
                    </Text>
                </View>

                {/* Stats Section */}
                <View style={styles.statsContainer}>
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>{workout.duration}</Text>
                        <Text style={styles.statLabel}>Minutes</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>
                            {workout.exercises ? workout.exercises.length : 0}
                        </Text>
                        <Text style={styles.statLabel}>Exercises</Text>
                    </View>
                </View>

                {/* Exercises Section */}
                {workout.exercises && workout.exercises.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Exercises</Text>
                        {workout.exercises.map((exercise, index) => (
                            <View key={index} style={styles.exerciseCard}>
                                <Text style={styles.exerciseName}>{exercise.name}</Text>
                                <View style={styles.exerciseDetails}>
                                    {exercise.sets && (
                                        <Text style={styles.exerciseText}>
                                            {exercise.sets} sets
                                        </Text>
                                    )}
                                    {exercise.reps && (
                                        <Text style={styles.exerciseText}>
                                            {exercise.reps} reps
                                        </Text>
                                    )}
                                    {exercise.weight && (
                                        <Text style={styles.exerciseText}>
                                            {exercise.weight} lbs
                                        </Text>
                                    )}
                                    {exercise.distance && (
                                        <Text style={styles.exerciseText}>
                                            {exercise.distance} miles
                                        </Text>
                                    )}
                                </View>
                                {pokemonComments[exercise.name] && (
                                    <View style={[
                                        styles.pokemonComment,
                                        pokemonComments[exercise.name].types && {
                                            borderLeftColor: getPokemonTypeColor(pokemonComments[exercise.name].types[0])
                                        }
                                    ]}>
                                        <Image 
                                            source={{ uri: pokemonComments[exercise.name].sprite }} 
                                            style={styles.pokemonSprite} 
                                        />
                                        <Text style={styles.pokemonText}>
                                            {pokemonComments[exercise.name].comment}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>
                )}

                {/* Notes Section */}
                {workout.notes && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Notes</Text>
                        <View style={styles.notesCard}>
                            <Text style={styles.notesText}>{workout.notes}</Text>
                        </View>
                    </View>
                )}
            </ScrollView>
        </LinearGradient>
    );
};

// Helper function to get color based on Pokemon type
const getPokemonTypeColor = (type) => {
    const typeColors = {
        normal: '#A8A878',
        fire: '#F08030',
        water: '#6890F0',
        electric: '#F8D030',
        grass: '#78C850',
        ice: '#98D8D8',
        fighting: '#C03028',
        poison: '#A040A0',
        ground: '#E0C068',
        flying: '#A890F0',
        psychic: '#F85888',
        bug: '#A8B820',
        rock: '#B8A038',
        ghost: '#705898',
        dragon: '#7038F8',
        dark: '#705848',
        steel: '#B8B8D0',
        fairy: '#EE99AC',
        default: '#ff0000'
    };
    return typeColors[type] || typeColors.default;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        padding: 16,
    },
    headerSection: {
        marginBottom: 24,
    },
    workoutType: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 8,
    },
    date: {
        fontSize: 16,
        color: '#ffffff',
        opacity: 0.7,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 24,
    },
    statBox: {
        backgroundColor: '#3a3a3a',
        padding: 16,
        minWidth: 120,
        alignItems: 'center',
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 14,
        color: '#ffffff',
        opacity: 0.7,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 16,
    },
    exerciseCard: {
        backgroundColor: '#3a3a3a',
        padding: 16,
        marginBottom: 8,
    },
    exerciseName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 8,
    },
    exerciseDetails: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 12,
    },
    exerciseText: {
        color: '#ffffff',
        opacity: 0.7,
    },
    pokemonComment: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#444444',
        padding: 8,
        marginTop: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#ff0000',
    },
    pokemonSprite: {
        width: 50,
        height: 50,
        marginRight: 8,
    },
    pokemonText: {
        color: '#ffffff',
        flex: 1,
        opacity: 0.9,
        fontSize: 14,
    },
    notesCard: {
        backgroundColor: '#3a3a3a',
        padding: 16,
    },
    notesText: {
        color: '#ffffff',
        opacity: 0.9,
        lineHeight: 20,
    },
});

export default WorkoutDetails; 