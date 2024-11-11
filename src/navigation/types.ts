import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Todo } from '../types/todo';

export type RootStackParamList = {
  Home: undefined;
  AddTodo: { todo?: Todo };
  TodoDetail: { todo: Todo };
  Settings: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
export type TodoDetailRouteProp = RouteProp<RootStackParamList, 'TodoDetail'>;