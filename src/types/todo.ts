export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
}

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

export interface TodoContextType {
  todos: Todo[];
  addTodo: (todo: Omit<Todo, 'id'>) => void;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
}