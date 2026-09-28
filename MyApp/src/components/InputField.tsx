import React from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type Props = {
  label: string;
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  keyboardType?: any;
};

const InputField = ({
  label,
  value,
  placeholder,
  onChangeText,
  keyboardType,
}: Props) => {
  return (
    <View style={styles.container}>

      <Text style={styles.label}>
        {label}
      </Text>

      <TextInput
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        style={styles.input}
      />

    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    marginBottom: 13,
  },

  label: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '800',
    marginBottom: 7,
  },

  input: {
    height: 48,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 13,
    color: '#111827',
    fontSize: 14,
    backgroundColor: '#FAFAFA',
  },
});