import React,{useState} from 'react';
import {View,Image,StyleSheet,Alert} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Container, Header, Content, Thumbnail, Text } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {useTranslation} from "react-i18next";
import i18n from "i18next";
 const StoreBox: () => React$Node = (props) => {
     const { t } = useTranslation();

     const  items = [];
     var renderStars = ()=>{
         var gold = parseInt(props.rate);
         var empty = 5 - parseInt(props.rate);
         stars = [];
         while(gold > 0){
             gold = gold - 1;
             stars.push ( <AntDesign name="star" color="gold"/>)
         }
         for(let m = empty;m > 0;m--){
             stars.push ( <AntDesign name="star" color="gray"/>)
         }
         return stars;
     }
return(

    <View style={styles2.container} >
        <View style={styles2.left}>
            <Image  source={{
                uri: props.image}}
            style={{
                width:'100%',
                height:130,
                resizeMode:'contain'
            }}/>

        </View>
        <View style={styles2.right}>
            <Text style={{fontFamily:'Poppins-Medium',color:'#000',fontSize:13,padding:5,textAlign:'right',alignSelf:'flex-start'}}>{props.name}</Text>
            <Text style={{fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',color:'#CECDCD',fontSize:10,padding:5,height:50,alignSelf:'flex-start'}}>{props.description}</Text>
            <Text style={{fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',color:'#000',fontSize:12,padding:0,alignSelf:'flex-start'}}>{t('Availability')}</Text>
            <View style={styles2.buttom}>
                <View style={{flexDirection:'row',flex:.6,alignItems:'center'}}>
                <Feather name="users" color="#000" style={{}}/>
                <Text style={{padding:10}}>{props.available}</Text>

                </View>
                <View style={styles2.stars}>
                    {renderStars()}

                </View>
            </View>
        </View>

    </View>
)

}
const styles2 = StyleSheet.create({
container:{
flexDirection:'row',
    backgroundColor:'#fff',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowColor: '#000',
    shadowOffset: { height: 0, width: 0 },
    marginVertical:10,
    borderRadius:10,
    padding:10,
    elevation: 1,
    width:'99%',
    alignSelf:'center'

},
    left:{
        flex:.5,
        padding:10
    },
    right:{
        flex:.5,
        padding:5,
    },
    buttom:{
        flexDirection:'row',
        flex:1,
        justifyContent: "center",
        alignItems:'center'

    },
    stars:{
        flexDirection:'row',
        flex:.4,


    }



})
export default StoreBox;