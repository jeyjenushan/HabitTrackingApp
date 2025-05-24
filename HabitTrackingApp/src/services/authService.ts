import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/types';
import { clearUserHabits } from './habitService';

const USER_KEY = '@user';

export const registerUser = async (name: string, email: string, password: string): Promise<User> => {
  const user = {
    id: Date.now().toString(),
    name,
    email,
    password,
  };
  await storeUser(user);
  return user;
};

export const loginUser = async (email: string, password: string): Promise<User | null> => {
  const user = await getUser();
  if (user && user.email === email && user.password === password) {
    return user;
  }
  throw new Error('Invalid email or password');
};

export const storeUser = async (user: User): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(user);
    await AsyncStorage.setItem(USER_KEY, jsonValue);
  } catch (e) {
    console.error('Failed to save user', e);
    throw e;
  }
};

export const getUser = async (): Promise<User | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(USER_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Failed to fetch user', e);
    throw e;
  }
};

export const clearUser = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
  } catch (e) {
    console.error('Failed to remove user', e);
    throw e;
  }
};


export const clearAllUserData = async (userId: string): Promise<void> => {
  try {

    await AsyncStorage.removeItem(USER_KEY);
    await clearUserHabits(userId);
  } catch (e) {
    console.error('Failed to clear user data', e);
    throw e;
  }
};