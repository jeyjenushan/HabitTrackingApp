import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, Image, ScrollView } from 'react-native';
import colors from '../../constants/colors';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import { HabitFrequency } from '../../types/types';
import { updateHabit } from '../../services/habitService';
import Button from '../../components/Button';
import { AuthContext } from '../../context/AuthContext';

interface EditHabitScreenProps {
  route: RouteProp<RootStackParamList, 'EditHabit'>;
}

const EditHabitScreen = ({ route }:EditHabitScreenProps) => {
  const { habit,onSave } = route.params;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [name, setName] = useState(habit.name);
  const [frequency, setFrequency] = useState<HabitFrequency>(habit.frequency);
   const { user } = useContext(AuthContext);


    const handleFrequencyChange = (newFrequency: HabitFrequency) => {
  
      setFrequency(newFrequency);
    }

  const handleUpdate = async() => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a habit name');
      return;
    }

    const updatedHabit = { ...habit, name, frequency,completedDates:habit.completedDates };
    await updateHabit(user?.id||"" ,updatedHabit)
    if (onSave) {
      onSave(updatedHabit);
    }
    navigation.goBack();
  };
  const handleGoBack = () => {
    if (name.trim()) {
      Alert.alert(
        'Discard Changes?',
        'You have unsaved changes. Are you sure you want to go back?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Discard', onPress: () => navigation.goBack() }
        ]
      );
    } else {
      navigation.goBack();
    }
  };
  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
  >
      {/* Back Button Header */}
    <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Image source={require('../../assets/goback.png')}  style={{ width: 34, height: 32 }}/> 
        </TouchableOpacity>
        <View>
        <Text style={styles.headerTitle}>Update Habit</Text>
        </View>     
        <View style={styles.headerRightPlaceholder} />
      </View>

    <ScrollView
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      
      <View style={styles.form}>
      
      <View style={styles.inputContainer}>

      <Text style={styles.label}>Edit Habit</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Habit Name"
      />
      </View>
<View style={styles.frequencyOptions}>
<Text style={styles.label}>Frequency:</Text>
<TouchableOpacity
                style={[
                  styles.frequencyOption,
                  frequency === "daily" && styles.selectedFrequency,
                ]}
                onPress={() => handleFrequencyChange("daily")}
              >
                <Text
                  style={[
                    styles.frequencyText,
                    frequency === "daily" && styles.selectedFrequencyText,
                  ]}
                >
                  Daily
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.frequencyOption,
                  frequency === "weekly" && styles.selectedFrequency,
                ]}
                onPress={() => handleFrequencyChange("weekly")}
              >
                <Text
                  style={[
                    styles.frequencyText,
                    frequency === "weekly" && styles.selectedFrequencyText,
                  ]}
                >
                  Weekly
                </Text>
              </TouchableOpacity>
              </View>
             
<Button
            title="Update Habit"
            onPress={handleUpdate}
            disabled={!name.trim()}
            style={styles.button}
          />

    </View>


    </ScrollView>

    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({

  headerContainer: {
    marginTop:20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    textAlign:"center"
  },
  headerRightPlaceholder: {
    width: 24,
  },



  container: {
    flex: 1,
    backgroundColor: "#E8F5E9",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },


  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign:"center"
  },
  form: {
    width: "100%",
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: colors.text,
  },
  frequencyContainer: {
    marginBottom: 32,
  },
  frequencyOptions: {
    flexDirection: "row",
    marginTop: 8,
  },
  frequencyOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 8,
    marginRight: 12,
    alignItems: "center",
  },
  selectedFrequency: {
    backgroundColor: colors.primary,
  },
  frequencyText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.text,
  },
  selectedFrequencyText: {
    color: colors.white,
  },
  button: {
    marginTop: 8,
  },
});

export default EditHabitScreen;
