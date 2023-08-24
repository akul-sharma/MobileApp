import React, {useEffect,useState} from 'react'
import { View, TouchableOpacity, Image } from 'react-native';
import { Button, TextInput, Text, Appbar , Switch} from 'react-native-paper'
import {openDatabase} from 'react-native-sqlite-storage'
import { useNavigation, useRoute } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';

let db=openDatabase({name:'MyDatabase.db'});

function UpdateContact(){

  const navigation=useNavigation();
  const route=useRoute();

  const [name,setName]=useState("");
  const [mobileNum,setMobileNum]=useState(""); 
  const [landlineNum,setLandlineNum]=useState("");
  const [favourite,setFavourite]=useState(0);
  const [selectImage, setSelectImage]=useState("");

  useEffect(()=>{
    setName(route.params.data.name);
    setMobileNum(route.params.data.mobileNum);
    setLandlineNum(route.params.data.landlineNum);
    setFavourite(route.params.data.fav);
    setSelectImage(route.params.data.image_uri);
  },[])

  const updateUser=()=>{
    db.transaction(txn=>{
       txn.executeSql(
         'UPDATE MyContacts set  user_name=?, user_mobile=?, user_landline=?, fav_user=?, image_uri=? where user_id=?',
          [name,mobileNum,landlineNum,favourite,selectImage,route.params.data.id],
          (txn,res)=>{
            alert("Updated");
            navigation.push("Contact App");
          }
       )
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
      setSelectImage(res.assets[0].uri);
    })

  }


  return(
    <View style={{marginLeft:20,marginRight:20,marginTop:20}}>
    

    <View style={{flexDirection:'row',alignSelf:'flex-end'}}>
      <Image source={require("../images/heart_icon.png")} 
       style={{height:25, width:30, alignSelf:'center',marginRight:10}}  />
      <Switch value={favourite} onValueChange={()=>setFavourite(!favourite)} />
      </View>

     {
       selectImage==""?
       <TouchableOpacity
        onPress={()=>imagePicker()}>  
      <Image source={require("../images/camera_icon.png")} 
       style={{height:150, width:150, alignSelf:'center',borderRadius:80}}  />
       </TouchableOpacity>:

      <TouchableOpacity
      onPress={()=>imagePicker()}>  
      {/* <Image source={require("../images/camera_icon.png")}  */}
      <Image source={{uri:selectImage}}
      style={{height:150, width:150, alignSelf:'center',borderRadius:80}}  />
      </TouchableOpacity>
     }

      
    
    <Text variant="titleMedium" style={{marginTop:20}}>Name</Text>
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

    <Button style={{marginLeft:30,marginRight:30,marginTop:30}} mode='contained' onPress={()=>updateUser()} >Save</Button>
  </View>
  );
}

export default UpdateContact;