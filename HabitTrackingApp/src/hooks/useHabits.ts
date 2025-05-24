import { useState, useEffect, useCallback } from 'react';
import { getHabits, saveHabits, markHabitAsComplete } from '../services/habitService';
import { Habit } from '../types/types';
import { getTodayDate } from '../storage/storage';


const useHabits = (userId: string) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);


  const loadHabits = useCallback(async () => {
    try {
      setLoading(true);
      const storedHabits = await getHabits(userId);
      setHabits(storedHabits);
    } catch (error) {
      console.error('Failed to load habits:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      loadHabits();
    } else {
      setHabits([]);
    }
  }, [loadHabits, userId]);

  const addHabit = async (habit: Omit<Habit, 'id' | 'completedDates'>) => {
    const newHabit: Habit = {
      ...habit,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      completedDates: [],
    };
    const updatedHabits = [...habits, newHabit];
    await saveHabits(userId, updatedHabits);
    setHabits(updatedHabits);
    return newHabit;
  };

  const toggleHabitCompletion = async (habitId: string, date: string = getTodayDate()) => {
    try {
      // First update local state for immediate UI feedback
      const updatedHabits = habits.map(habit => {
        if (habit.id === habitId) {
          const isCompleted = habit.completedDates.includes(date);
          return {
            ...habit,
            completedDates: isCompleted
              ? habit.completedDates.filter(d => d !== date)
              : [...habit.completedDates, date],
          };
        }
        return habit;
      });
      setHabits(updatedHabits);
         const updatedHabit = updatedHabits.find(h => h.id === habitId);
    if (!updatedHabit) {
      throw new Error("Habit not found after update");
    }
      const isNowCompleted = updatedHabit.completedDates.includes(date);
      await markHabitAsComplete(userId, habitId, date,isNowCompleted);
    } catch (error) {
      console.error('Failed to toggle habit completion:', error);
      loadHabits();
    }
  };

  const deleteHabit = async (habitId: string) => {
    const updatedHabits = habits.filter(habit => habit.id !== habitId);
    await saveHabits(userId, updatedHabits);
    setHabits(updatedHabits);
  };

  const updateHabit = async (updatedHabit: Habit) => {
    const updatedHabits = habits.map(habit => 
      habit.id === updatedHabit.id ? updatedHabit : habit
    );
    await saveHabits(userId, updatedHabits);
    setHabits(updatedHabits);
  };

  return { 
    habits, 
    loading, 
    addHabit, 
    toggleHabitCompletion, 
    deleteHabit,
    updateHabit,
    refresh: loadHabits,
  };
};

export default useHabits;