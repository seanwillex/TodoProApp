import React from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';
import { TodoItem } from '../components/TodoItem';
import { AddTodoForm } from '../components/AddTodoForm';
import { useTodo } from '../context/TodoContext';

export const TodoList = () => {
  const { filteredTodos } = useTodo();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Todo List</Text>
      </View>
      <FlatList
        data={filteredTodos}
        renderItem={({ item }) => <TodoItem todo={item} />}
        keyExtractor={item => item.id}
        style={styles.list}
      />
      <AddTodoForm />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  list: {
    flex: 1,
    padding: 16,
  },
});