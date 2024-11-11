import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { addTodo, updateTodo } from '../store/todoSlice';

type AddTodoScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AddTodo'>;
  route: RouteProp<RootStackParamList, 'AddTodo'>;
};

const AddTodoScreen: React.FC<AddTodoScreenProps> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const editingTodo = route.params?.todo;

  const [title, setTitle] = useState(editingTodo?.title || '');
  const [description, setDescription] = useState(editingTodo?.description || '');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(editingTodo?.priority || 'medium');

  const handleSave = () => {
    if (!title.trim()) return;

    if (editingTodo) {
      dispatch(
        updateTodo({
          ...editingTodo,
          title: title.trim(),
          description: description.trim(),
          priority,
          updatedAt: new Date().toISOString()
        })
      );
    } else {
      dispatch(
        addTodo({
          id: Date.now().toString(),
          title: title.trim(),
          description: description.trim(),
          completed: false,
          priority,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
      );
    }
    navigation.goBack();
  };

  const renderPriorityButtons = () => (
    <View style={styles.priorityContainer}>
      <Text style={styles.priorityLabel}>Priority:</Text>
      <View style={styles.priorityButtons}>
        {(['low', 'medium', 'high'] as const).map((p) => (
          <TouchableOpacity
            key={p}
            style={[
              styles.priorityButton,
              priority === p && styles.priorityButtonActive,
            ]}
            onPress={() => setPriority(p)}
          >
            <Text
              style={[
                styles.priorityButtonText,
                priority === p && styles.priorityButtonTextActive,
              ]}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.titleInput}
            placeholder="Todo Title"
            value={title}
            onChangeText={setTitle}
            autoFocus
          />
          <TextInput
            style={styles.descriptionInput}
            placeholder="Description (optional)"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />
          {renderPriorityButtons()}
          <TouchableOpacity
            style={[styles.button, !title.trim() && styles.buttonDisabled]}
            onPress={handleSave}
            disabled={!title.trim()}
          >
            <Text style={styles.buttonText}>
              {editingTodo ? 'Update Todo' : 'Add Todo'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleInput: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 8,
    marginBottom: 16,
  },
  descriptionInput: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#f4511e',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  priorityContainer: {
    marginBottom: 16,
  },
  priorityLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  priorityButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priorityButton: {
    flex: 1,
    padding: 8,
    marginHorizontal: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  priorityButtonActive: {
    backgroundColor: '#f4511e',
    borderColor: '#f4511e',
  },
  priorityButtonText: {
    color: '#666',
  },
  priorityButtonTextActive: {
    color: 'white',
  },
});

export default AddTodoScreen;