import AsyncStorage from '@react-native-async-storage/async-storage';
import { Habit } from '../types/types';
import { getTodayDate } from '../storage/storage';


const getHabitsKey = (userId: string) => `@habits_${userId}`;

export const getHabits = async (userId: string): Promise<Habit[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(getHabitsKey(userId));
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Failed to fetch habits', e);
    return [];
  }
};

export const saveHabits = async (userId: string, habits: Habit[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(habits);
    await AsyncStorage.setItem(getHabitsKey(userId), jsonValue);
  } catch (e) {
    console.error('Failed to save habits', e);
    throw e;
  }
};

export const getHabitById = async (userId: string, id: string): Promise<Habit | undefined> => {
  const habits = await getHabits(userId);
  return habits.find(habit => habit.id === id);
};

export const markHabitAsComplete = async (
  userId: string,
  habitId: string,
  date: string = getTodayDate(),
  isComplete:boolean
): Promise<void> => {
  const habits = await getHabits(userId);
  const updatedHabits = habits.map(habit => {
    if (habit.id === habitId) {
      return {
        ...habit,
        completedDates: isComplete
          ? [...habit.completedDates.filter(d => d !== date), date] 
          : habit.completedDates.filter(d => d !== date), 
      };
    }
    return habit;
  });
  await saveHabits(userId, updatedHabits);
};
export const updateHabit = async (userId: string, updatedHabit: Habit): Promise<void> => {
  const habits = await getHabits(userId);
  const updatedHabits = habits.map(habit => 
    habit.id === updatedHabit.id ? updatedHabit : habit
  );
  await saveHabits(userId, updatedHabits);
};

export const addHabit = async (userId: string, newHabit: Habit): Promise<void> => {
  const habits = await getHabits(userId);
  await saveHabits(userId, [...habits, newHabit]);
};

export const deleteHabit = async (userId: string, habitId: string): Promise<void> => {
  const habits = await getHabits(userId);
  const updatedHabits = habits.filter(habit => habit.id !== habitId);
  await saveHabits(userId, updatedHabits);
};

export const clearUserHabits = async (userId: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(getHabitsKey(userId));
  } catch (e) {
    console.error('Failed to clear habits', e);
    throw e;
  }
};

