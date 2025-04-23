import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const AddTaskScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSaveTask = () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Error', 'Please enter both title and description.');
      return;
    }
  
    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
    };
  
    navigation.navigate('Home', { newTask });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Task Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task title"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Task Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter task description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveTask}>
        <Text style={styles.saveButtonText}>Save Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF9E9',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C1F26',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#EDF2F7',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#00B894',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddTaskScreen;