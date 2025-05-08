import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useHabits from '../../hooks/useHabits';
import { Habit } from '../../types/types';
import ProgressChart from '../../components/ProgressChart';
import colors from '../../constants/colors';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';



const ProgressScreen = () => {
const { user } = useContext(AuthContext);

    // Refresh data when screen comes into focus

  const { habits,refresh } = useHabits(user?.id || "");

  const today = new Date().toISOString().split('T')[0];

  useFocusEffect(
    React.useCallback(() => {
      refresh();
    }, [refresh])
  );



  const calculateCompletionPercentage = (frequency: 'daily' | 'weekly') => {
    const filteredHabits = habits.filter(h => h.frequency === frequency);
    if (filteredHabits.length === 0) return 0;
    
    const completed = filteredHabits.filter(h => 
      h.completedDates.includes(today)
    ).length;
    
    return Math.round((completed / filteredHabits.length) * 100);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Progress</Text>
      
      <View style={styles.progressContainer}>
        <Text style={styles.title}>Daily Habits</Text>
        <Text style={styles.percentage}>
          {calculateCompletionPercentage('daily')}%
        </Text>
        <ProgressChart 
          percentage={calculateCompletionPercentage('daily')} 
          label="Daily Progress"
          color={colors.primary}
        />

      </View>
      
      <View style={styles.progressContainer}>
        <Text style={styles.title}>Weekly Habits</Text>
        <Text style={styles.percentage}>
          {calculateCompletionPercentage('weekly')}%
        </Text>
                <ProgressChart 
          percentage={calculateCompletionPercentage('weekly')} 
          label="Weekly Progress"
          color={colors.success}
        />

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,

  },
  header: {

    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  progressContainer: {
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  percentage: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2e86de',
  },
});

export default ProgressScreen;