import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import LoginStart from './Components/LoginStart';
import HomeScreen from './Components/HomeScreen';
import ProgressTracking from './Components/ProgressTracking';
import LogWorkout from './Components/LogWorkout'; // Create this as needed

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Create a stack navigator for your workouts tab
function WorkoutsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="LogWorkout" component={LogWorkout} />
    </Stack.Navigator>
  );
}

// Bottom tab navigator
function AppTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Workouts" component={WorkoutsStack} />
      <Tab.Screen name="Progress" component={ProgressTracking} />
    </Tab.Navigator>
  );
}

// Root navigator: Starts with Login, then goes to AppTabs
function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginStart} options={{ headerShown: false }} />
        <Stack.Screen name="AppTabs" component={AppTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;