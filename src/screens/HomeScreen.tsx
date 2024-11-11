import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import TodoList from '../components/common/TodoList';
import { loadTodos } from '../utils/storage';
import { setTodos } from '../store/todoSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTodos = async () => {
      const storedTodos = await loadTodos();
      dispatch(setTodos(storedTodos));
    };
    fetchTodos();
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <TodoList onEditTodo={(todo) => navigation.navigate('AddTodo', { todo })} />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddTodo')}
      >
        <Icon name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#f4511e',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default HomeScreen;