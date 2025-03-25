import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const LoginStart = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        navigation.replace('AppTabs');
    };

    const handleSignUp = () => {
        navigation.replace('AppTabs');
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#3a3a3a', '#2a2a2a']}
                style={styles.gradient}
            >
                <View style={styles.contentContainer}>
                    <View style={styles.logoContainer}>
                        <Text style={styles.title}>ProcTrak</Text>
                        <Text style={styles.subtitle}>Track Your Progress</Text>
                    </View>

                    <View style={styles.formContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="#888"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="#888"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                        
                        <TouchableOpacity 
                            style={styles.button}
                            onPress={handleLogin}
                        >
                            <LinearGradient
                                colors={['#4a4a4a', '#3a3a3a']}
                                style={styles.buttonGradient}
                            >
                                <Text style={styles.buttonText}>LOGIN</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.button}
                            onPress={handleSignUp}
                        >
                            <LinearGradient
                                colors={['#4a4a4a', '#3a3a3a']}
                                style={styles.buttonGradient}
                            >
                                <Text style={styles.buttonText}>SIGN UP</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={[styles.button, styles.demoButton]}
                            onPress={() => navigation.replace('AppTabs')}
                        >
                            <LinearGradient
                                colors={['#4a4a4a', '#3a3a3a']}
                                style={styles.buttonGradient}
                            >
                                <Text style={styles.buttonText}>DEMO MODE</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 60,
    },
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#ffffff',
        textShadowColor: 'rgba(255, 255, 255, 0.3)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 20,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#888',
        letterSpacing: 2,
    },
    formContainer: {
        width: '100%',
        paddingHorizontal: 20,
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#4a4a4a',
        color: '#fff',
        fontSize: 16,
    },
    button: {
        marginBottom: 15,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    buttonGradient: {
        padding: 15,
        alignItems: 'center',
    },
    demoButton: {
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 2,
    },
});

export default LoginStart; 