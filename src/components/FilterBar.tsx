import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTodo } from '../context/TodoContext';

export const FilterBar = () => {
  const { filterByPriority, filterByStatus } = useTodo();

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Priority:</Text>
        <View style={styles.buttonGroup}>
          {['all', 'high', 'medium', 'low'].map((priority) => (
            <TouchableOpacity
              key={priority}
              style={styles.filterButton}
              onPress={() => filterByPriority(priority as any)}
            >
              <Text style={styles.buttonText}>{priority}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Status:</Text>
        <View style={styles.buttonGroup}>
          {['all', 'active', 'completed'].map((status) => (
            <TouchableOpacity
              key={status}
              style={styles.filterButton}
              onPress={() => filterByStatus(status as any)}
            >
              <Text style={styles.buttonText}>{status}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#007AFF',
    borderRadius: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    textTransform: 'capitalize',
  },
}); 