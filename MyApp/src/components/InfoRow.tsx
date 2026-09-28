import React from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

type Props = {
  label: string;
  value: string;
};

const InfoRow = ({
  label,
  value,
}: Props) => {
  return (
    <View style={styles.row}>

      <Text style={styles.label}>
        {label}
      </Text>

      <Text style={styles.value}>
        {value}
      </Text>

    </View>
  );
};

export default InfoRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F2F5',
  },

  label: {
    fontSize: 13,
    color: '#6B7280',
  },

  value: {
    fontSize: 13,
    color: '#111827',
    fontWeight: '700',
    maxWidth: '62%',
    textAlign: 'right',
  },
});