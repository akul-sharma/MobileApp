import React from 'react'
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ContactList from './ContactList';
import Favourite from './Favourite';


const Drawer=createDrawerNavigator();

function Home(){
    return(
      <Drawer.Navigator>
         <Drawer.Screen name='ContactList' component={ContactList} />
         <Drawer.Screen name='Favourite' component={Favourite} />
      </Drawer.Navigator>
    )
}


export default Home;