import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

interface InputFieldProps extends TextInputProps {

}

const InputField = (props:InputFieldProps) => {
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