import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Todo } from '../types/todo';
import { RootStackParamList } from '../types';
import { toggleTodo, deleteTodo } from '../store/todoSlice';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePress = () => {
    navigation.navigate('TodoDetail', { todo });
  };

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <TouchableOpacity 
          style={[styles.checkbox, todo.completed && styles.checked]}
          onPress={handleToggle}
        />
        <View style={styles.contentContainer}>
          <Text style={[styles.title, todo.completed && styles.completedText]}>
            {todo.title}
          </Text>
          {todo.description && (
            <Text style={styles.description} numberOfLines={2}>
              {todo.description}
            </Text>
          )}
          <View style={styles.detailsContainer}>
            <Text style={[styles.priority, styles[`priority${todo.priority}`]]}>
              {todo.priority}
            </Text>
            {todo.dueDate && (
              <Text style={styles.dueDate}>
                Due: {new Date(todo.dueDate).toLocaleDateString()}
              </Text>
            )}
          </View>
        </View>
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={handleDelete}
        >
          <Text style={styles.deleteText}>×</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
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
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priority: {
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 8,
  },
  prioritylow: {
    backgroundColor: '#E5F9E7',
    color: '#1D8E3E',
  },
  prioritymedium: {
    backgroundColor: '#FFF3DC',
    color: '#947600',
  },
  priorityhigh: {
    backgroundColor: '#FFE5E5',
    color: '#D72C0D',
  },
  dueDate: {
    fontSize: 12,
    color: '#666',
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
  deleteText: {
    color: '#FF3B30',
    fontSize: 24,
    fontWeight: 'bold',
  },
});