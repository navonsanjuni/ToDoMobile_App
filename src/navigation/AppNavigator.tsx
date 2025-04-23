import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import AddTaskScreen from '../screens/AddTaskScreen'; // Import AddTaskScreen
import ProfileScreen from '../screens/ProfileScreen'; // Import ProfileScreen

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerTitle: 'Your Tasks' }}
        />
        <Stack.Screen
          name="AddTask"
          component={AddTaskScreen} // AddTaskScreen is now imported
          options={{ headerTitle: 'Add Task' }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen} // ProfileScreen is now imported
          options={{ headerTitle: 'Profile' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;