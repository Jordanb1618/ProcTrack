import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import LoginStart from './Components/LoginStart';
import HomeScreen from './Components/HomeScreen';
import ProgressTracking from './Components/ProgressTracking';
import LogWorkout from './Components/LogWorkout';
import WorkoutDetails from './Components/WorkoutDetails';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Create a stack navigator for your workouts tab
function WorkoutsStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#2a2a2a',
                    elevation: 0,
                    shadowOpacity: 0,
                },
                headerTintColor: '#ffffff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen 
                name="Home" 
                component={HomeScreen}
                options={{
                    title: 'Workouts',
                    headerTitleAlign: 'center',
                }}
            />
            <Stack.Screen 
                name="LogWorkout" 
                component={LogWorkout}
                options={{
                    title: 'Log Workout',
                    headerTitleAlign: 'center',
                }}
            />
            <Stack.Screen 
                name="WorkoutDetails" 
                component={WorkoutDetails}
                options={{
                    title: 'Workout Details',
                    headerTitleAlign: 'center',
                }}
            />
        </Stack.Navigator>
    );
}

// Bottom tab navigator
function AppTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#2a2a2a',
                    borderTopWidth: 0,
                    elevation: 4,
                    height: 60,
                    paddingBottom: 8,
                },
                tabBarActiveTintColor: '#ffffff',
                tabBarInactiveTintColor: '#888888',
                headerShown: false,
            }}
        >
            <Tab.Screen 
                name="Workouts" 
                component={WorkoutsStack}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <View style={{ alignItems: 'center' }}>
                            <Ionicons name="barbell-outline" size={size} color={color} />
                            <Text style={{ color, fontSize: 12, marginTop: 2 }}>Workouts</Text>
                        </View>
                    ),
                    tabBarLabel: () => null,
                }}
            />
            <Tab.Screen 
                name="Progress" 
                component={ProgressTracking}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <View style={{ alignItems: 'center' }}>
                            <Ionicons name="stats-chart" size={size} color={color} />
                            <Text style={{ color, fontSize: 12, marginTop: 2 }}>Progress</Text>
                        </View>
                    ),
                    tabBarLabel: () => null,
                }}
            />
        </Tab.Navigator>
    );
}

// Root navigator: Starts with Login, then goes to AppTabs
function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName="Login"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Login" component={LoginStart} />
                <Stack.Screen name="AppTabs" component={AppTabs} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;