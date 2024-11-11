/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { store } from './src/store';
import { TodoProvider } from './src/context/TodoContext';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <TodoProvider>
          <AppNavigator />
        </TodoProvider>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
