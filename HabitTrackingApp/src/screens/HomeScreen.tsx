import React, { useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import colors from '../constants/colors';
import Button from '../components/Button';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen = ({ navigation }:HomeScreenProps) => {
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return <ActivityIndicator size="large" />; 
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user?.name}!</Text>
      <View style={styles.buttonContainer}>
        <View >
        <Button
        title="View Habits"
        onPress={() => navigation.navigate('MainApp')}
      />
        </View>
        <View >
        <Button
        style={styles.button}
        title="Logout"
        onPress={() => {
          logout();
          navigation.navigate('Register');
        }}
      />
        </View>
      </View>

   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor:"#E8F5E9"
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight:600
  },
  buttonContainer:{
    marginTop:15,
    width:"100%",
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around"
  },
  button:{
    backgroundColor:colors.error
  }
});

export default HomeScreen;