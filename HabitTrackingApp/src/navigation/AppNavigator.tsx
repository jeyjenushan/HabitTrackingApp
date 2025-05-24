import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import { ActivityIndicator } from 'react-native';
import { Habit } from '../types/types';
import EditHabitScreen from '../screens/Habits/EditHabitScreen';
import LayoutScreen from '../screens/Habits/LayoutScreen';

//Navigation related steps
export type RootStackParamList = {

  Register: undefined;
  Home: undefined;
  Habits: { updatedHabit?: Habit } | undefined;
  AddHabit: undefined;
  Progress: undefined;
  EditHabit: { 
    habit: Habit;
    onSave?: (updatedHabit: Habit) => void; 
  };
  MainApp:undefined
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { user, loading } = React.useContext(AuthContext);

  if (loading) {
    return <ActivityIndicator size="large" />; 
  }

  return (
    <NavigationContainer >
         <Stack.Navigator
        initialRouteName={user ? "Home" : "Register"} 
        screenOptions={{ headerShown: false }} 
      >
        {user ? (
        
          <>
                 <Stack.Screen 
              name="MainApp" 
              component={LayoutScreen} 
            />
                 <Stack.Screen 
              name="EditHabit" 
              component={EditHabitScreen}
              options={{ 
                presentation: 'modal',
                headerShown: true,
                headerTitle: 'Edit Habit',
                    headerBackTitle: 'Cancel'
              }}
            />
                        <Stack.Screen 
              name="Home" 
              component={HomeScreen}
              options={{ 
                presentation: 'modal',
                headerShown: true,
              }}
            />

          </>
        ) : (
          <>
    
            <Stack.Screen 
            
              name="Register" 
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;