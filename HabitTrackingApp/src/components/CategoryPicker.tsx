import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { HabitCategory } from "../types/types";
import colors from "../constants/colors";


interface CategoryPickerProps {
  selectedCategory: HabitCategory;
  onSelectCategory: (category: HabitCategory) => void;
}

const categories: { value: HabitCategory; label: string }[] = [
  { value: "health", label: "Health" },
  { value: "work", label: "Work" },
  { value: "personal", label: "Personal" },
  { value: "learning", label: "Learning" },
  { value: "fitness", label: "Fitness" },
];

export default function CategoryPicker({
  selectedCategory,
  onSelectCategory,
}: CategoryPickerProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Category</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.value}
            style={[
              styles.categoryButton,
              selectedCategory === category.value && {
                backgroundColor: colors.categories[category.value],
              },
            ]}
            onPress={() => onSelectCategory(category.value)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.value && styles.selectedCategoryText,
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 8,
  },
  categoriesContainer: {
    paddingVertical: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: colors.backgroundSecondary,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text,
  },
  selectedCategoryText: {
    color: colors.white,
  },
});