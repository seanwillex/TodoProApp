import AsyncStorage from '@react-native-async-storage/async-storage';
import { Todo } from '../types/todo';

const STORAGE_KEY = '@todo_pro_app_todos';

export const storeTodos = async (todos: Todo[]) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error('Error saving todos:', error);
  }
};

export const loadTodos = async (): Promise<Todo[]> => {
  try {
    const todosString = await AsyncStorage.getItem(STORAGE_KEY);
    return todosString ? JSON.parse(todosString) : [];
  } catch (error) {
    console.error('Error loading todos:', error);
    return [];
  }
}; 