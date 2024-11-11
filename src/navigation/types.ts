import { Todo } from '../types/todo';

export type RootStackParamList = {
  Home: undefined;
  AddTodo: { todo?: Todo };
  TodoDetail: { todo: Todo };
  Settings: undefined;
};