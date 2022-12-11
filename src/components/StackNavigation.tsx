import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import TranslatePage from '../pages/TranslatePage';
import LoginPage from '../pages/LoginPage';
import ListsPage from '../pages/ListsPage';
import ListPage from '../pages/ListPage';

const StackNavigation = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={LoginPage} />
        <Stack.Screen name="Translate" component={TranslatePage} />
        <Stack.Screen name="Lists of Words" component={ListsPage} />
        <Stack.Screen name="Word's List" component={ListPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
