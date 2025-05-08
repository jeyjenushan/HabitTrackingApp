import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

interface InputFieldProps extends TextInputProps {
  // You can add custom props here if needed
}

const InputField: React.FC<InputFieldProps> = (props) => {
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor="#999"
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    padding: 15,
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: '#fff',
  },
});

export default InputField;