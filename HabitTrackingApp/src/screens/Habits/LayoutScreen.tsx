import React from "react";

import { Platform } from "react-native";
import { Home, BarChart2, Plus, Settings } from "lucide-react-native";
import colors from "../../constants/colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddHabitScreen from "./AddHabitScreen";
import HabitListScreen from "./HabitListScreen";
import ProgressScreen from "./ProgressScreen";
import Setting from "./Setting";


const Tab = createBottomTabNavigator();

export default function LayoutScreen() {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.textSecondary,
      tabBarStyle: {
        backgroundColor: colors.background,
        borderTopColor: colors.border,
        paddingBottom: Platform.OS === "ios" ? 20 : 10,
        height: Platform.OS === "ios" ? 90 : 70,
      },
      headerStyle: {
        backgroundColor: colors.background,
      },
      headerTintColor: colors.text,
      tabBarLabelStyle: {
        fontSize: 12,
        marginBottom: Platform.OS === "ios" ? 0 : 5,
      },
    }}
  >
    <Tab.Screen
      name="Habits"
      component={HabitListScreen}
      options={{
        tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
      }}
    />
    <Tab.Screen
      name="Create"
      component={AddHabitScreen}
      options={{
        tabBarIcon: ({ color, size }) => <Plus size={size} color={color} />,
      }}
    />
    <Tab.Screen
      name="Progress"
      component={ProgressScreen}
      options={{
        tabBarIcon: ({ color, size }) => <BarChart2 size={size} color={color} />,
      }}
    />

<Tab.Screen
        name="settings"
        component={Setting}
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <Settings size={24} color={color} />,
        }}
      />

  </Tab.Navigator>
  );
}