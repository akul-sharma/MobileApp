import React,{useState} from 'react';
import {
  View,
} from 'react-native';
import { addToBudgetList } from './redux/Action'
import { useDispatch } from 'react-redux';
import { Button, TextInput, Text, Appbar } from 'react-native-paper'


function BudgetEntry(props) {

  const [name,setName]=useState("");
  const [plannedAmount,setPlannedAmount]=useState(0);
  const [actualAmount,setActualAmount]=useState(0);


  const dispatch=useDispatch();

  const handleAddToBudgetList =()=>{
    const item={
        name,
        plannedAmount,
        actualAmount
    }
      dispatch(addToBudgetList(item));
  
  }

 
  return (
    <View>
    
    <View style={{marginLeft:20,marginRight:20}}>
      <Text variant="headlineMedium" style={{textAlign:'center',marginTop:20}}>Budget Form</Text>

      <Text variant="titleMedium" style={{marginTop:20}}>Name</Text>
      <TextInput 
       mode='outlined'
       placeholder='Enter Name' 
       onChangeText={(text)=>setName(text)} 
       value={name} 
       />
       
       

      <Text variant="titleMedium" style={{marginTop:20}}>Planned Amount</Text>
      <TextInput 
       mode='outlined'
       keyboardType='numeric'
       placeholder='Enter Planned Amount' 
       onChangeText={(text)=>setPlannedAmount(text)} 
       value={plannedAmount} 
       />
       

      <Text variant="titleMedium" style={{marginTop:20}}>Actual Amount</Text>
      <TextInput 
       mode='outlined'
       keyboardType='numeric'
       placeholder='Enter Actual Amount' 
       onChangeText={(text)=>setActualAmount(text)} 
       value={actualAmount} 
       />
       

       <Button style={{marginLeft:30,marginRight:30,marginTop:30}} mode='contained' buttonColor='' onPress={()=>handleAddToBudgetList()}>Add To List</Button>

       <Button style={{marginLeft:30,marginRight:30,marginTop:20}} mode='contained' onPress={()=>props.navigation.navigate("BudgetListing")} >Go to BudgetList Screen</Button>

       
    </View>
    </View>
  );
}


export default BudgetEntry;