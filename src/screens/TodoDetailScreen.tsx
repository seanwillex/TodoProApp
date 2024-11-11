import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { useTodo } from '../context/TodoContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'TodoDetail'>;
  route: RouteProp<RootStackParamList, 'TodoDetail'>;
};

const TodoDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { todo } = route.params;
  const { updateTodo, deleteTodo } = useTodo();

  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [dueDate, setDueDate] = useState<Date | undefined>(todo.dueDate);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = () => {
    if (!title.trim()) return;

    updateTodo({
      ...todo,
      title: title.trim(),
      description: description.trim(),
      dueDate,
    });
    navigation.goBack();
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
    navigation.goBack();
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDueDate(selectedDate);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Todo Title"
          placeholderTextColor="#8E8E93"
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Description"
          multiline
          numberOfLines={4}
          placeholderTextColor="#8E8E93"
        />
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateButtonText}>
            {dueDate ? dueDate.toLocaleDateString() : 'Set Due Date'}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={dueDate || new Date()}
            mode="date"
            display="default"
            onChange={onDateChange}
            minimumDate={new Date()}
          />
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Icon name="save" size={20} color="#FFFFFF" />
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Icon name="delete" size={20} color="#FFFFFF" />
            <Text style={styles.buttonText}>Delete Todo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Created: {new Date(todo.createdAt).toLocaleDateString()}
          </Text>
          <Text style={styles.infoText}>
            Status: {todo.completed ? 'Completed' : 'Pending'}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  form: {
    padding: 16,
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 16,
    color: '#000000',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  dateButton: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  dateButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: 12,
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    flexDirection: 'row',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  infoContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
});

export default TodoDetailScreen; 