import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useTodo } from '../context/TodoContext';

export const SearchBar = () => {
  const { searchTodos } = useTodo();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search todos..."
        placeholderTextColor="#666"
        onChangeText={searchTodos}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
}); 