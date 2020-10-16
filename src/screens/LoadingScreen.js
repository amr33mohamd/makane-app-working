import React,{useState,useEffect} from 'react';
import {View,Image,StyleSheet,Alert,ScrollView,TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Container, Header, Content, Item, Input, Icon,Button,Text,Label,Toast } from 'native-base';
import StoreBox from '../components/StoreBox'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import i18n from "i18next/index";

export default function LoadingScreen({route,navigation}) {
    const { t } = useTranslation();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    const [error,setError] = useState();
    useEffect(()=>{
        AsyncStorage.getItem('lang').then((lang)=>{
            i18n.changeLanguage (lang);

        })
        AsyncStorage.getItem('token').then((token)=>{

            if(token){

                AsyncStorage.getItem('type').then((type)=>{
                    if(type == '1' ){
                        navigation.navigate('User');
                    }
                    else if(type == '3'){
                        navigation.navigate('Auth',{screen:'Verify'});

                    }
                    else if(type == '4'){
                        navigation.navigate('Auth',{screen:'Phone'});

                    }
                    else
                        {
                        navigation.navigate('Store');
                    }
                })
            }
            else {
                navigation.navigate('User');

            }
        })
    },[]);

    return (

                <View style={{  alignItems: 'center',backgroundColor:'#E50000',justifyContent:'center',height:'100%'}}>
                    <Image
                        style={styles.stretch}
                        source={require('../Assets/Images/splash.png')}
                    />

                </View>




    );
}
const styles = StyleSheet.create({


    stretch:{
        width:'50%',
        height:'50%',
        resizeMode: 'contain',


    }
});

