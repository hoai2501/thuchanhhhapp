import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import StudentListScreen from './screens/StudentListScreen';
import StudentDetailScreen from './screens/StudentDetailScreen';
import AddStudentScreen from './screens/AddStudentScreen';
import EditStudentScreen from './screens/EditStudentScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="StudentList"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          gestureEnabled: true,
        }}
      >
        <Stack.Screen
          name="StudentList"
          component={StudentListScreen}
        />

        <Stack.Screen
          name="StudentDetail"
          component={StudentDetailScreen}
        />

        <Stack.Screen
          name="AddStudent"
          component={AddStudentScreen}
        />

        <Stack.Screen
          name="EditStudent"
          component={EditStudentScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;