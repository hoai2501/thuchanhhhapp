import React, {useState} from 'react';

import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import Header from '../components/Header';
import StudentCard from '../components/StudentCard';

import {Student} from '../types/student';

type Props = {
  students: Student[];
};

const StudentListScreen = ({
  students,
}: Props) => {

  const navigation =
    useNavigation<any>();

  const [keyword, setKeyword] =
    useState('');

  const filteredStudents =
    students.filter(student => {

      const search =
        keyword.toLowerCase().trim();

      return (
        student.id
          .toLowerCase()
          .includes(search) ||

        student.name
          .toLowerCase()
          .includes(search)
      );
    });

  return (
    <View style={styles.container}>

      <Header
        title="Quản lý sinh viên"
        subtitle={`${students.length} sinh viên trong hệ thống`}
      />

      <View style={styles.content}>

        {/* TÌM KIẾM */}

        <View style={styles.searchBox}>

          <Text style={styles.icon}>
            ⌕
          </Text>

          <TextInput
            value={keyword}
            onChangeText={setKeyword}
            placeholder="Tìm theo mã hoặc họ tên..."
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
          />

        </View>

        {/* TIÊU ĐỀ */}

        <View style={styles.toolbar}>

          <Text style={styles.title}>
            Danh sách sinh viên
          </Text>

          <Text
            style={styles.add}
            onPress={() =>
              navigation.navigate('AddStudent')
            }>

            ＋ Thêm

          </Text>

        </View>

        {/* FLATLIST */}

        <FlatList
          data={filteredStudents}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 30,
          }}
          renderItem={({item}) => (

            <StudentCard
              student={item}
              onPress={() =>
                navigation.navigate(
                  'StudentDetail',
                  {
                    studentId: item.id,
                  },
                )
              }
            />

          )}
        />

      </View>

    </View>
  );
};

export default StudentListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FC',
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
  },

  searchBox: {
    height: 52,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 18,
  },

  icon: {
    fontSize: 25,
    color: '#6B7280',
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
  },

  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },

  add: {
    backgroundColor: '#111827',
    color: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 12,
    fontWeight: '700',
  },
});