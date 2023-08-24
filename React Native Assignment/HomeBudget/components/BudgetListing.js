import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { DataTable, Divider } from 'react-native-paper'


function BudgetListing() {

  const data=useSelector((state)=>state.reducer);

  const [listData,setListData]=useState(data);

  

  return (
    <View>
      <DataTable >
      <DataTable.Header>
        <DataTable.Title>Name</DataTable.Title>
        <DataTable.Title numeric>Planned Amount</DataTable.Title>
        <DataTable.Title numeric>Actual Amount</DataTable.Title>
      </DataTable.Header>
      {
        listData?
        listData.map((item,key)=>
        <DataTable.Row key={item.key}>
          <DataTable.Cell>{item.name}</DataTable.Cell>
          <DataTable.Cell numeric>{item.plannedAmount}</DataTable.Cell>
          <DataTable.Cell numeric>{item.actualAmount}</DataTable.Cell>
       </DataTable.Row>
        ):
        <Text>No data</Text>
      }
      </DataTable>
      </View>
  );
}


export default BudgetListing;