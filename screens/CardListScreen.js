import React,{useState} from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import {data} from '../model/data';
import Card from '../components/Card';

const CardListScreen = ({route, navigation}) => {
  const idType = route.params.idType;
  const [listStore, changeListStore] = useState([]);

  fetch("http://my-app-food.herokuapp.com/api/list_res?id=" + idType, {
        // method: 'POST',
        // body: JSON.stringify({
        //     id: idType
        // })
      })
      .then((response)=>response.json())
      .then((responseJson)=>{
        changeListStore(responseJson);
      });
  //console.log(listStore);
  
  //console.log(idType);

  const renderItem = ({item}) => {
      return (
          <Card 
              itemData={item}
              onPress={()=> navigation.navigate('CardItemDetails', {itemData: item})}
          />
      );
  };

  return (
    <View style={styles.container}>
      <FlatList 
          data={listStore}
          renderItem={renderItem}
          keyExtractor={item => item.id}
      />
    </View>
  );
};

export default CardListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    width: '90%',
    alignSelf: 'center'
  },
});
