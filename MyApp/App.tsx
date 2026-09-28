import React, {useState} from 'react';

import {
  NavigationContainer,
} from '@react-navigation/native';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import {Student} from './src/types/student';

import {initialStudents} from './src/data/students';

import StudentListScreen from './src/screens/StudentListScreen';
import StudentDetailScreen from './src/screens/StudentDetailScreen';
import AddStudentScreen from './src/screens/AddStudentScreen';
import EditStudentScreen from './src/screens/EditStudentScreen';

type RootStackParamList = {
  StudentList: undefined;

  StudentDetail: {
    studentId: string;
  };

  AddStudent: undefined;

  EditStudent: {
    studentId: string;
  };
};

const Stack =
  createNativeStackNavigator<RootStackParamList>();

export default function App() {

  const [students, setStudents] =
    useState<Student[]>(initialStudents);

  /* THÊM */

  const addStudent = (
    student: Student,
  ) => {

    setStudents(prev => [
      student,
      ...prev,
    ]);
  };

  /* SỬA */

  const updateStudent = (
    updatedStudent: Student,
  ) => {

    setStudents(prev =>
      prev.map(student =>
        student.id ===
        updatedStudent.id
          ? updatedStudent
          : student,
      ),
    );
  };

  /* XÓA */

  const deleteStudent = (
    id: string,
  ) => {

    setStudents(prev =>
      prev.filter(
        student =>
          student.id !== id,
      ),
    );
  };

  return (

    <NavigationContainer>

      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>

        {/* MÀN 1 */}

        <Stack.Screen
          name="StudentList">

          {() => (
            <StudentListScreen
              students={students}
            />
          )}

        </Stack.Screen>

        {/* MÀN 2 */}

        <Stack.Screen
          name="StudentDetail">

          {({route}) => {

            const student =
              students.find(
                item =>
                  item.id ===
                  route.params.studentId,
              );

            if (!student) {
              return null;
            }

            return (
              <StudentDetailScreen
                student={student}
                onDelete={
                  deleteStudent
                }
              />
            );
          }}

        </Stack.Screen>

        {/* MÀN 3 */}

        <Stack.Screen
          name="AddStudent">

          {() => (
            <AddStudentScreen
              onAdd={addStudent}
            />
          )}

        </Stack.Screen>

        {/* MÀN 4 */}

        <Stack.Screen
          name="EditStudent">

          {({route}) => {

            const student =
              students.find(
                item =>
                  item.id ===
                  route.params.studentId,
              );

            if (!student) {
              return null;
            }

            return (
              <EditStudentScreen
                student={student}
                onUpdate={
                  updateStudent
                }
              />
            );
          }}

        </Stack.Screen>

      </Stack.Navigator>

    </NavigationContainer>
  );
}