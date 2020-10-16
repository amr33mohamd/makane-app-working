import React,{useState} from 'react';
import {View,Image,StyleSheet,Alert} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Container, Header, Content, Thumbnail, Text } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
 const ReviewBox: () => React$Node = (props) => {
     const  items = [];
     var renderStars = ()=>{
         var gold = parseInt(props.rate);
         var empty = 5 - parseInt(props.rate);
         stars = [];
         while(gold > 0){
             gold = gold - 1;
             stars.push ( <AntDesign name="star" size={20} color="gold"/>)
         }
         for(let m = empty;m > 0;m--){
             stars.push ( <AntDesign name="star" size={20} color="gray"/>)
         }
         return stars;
     }
return(

    <View style={{borderBottomColor:'#CECDCD',borderBottomWidth:1,width:'95%',alignSelf:'center'}}>
        <View style={{flexDirection:'row'}}>
            <Thumbnail small source={{uri: props.image}} style={{alignSelf:'center'}}/>

            <Text style={{fontFamily:'Poppins-Medium',color:'#000',fontSize:12,padding:20}}>{props.username}</Text>
        </View>
        <Text style={{fontFamily:'Poppins-Medium',color:'#CECDCD',fontSize:10,alignItems:'flex-start'}}>
            {props.review}

        </Text>
        <View style={{flexDirection:'row'}}>
            <Text style={{fontFamily:'Poppins-Medium',color:'#000',fontSize:12,alignSelf:'center',flex:.2}} >Rate</Text>
            <View style={styles2.reviewStars}>

                {renderStars()}
            </View>
        </View>
    </View>
)

}
const styles2 = StyleSheet.create({
    reviewStars:{
        flexDirection:'row',
        flex:.8,
        marginVertical:15,
        alignSelf:'flex-end',
        justifyContent:'flex-end'

    }



})
export default ReviewBox;