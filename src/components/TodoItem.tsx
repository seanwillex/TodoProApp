import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTodo } from '../context/TodoContext';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { toggleTodo, deleteTodo } = useTodo();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.checkbox, todo.completed && styles.checked]}
        onPress={() => toggleTodo(todo.id)}
      />
      <Text style={[styles.text, todo.completed && styles.completedText]}>
        {todo.title}
      </Text>
      <Text style={styles.priority}>
        {todo.priority}
      </Text>
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => deleteTodo(todo.id)}
      >
        <Text style={styles.deleteText}>×</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
    marginRight: 12,
  },
  checked: {
    backgroundColor: '#007AFF',
  },
  text: {
    flex: 1,
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#8E8E93',
  },
  priority: {
    fontSize: 12,
    marginRight: 8,
    color: '#8E8E93',
  },
  deleteButton: {
    padding: 4,
  },
  deleteText: {
    color: '#FF3B30',
    fontSize: 24,
    fontWeight: 'bold',
  },
}); 