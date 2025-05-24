import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import {  registerUser } from '../../services/authService';
import colors from '../../constants/colors';
import Button from '../../components/Button';

const RegisterScreen = ({ navigation }:any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[loading,setLoading]=useState(false)
  const [isFocused, setIsFocused] = useState(false);
  const { login } = useContext(AuthContext);

  const handleRegister = async () => {
    setLoading(true)
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill all fields');
     
      return;
    }
  
    try {
      const user = await registerUser(name, email, password);
      if (user) {
        login(user)
        navigation.navigate('Home');
      }
    } catch (error:any) {
      Alert.alert('Registration Failed', error.message);
    }finally{
      setLoading(false)
    }
  };

  return (

    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
  >
    <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >

<View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Sign up to start building better habits
          </Text>
        </View>

        <View style={styles.form}>
    

<View style={styles.inputContainer}>
<TextInput
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        style={[
          styles.input,
          isFocused && styles.focusedInput 
        ]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
</View>
  
<View style={styles.inputContainer}>
      <TextInput
      
        placeholder="Enter your emailAddress"
        value={email}
        onChangeText={setEmail}
        style={[
          styles.input,
          isFocused && styles.focusedInput 
        ]}
        keyboardType="email-address"
        autoCapitalize="none"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      </View>

      <View style={styles.inputContainer}>
      <TextInput
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={[
          styles.input,
          isFocused && styles.focusedInput 
        ]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
</View>

<Button
            title="Create Account"
            onPress={handleRegister}
            loading={loading}
            style={styles.button}
          />

      </View>
  

    
    </ScrollView>
    
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor:"#E8F5E9"
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: "center",
  },
  header:{
    marginBottom:40
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color:colors.text
  },
subtitle:{
  fontSize:16,
  color:colors.textSecondary,
  textAlign: 'center',
},
form:{
  width:"100%"
},
inputContainer:{
  marginBottom:20
},
  input: {
    color: colors.text,
   borderColor:  colors.info,
    borderWidth: 1,
 
    padding: 16,
    borderRadius: 8,
    fontSize: 16,
  },
  focusedInput: {
    borderColor: "#0052CC", // Dark blue when focused
  },
  button:{
    marginTop:16
  }
});

export default RegisterScreen;