import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import BudgetEntry from './components/BudgetEntry';
import BudgetListing from './components/BudgetListing';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



const Stack=createNativeStackNavigator();

function App() {
 
  return (
    <NavigationContainer>
      <Stack.Navigator>
         <Stack.Screen  name='BudgetEntry' component={BudgetEntry} />
         <Stack.Screen  name='BudgetListing' component={BudgetListing} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
