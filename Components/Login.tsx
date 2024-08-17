import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

interface LoginScreenProps extends TextInputProps {
  placeholder: string;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ placeholder, ...props }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#888"
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default LoginScreen;
