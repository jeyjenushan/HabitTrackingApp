import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity, Alert, Image } from 'react-native';
import useHabits from '../../hooks/useHabits';
import { HabitCategory, HabitFrequency } from '../../types/types';
import { AuthContext } from '../../context/AuthContext';
import CategoryPicker from '../../components/CategoryPicker';
import colors from '../../constants/colors';
import Button from '../../components/Button';




const AddHabitScreen = ({ navigation }:any) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<HabitCategory>("personal");
  const [frequency, setFrequency] = useState<HabitFrequency>("daily");
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);
  const { addHabit } = useHabits(user?.id || '');

  const handleAddHabit = () => {
    if (!name.trim()) {
      alert('Please enter a habit name');
      return;
    }
    setLoading(true)
    addHabit({
      name, frequency, category, userId: user?.id || "",
      createdAt: ''
    });
    setLoading(false)
    setName("")
    navigation.navigate('Habits', {
      name, frequency, category, userId: user?.id || "",
      createdAt: ''
    })
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


  const handleFrequencyChange = (newFrequency: HabitFrequency) => {

    setFrequency(newFrequency);
  }

  return (

    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
  >

      {/* Back Button Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Image source={require('../../assets/goback.png')}  style={{ width: 34, height: 32 }}/> // Local image
        </TouchableOpacity>
        <View>
        <Text style={styles.headerTitle}>Create New Habit</Text>
        <Text style={styles.subtitle}>
            Define a new habit you want to build
          </Text>
        </View>
     
        <View style={styles.headerRightPlaceholder} />
      </View>

    <ScrollView
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >



<View style={styles.form}>

<View style={styles.inputContainer}>
<Text style={styles.label}>Habit Name</Text>
      <TextInput
        placeholder="What habit do you want to build?"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      </View>

      <CategoryPicker
            selectedCategory={category}
            onSelectCategory={setCategory}
          />

<View style={styles.frequencyContainer}>
<Text style={styles.label}>Frequency:</Text>
<View style={styles.frequencyOptions}>

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


</View>


<Button
            title="Create Habit"
            onPress={handleAddHabit}
            loading={loading}
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

export default AddHabitScreen;

function alert(arg0: string) {
  throw new Error('Function not implemented.');
}
