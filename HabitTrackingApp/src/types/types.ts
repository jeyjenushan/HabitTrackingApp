export type HabitFrequency = "daily" | "weekly";

export type HabitCategory = "health" | "work" | "personal" | "learning" | "fitness";



export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
  };
  
  export type Habit = {
    id: string;
    name: string;
    frequency: HabitFrequency;
    category:HabitCategory;
    createdAt: string;
    userId: string;
    completedDates: string[]; 
  };
  
  export type AuthContextType = {
    user: User | null;
    login: (user: User) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
  };


  export interface HabitWithCompletion {
    habit: Habit;
    completed: boolean;
  }
  
  export interface CategoryColors {
    health: string;
    work: string;
    personal: string;
    learning: string;
    fitness: string;
    [key: string]: string; 
  }