import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Alert } from 'react-native';
import { Todo } from '../types/todo';
import { storeTodos, loadTodos } from '../utils/storage';

interface TodoContextType {
  todos: Todo[];
  filteredTodos: Todo[];
  addTodo: (title: string, priority: Todo['priority'], dueDate?: Date) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, updates: Partial<Todo>) => void;
  searchTodos: (query: string) => void;
  filterByPriority: (priority: Todo['priority'] | 'all') => void;
  filterByStatus: (status: 'all' | 'completed' | 'active') => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<'all' | Todo['priority']>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'active'>('all');

  useEffect(() => {
    loadInitialTodos();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [todos, searchQuery, priorityFilter, statusFilter]);

  const loadInitialTodos = async () => {
    const savedTodos = await loadTodos();
    setTodos(savedTodos);
  };

  const saveTodosToStorage = async (updatedTodos: Todo[]) => {
    await storeTodos(updatedTodos);
  };

  const addTodo = (title: string, priority: Todo['priority'], dueDate?: Date) => {
    const now = new Date().toISOString();
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: now,
      updatedAt: now,
      priority,
      dueDate: dueDate?.toISOString()
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    saveTodosToStorage(updatedTodos);
  };

  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    saveTodosToStorage(updatedTodos);
  };

  const deleteTodo = (id: string) => {
    Alert.alert(
      "Delete Todo",
      "Are you sure you want to delete this todo?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const updatedTodos = todos.filter(todo => todo.id !== id);
            setTodos(updatedTodos);
            saveTodosToStorage(updatedTodos);
          }
        }
      ]
    );
  };

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id
        ? {
            ...todo,
            ...updates,
            updatedAt: new Date().toISOString()
          }
        : todo
    );
    setTodos(updatedTodos);
    saveTodosToStorage(updatedTodos);
  };

  const searchTodos = (query: string) => {
    setSearchQuery(query);
  };

  const filterByPriority = (priority: Todo['priority'] | 'all') => {
    setPriorityFilter(priority);
  };

  const filterByStatus = (status: 'all' | 'completed' | 'active') => {
    setStatusFilter(status);
  };

  const applyFilters = () => {
    let filtered = [...todos];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(todo => todo.priority === priorityFilter);
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(todo =>
        statusFilter === 'completed' ? todo.completed : !todo.completed
      );
    }

    setFilteredTodos(filtered);
  };

  return (
    <TodoContext.Provider value={{
      todos,
      filteredTodos,
      addTodo,
      toggleTodo,
      deleteTodo,
      updateTodo,
      searchTodos,
      filterByPriority,
      filterByStatus
    }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};