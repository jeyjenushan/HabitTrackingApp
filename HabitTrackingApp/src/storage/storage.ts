import AsyncStorage from "@react-native-async-storage/async-storage";

export const getTodayDate = (): string => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };
  
  export const getCurrentWeekDates = (): string[] => {
    const dates: string[] = [];
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - dayOfWeek);
  
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
  
    return dates;
  };
  
  export const clearAllData = async (): Promise<void> => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.error('Failed to clear storage', e);
      throw e;
    }
  };