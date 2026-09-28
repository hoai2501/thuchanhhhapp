import React from 'react';

import {
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
};

const PrimaryButton = ({
  title,
  onPress,
}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={styles.button}>

      <Text style={styles.text}>
        {title}
      </Text>

    </Pressable>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    height: 54,
    borderRadius: 15,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },

  text: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },
});