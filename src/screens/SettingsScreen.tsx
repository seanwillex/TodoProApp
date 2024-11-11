import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { setTodos } from '../store/todoSlice';
import { storeTodos } from '../utils/storage';

const SettingsScreen: React.FC = () => {
  const dispatch = useDispatch();

  const handleClearTodos = () => {
    Alert.alert(
      'Clear All Todos',
      'Are you sure you want to clear all todos? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            dispatch(setTodos([]));
            await storeTodos([]);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={handleClearTodos}
      >
        <Text style={styles.buttonText}>Clear All Todos</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  button: {
    backgroundColor: '#f44336',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SettingsScreen; 