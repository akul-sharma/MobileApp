import React from 'react';
import { View } from 'react-native';
import {Text} from 'react-native-paper'
import AddContacts from './components/AddContacts';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContactList from './components/ContactList';
import UpdateContact from './components/UpdateContact';
import Home from './components/Home';

const Stack=createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Contact App' component={Home} />
          <Stack.Screen name='ContactList' component={ContactList} />
          <Stack.Screen name='AddContacts' component={AddContacts} />
          <Stack.Screen name='UpdateContact' component={UpdateContact} />
        </Stack.Navigator>   
    </NavigationContainer>
  );
}


export default App;
