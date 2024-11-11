import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { useDispatch } from 'react-redux';
import { updateTodo, deleteTodo } from '../store/todoSlice';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'TodoDetail'>;
  route: RouteProp<RootStackParamList, 'TodoDetail'>;
};

const TodoDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { todo } = route.params;
  const dispatch = useDispatch();
  
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dueDate, setDueDate] = useState<Date | undefined>(
    todo.dueDate ? new Date(todo.dueDate) : undefined
  );

  const handleUpdateDueDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDueDate(selectedDate);
      dispatch(updateTodo({
        ...todo,
        dueDate: selectedDate.toISOString(),
        updatedAt: new Date().toISOString(),
      }));
    }
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
    navigation.goBack();
  };

  const handleToggleComplete = () => {
    dispatch(updateTodo({
      ...todo,
      completed: !todo.completed,
      updatedAt: new Date().toISOString(),
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{todo.title}</Text>
        
        {todo.description && (
          <Text style={styles.description}>{todo.description}</Text>
        )}

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Status:</Text>
            <TouchableOpacity
              style={[styles.statusButton, todo.completed && styles.completedButton]}
              onPress={handleToggleComplete}
            >
              <Text style={styles.statusText}>
                {todo.completed ? 'Completed' : 'Pending'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Priority:</Text>
            <View style={[styles.priorityBadge, styles[`priority${todo.priority}`]]}>
              <Text style={styles.priorityText}>
                {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
              </Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Due Date:</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateText}>
                {dueDate ? dueDate.toLocaleDateString() : 'Set due date'}
              </Text>
            </TouchableOpacity>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={dueDate || new Date()}
              mode="datetime"
              display="default"
              onChange={handleUpdateDueDate}
              minimumDate={new Date()}
            />
          )}
        </View>

        <View style={styles.dateInfo}>
          <Text style={styles.dateInfoText}>
            Created: {new Date(todo.createdAt).toLocaleDateString()}
          </Text>
          <Text style={styles.dateInfoText}>
            Last Updated: {new Date(todo.updatedAt).toLocaleDateString()}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete}
        >
          <Icon name="delete" size={20} color="#fff" />
          <Text style={styles.deleteButtonText}>Delete Todo</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1a1a1a',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
    lineHeight: 24,
  },
  detailsContainer: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    width: 100,
    color: '#666',
  },
  statusButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#FFF3DC',
  },
  completedButton: {
    backgroundColor: '#E5F9E7',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#947600',
  },
  priorityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  prioritylow: {
    backgroundColor: '#E5F9E7',
  },
  prioritymedium: {
    backgroundColor: '#FFF3DC',
  },
  priorityhigh: {
    backgroundColor: '#FFE5E5',
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '600',
  },
  dateButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
  },
  dateText: {
    fontSize: 14,
    color: '#007AFF',
  },
  dateInfo: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 16,
    marginTop: 16,
  },
  dateInfoText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF3B30',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default TodoDetailScreen; 