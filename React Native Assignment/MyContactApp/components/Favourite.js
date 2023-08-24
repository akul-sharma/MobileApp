import React, { useEffect, useState } from 'react';
import {Text, Button, Card, IconButton, MD3Colors, Divider} from 'react-native-paper';
import {View, TouchableOpacity, Alert, Image, ScrollView} from 'react-native'
import {openDatabase} from 'react-native-sqlite-storage'
import { useNavigation } from '@react-navigation/native';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';

let db=openDatabase({name:'MyDatabase.db'});




function Favourite(){

    const navigation=useNavigation();
    const [myContactList,setMyContactList]=useState([]);
    const [showData,setShowData]=useState(-1);


    const rightSwipe=(item)=>{
        return (
          
          <View>
            <Button mode="elevated" style={{margin:20}} 
             onPress={()=>{
                navigation.navigate('UpdateContact',{
                  data:{
                    id: item.user_id,
                    name: item.user_name,
                    mobileNum: item.user_mobile,
                    landlineNum: item.user_landline,
                    fav:item.fav_user,
                    image_uri: item.image_uri
                  }
                })
              }}>
              Update</Button>
            <Button mode="elevated" style={{marginLeft:20,marginRight:20}} onPress={()=>deleteContact(item.user_id)}>Delete</Button>
          </View>
          
        )
      }

      const showDetails=(id)=>{
        if(showData==id)
          setShowData(-1);
        else
          setShowData(id);
      }
  
      const deleteContact=(id)=>{
        db.transaction((tx) => {
          tx.executeSql(
            'DELETE FROM MyContacts where user_id=?',
            [id],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
                Alert.alert(
                  'Success',
                  'User deleted successfully',
                  [
                    {
                      text: 'Ok',
                      onPress: () => navigation.push('ContactList'),
                    },
                  ],
                  { cancelable: false }
                );
              } else {
                alert('Please insert a valid User Id');
              }
            }
          );
        });
      }


    useEffect(()=>{
        db.transaction((txn) => {
            txn.executeSql(
              'SELECT * FROM MyContacts where fav_user=? order by user_name',
              [1],
              (txn, results) => {
                let temp = [];
                console.log(results.rows.length);
                for (let i = 0; i < results.rows.length; ++i){
                  console.log(results.rows.item(i));
                  temp.push(results.rows.item(i));
                }
                setMyContactList(temp);
              }
            );
          });
    
    },[])


    return(
        <View style={{backgroundColor:'white', flex:1}}>
 
          {/* <Drawer.Navigator>
            <Drawer.Screen 
             name="ContactList" 
             component={ContactList}
             options={{headerShown:true}}  />
          </Drawer.Navigator> */}
         
          {/* <View style={{alignItems:'flex-end',margin:10}}>
            <Button style={{width:200}} mode="contained" onPress={()=>props.navigation.navigate("AddContacts")}>
             Add Contact</Button>
          </View> */}
          
           <ScrollView style={{fontSize:196}}>
          <GestureHandlerRootView >
          
          <View >
             {
                 myContactList?
                 myContactList.map((item)=>
                 [
                 <Swipeable renderRightActions={()=>rightSwipe(item)}>
                 <TouchableOpacity onPress={()=>showDetails(item.user_id)}>
                   <Card style={{backgroundColor:'white'}}>
                     <Card.Content>
                       
                       <View style={{flexDirection:'row'}}>
                       <Image source={{uri:item.image_uri}} 
                         style={{height:80,width:80,borderRadius:50}} />
                       <Text variant="titleLarge" style={{alignSelf:'center',marginLeft:20}}>{item.user_name}</Text>
                       </View>
                       {
                         item.user_id==showData?
                         <View style={{alignItems:'center'}}>
                           <View style={{flexDirection:'row'}}>
                             <Text variant="titleMedium" >Mobile : </Text>
                             <Text variant="titleMedium" style={{marginLeft:10}}>{item.user_mobile}</Text>
                           </View>
                           <View style={{flexDirection:'row'}}>
                               <Text variant="titleMedium">Landline :</Text>
                               <Text variant="titleMedium" style={{marginLeft:10}}>{item.user_landline}</Text>
                           </View>
                           
                           
                           {/* <Text>Favourite User:   {item.fav_user}</Text> */}
                         </View>:
                         <Text></Text>
                         
                       }
                       
                     </Card.Content>    
                   </Card>
                   <Divider/>
                 </TouchableOpacity>
                 </Swipeable>
                 ]
                 ):
                 <Text>Empty</Text>
             }
          </View>
          </GestureHandlerRootView>
          </ScrollView>
          <View style={{position: 'absolute',bottom:0,right:0,height:60,width:60,marginRight:20,marginBottom:20}}>
             <TouchableOpacity 
              onPress={()=>props.navigation.navigate("AddContacts")}>
           <Image source={require("../images/plus_icon.webp")} 
             style={{height:50, width:50, alignSelf:'center'}}  />
             </TouchableOpacity>
          </View>
        </View>
        
     )
}

export default Favourite;