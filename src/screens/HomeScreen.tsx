import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { TodoList } from './TodoList';
import { loadTodos, storeTodos } from '../utils/storage';
import { setTodos } from '../store/todoSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);

  useEffect(() => {
    const fetchTodos = async () => {
      const storedTodos = await loadTodos();
      dispatch(setTodos(storedTodos));
    };
    fetchTodos();
  }, [dispatch]);

  // Save todos whenever they change
  useEffect(() => {
    storeTodos(todos);
  }, [todos]);

  return (
    <View style={styles.container}>
      <TodoList />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddTodo', { todo: undefined })}
      >
        <Icon name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#007AFF',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default HomeScreen;