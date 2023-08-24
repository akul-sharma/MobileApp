import React, {useEffect, useState} from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Button, TextInput, Text, Appbar, Switch } from 'react-native-paper'
import {openDatabase} from 'react-native-sqlite-storage'
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

let db=openDatabase({name:'MyDatabase.db'});

function AddContacts() {

  const [name,setName]=useState("");
  const [mobileNum,setMobileNum]=useState(""); 
  const [landlineNum,setLandlineNum]=useState("");
  const [isSwitchOn, setIsSwitchOn] = useState(0);
  const [selectImage, selectSelectImage]=useState("");

  const navigation=useNavigation();

  useEffect(() => {
    db.transaction(txn => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='MyContacts'",
        [],
        function (txn, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS MyContacts', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS MyContacts(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_mobile VARCHAR(10), user_landline VARCHAR(10), fav_user INTEGAR, image_uri VARCHAR(225))',
              []
            );
            console.log("success");
          }
        }
      );
    });


  }, []);


  const saveData=()=>{
    db.transaction(txn=>{
      txn.executeSql(
        'INSERT INTO MyContacts (user_name, user_mobile, user_landline, fav_user, image_uri) VALUES (?,?,?,?,?)',
        [name, mobileNum, landlineNum, isSwitchOn, selectImage],
        (txn,res)=>{
          alert("Contact Added");
          navigation.push("Contact App");
        },
        error=>{
          console.log(error);
        },
      );
    })
  }

  const imagePicker=()=>{
    const options={
      storageOptions:{
        path:'image'
      }
    }
    launchImageLibrary(options, res=>{
      console.log(res.assets[0].uri);
      selectSelectImage(res.assets[0].uri);
    })

  }

  return (
    <View style={{backgroundColor:'white',flex:1}}>
    <View style={{marginLeft:20,marginRight:20,marginTop:10}}>
       
      <View style={{flexDirection:'row',alignSelf:'flex-end'}}>
      <Image source={require("../images/heart_icon.png")} 
       style={{height:25, width:30, alignSelf:'center',marginRight:10}}  />
      <Switch value={isSwitchOn} onValueChange={()=>setIsSwitchOn(!isSwitchOn)} />
      </View>

      <TouchableOpacity
        onPress={()=>imagePicker()}>  
      <Image source={require("../images/camera_icon.png")} 
       style={{height:150, width:150, alignSelf:'center'}}  />
       </TouchableOpacity>

      {
        selectImage==""?  
        <View></View>:
        <Text style={{color:'green', alignSelf:'center',marginTop:10,fontSize:16}} >Uploaded</Text>
      }       

      <Text variant="titleMedium" style={{marginTop:15}}>Name</Text>
      <TextInput 
       mode='outlined'
       placeholder='Enter Name' 
       onChangeText={(text)=>setName(text)} 
       value={name} 
       />
       

      <Text variant="titleMedium" style={{marginTop:20}}>Mobile Number</Text>
      <TextInput 
       mode='outlined'
       keyboardType='numeric'
       placeholder='Enter Mobile Number' 
       onChangeText={(text)=>setMobileNum(text)} 
       value={mobileNum} 
       />

      <Text variant="titleMedium" style={{marginTop:20}}>Landline Number</Text>
      <TextInput 
       mode='outlined'
       keyboardType='numeric'
       placeholder='Enter Landline Number' 
       onChangeText={(text)=>setLandlineNum(text)} 
       value={landlineNum} 
       />

<Button style={{marginLeft:30,marginRight:30,marginTop:30}} mode='contained' onPress={saveData} >Save</Button>
    </View>
    </View>
  );
}


export default AddContacts;