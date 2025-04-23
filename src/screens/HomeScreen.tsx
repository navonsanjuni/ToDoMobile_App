import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // State for tasks (initialize as an empty array)
  const [tasks, setTasks] = useState([]);

  // State for filter
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');

  // Add the new task to the task list when navigating back from AddTaskScreen
  useEffect(() => {
    if (route.params?.newTask) {
      setTasks((prevTasks) => [...prevTasks, route.params.newTask]);

      // Clear the route.params to prevent re-adding the same task
      navigation.setParams({ newTask: null });
    }
  }, [route.params?.newTask]);

  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const handleAddTask = () => {
    navigation.navigate('AddTask'); // Navigate to AddTaskScreen
  };

  const handleProfile = () => {
    navigation.navigate('Profile'); // Navigate to ProfileScreen
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Tasks</Text>
        <TouchableOpacity onPress={handleProfile}>
          <Ionicons name="person-circle-outline" size={30} color="#1C1F26" />
        </TouchableOpacity>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
          onPress={() => setFilter('all')}
        >
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'completed' && styles.activeFilter]}
          onPress={() => setFilter('completed')}
        >
          <Text style={styles.filterText}>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'pending' && styles.activeFilter]}
          onPress={() => setFilter('pending')}
        >
          <Text style={styles.filterText}>Pending</Text>
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Ionicons
              name={item.completed ? 'checkmark-circle' : 'ellipse-outline'}
              size={24}
              color={item.completed ? '#00B894' : '#FF6B6B'}
            />
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No tasks available</Text>}
      />

      {/* Add Task Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Ionicons name="add" size={30} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9E9',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1F26',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#EDF2F7',
  },
  activeFilter: {
    backgroundColor: '#00B894',
  },
  filterText: {
    color: '#1C1F26',
    fontWeight: 'bold',
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  taskTitle: {
    fontSize: 16,
    color: '#1C1F26',
  },
  emptyText: {
    textAlign: 'center',
    color: '#6B6B6B',
    marginTop: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#00B894',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default HomeScreen;