import React, { useState, useContext } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, Modal } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import HabitCard from '../../components/HabitCard';
import useHabits from '../../hooks/useHabits';
import Button from '../../components/Button';
import colors from '../../constants/colors';
import { Habit } from '../../types/types';
import { AuthContext } from '../../context/AuthContext';

const HabitListScreen = ({ navigation }:any) => {
  const {user}=useContext(AuthContext)
  const { habits, loading, toggleHabitCompletion, refresh,deleteHabit } = useHabits(user?.id || " "
  );
  const [filter, setFilter] = useState<'all' | 'daily' | 'weekly'>('all');
  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      refresh();
    }, [refresh])
  );

  const handleDeleteHabit = () => {
    if (selectedHabitId) {
      deleteHabit(selectedHabitId);
      setShowDeleteModal(false);
    }
  };


  const filteredHabits = habits.filter(habit => {
    if (filter === 'all') return true;
    return habit.frequency === filter;
  });


const handleUpdateHabit = (updatedHabit: Habit) => {
  navigation.navigate({
    name: 'EditHabit', 
    params: { updatedHabit },
    merge: true
  });
};

  



  return (
    <View style={styles.container}>


   <View style={styles.uiContainer}>
   <View style={styles.filterContainer}>
  <TouchableOpacity
    onPress={() => setFilter('all')}
    style={[
      styles.filterButton, 
      filter === 'all' && styles.activeFilter
    ]}
  >
    <Text style={[
      styles.filterText,
      filter === 'all' && styles.activeFilter
    ]}>
      All
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={() => setFilter('daily')}
    style={[
      styles.filterButton, 
      filter === 'daily' && styles.activeFilter
    ]}
  >
    <Text style={[
      styles.filterText,
      filter === 'daily' && styles.activeFilter
    ]}>
      Daily
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={() => setFilter('weekly')}
    style={[
      styles.filterButton, 
      filter === 'weekly' && styles.activeFilter
    ]}
  >
    <Text style={[
      styles.filterText,
      filter === 'weekly' && styles.activeFilter
    ]}>
      Weekly
    </Text>
  </TouchableOpacity>
</View>

      <Button 
        title="Add New Habit" 
        onPress={() => navigation.navigate('Create')}
        style={styles.addButton}
      />

      {loading ? (
        <Text>Loading habits...</Text>
      ) : filteredHabits.length === 0 ? (
        <Text style={styles.emptyText}>No habits found. Add some to get started!</Text>
      ) : (

        <FlatList
          data={filteredHabits}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <HabitCard 
              habit={item} 
              onToggle={() => toggleHabitCompletion(item.id)}
              onDelete={() => {
                setSelectedHabitId(item.id);
                setShowDeleteModal(true);
              }}
              onUpdate={() => handleUpdateHabit(item)}
            />
          )}
          contentContainerStyle={styles.listContent}
        />





      )}
   </View>

   <Modal visible={showDeleteModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.text}>Are you sure you want to delete this habit?</Text>
            <View style={styles.modalButtons}>
              <Button title="Cancel"  style={styles.cancel} onPress={() => setShowDeleteModal(false)} />
              <Button title="Delete" onPress={handleDeleteHabit} style={styles.delete} />
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor:"#E8F5E9"
  },
  uiContainer:{
 marginTop:50,
  },
  progressContainer: {
    marginBottom: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  filterButton: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.gray,
  },
  activeFilter: {
    backgroundColor: colors.success,
    borderColor: colors.primary,
  },
  filterText: {
    color: colors.black,
  },
  addButton: {
    marginBottom: 20,
    backgroundColor:colors.success
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: colors.gray,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(39, 78, 24, 0.5)'
  },
  modalContent: {
    width: '80%',
    padding: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft:6,
    justifyContent:'space-between',
    alignItems:"center"
  },
  cancel:{
    backgroundColor:colors.gray,
    marginRight:3

  },
  text:{
    fontWeight:"400",
    color: colors.black,
    fontSize:18
    


  },
  delete:{
    backgroundColor:colors.error,
    marginLeft:10

  }
});

export default HabitListScreen;

