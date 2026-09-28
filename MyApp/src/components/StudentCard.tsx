import React from 'react';

import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {Student} from '../types/student';
import {getRank} from '../utils/studentUtils';

type Props = {
  student: Student;
  onPress: () => void;
};

const StudentCard = ({
  student,
  onPress,
}: Props) => {

  const rank = getRank(student.gpa);

  return (
    <Pressable
      onPress={onPress}
      style={styles.card}>

      <View style={styles.avatar}>

        <Text style={styles.avatarText}>
          {student.name.charAt(0)}
        </Text>

      </View>

      <View style={styles.info}>

        <View style={styles.nameRow}>

          <Text
            style={styles.name}
            numberOfLines={1}>

            {student.name}

          </Text>

          <View
            style={[
              styles.rankBadge,
              {
                backgroundColor:
                  rank.background,
              },
            ]}>

            <Text
              style={[
                styles.rankText,
                {
                  color: rank.color,
                },
              ]}>

              {rank.name}

            </Text>

          </View>

        </View>

        <Text style={styles.id}>
          {student.id} • {student.className}
        </Text>

        <View style={styles.bottom}>

          <Text style={styles.gpaLabel}>
            GPA
          </Text>

          <Text
            style={[
              styles.gpa,
              {
                color: rank.color,
              },
            ]}>

            {student.gpa.toFixed(1)}

          </Text>

          <Text style={styles.arrow}>
            ›
          </Text>

        </View>

      </View>

    </Pressable>
  );
};

export default StudentCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    marginBottom: 11,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEF0F4',
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  avatarText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#4F46E5',
  },

  info: {
    flex: 1,
  },

  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
    marginRight: 8,
  },

  rankBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },

  rankText: {
    fontSize: 11,
    fontWeight: '800',
  },

  id: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 5,
  },

  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },

  gpaLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '700',
  },

  gpa: {
    fontSize: 14,
    fontWeight: '900',
    marginLeft: 5,
  },

  arrow: {
    fontSize: 24,
    color: '#9CA3AF',
    marginLeft: 'auto',
  },
});