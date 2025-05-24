import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Habit } from '../types/types';
import colors from '../constants/colors';

interface HabitCardProps {
  habit: Habit;
  onToggle: () => void;
  onDelete: () => void;
  onUpdate: () => void;
}

const HabitCard = ({ habit, onToggle,onDelete,onUpdate }:HabitCardProps) => {
  const today = new Date().toISOString().split('T')[0];
  const isCompleted = habit.completedDates.includes(today);

  return (
    <View style={[styles.container, isCompleted && styles.completed]}>
      <View style={styles.content}>
        <Text style={styles.name}>{habit.name}</Text>
        <Text style={styles.frequency}>{habit.frequency}</Text>
        <Text style={styles.frequency}>{habit.category}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, isCompleted && styles.buttonCompleted]}
          onPress={onToggle}
        >
          <Text style={styles.buttonText}>
            {isCompleted ? 'Completed' : 'Mark Complete'}
          </Text>
        </TouchableOpacity>
<View style={styles.buttonContainer2}>

<TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
       <Image source={require("../assets/deleteicon.png")} 
       style={{ width: 24, height: 24,tintColor:colors.error }}
       
       />
        </TouchableOpacity>


        <TouchableOpacity style={styles.updateButton} onPress={onUpdate} >
        <Image source={require("../assets/edit.jpeg")}
              style={{ width: 24, height: 24,borderColor:colors.gray }}
        />
        </TouchableOpacity>

</View>


      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer:{
    flexDirection:"column",
    justifyContent:"space-around",
    alignItems:"center"
    
  },
  buttonContainer2:{
    marginTop:3,
    flexDirection:"row",justifyContent:"space-around",
    alignItems:"center"
  },
  deleteButton:{
     marginLeft:6,
     marginRight:12
  },
  updateButton:{

  },


  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  completed: {
    backgroundColor: '#e8f5e9',
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  frequency: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    padding: 10,
    backgroundColor: colors.gray,
    borderRadius: 5,
  },
  buttonCompleted: {
    backgroundColor: '#4caf50',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HabitCard;