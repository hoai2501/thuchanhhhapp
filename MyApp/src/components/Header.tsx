import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type Props = {
  title: string;
  subtitle?: string;
  onBack?: () => void;
};

const Header = ({
  title,
  subtitle,
onBack,  
}: Props) => {
  return (
    <View style={styles.header}>

      <View style={styles.row}>

        {onBack && (
          <Pressable
            onPress={onBack}
            style={styles.backButton}>

            <Text style={styles.backText}>
              ‹
            </Text>

          </Pressable>
        )}

        <View>
          <Text style={styles.title}>
            {title}
          </Text>

          {subtitle && (
            <Text style={styles.subtitle}>
              {subtitle}
            </Text>
          )}
        </View>

      </View>

    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 18,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  backText: {
    fontSize: 34,
    color: '#111827',
    marginTop: -5,
  },

  title: {
    fontSize: 27,
    fontWeight: '800',
    color: '#111827',
  },

  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
  },
});