import React,{useState,useEffect} from 'react';
import {View,Image,StyleSheet,Alert,ScrollView,ImageBackground} from 'react-native';
import { useTranslation } from 'react-i18next';
import {Container, Header, Content, Item, Input, Icon, Button, Text, Label, Toast} from 'native-base';
import StoreBox from '../../components/StoreBox'
import axios from "axios/index";
import moment from 'moment';
import AsyncStorage from "@react-native-community/async-storage";
import { useIsFocused } from '@react-navigation/native'
import  StatusBarPlaceHolder from '../../components/StatusBarPlaceHolder'

export default function PaScreen({navigation}) {
    const { t } = useTranslation();
    const [date,setDate] = useState();
    const [id,setId] = useState();
    const [errors,setErrors] = useState({});
    const isFocused = useIsFocused()

    const [update,setUpdate] = useState(false);
    useEffect(()=>{
        AsyncStorage.getItem('token').then((token)=>{
            axios.post('http://127.0.0.1:8000/api/user',null, {

                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(function (response) {
                    setDate(response.data.user.renew_date);
                    setId(response.data.user.id);

                })
                .catch(function (error) {
                    // alert(JSON.stringify(error))

                    // alert(error.response.data.errors);
                });
        });
    },[update,isFocused]);
    var submit = () =>{
        AsyncStorage.getItem('token').then((token)=> {

            if ( name != '') {
                axios.post('http://192.168.1.2:8080/api/update_user', null, {
                    params: {
                        email, password, name
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(function (response) {
                        setUpdate(!update);
                        setErrors({});
                        Toast.show({
                            text: 'successfully updated your data',
                            buttonText: 'Okay',
                            type: "success"

                        })
                        // alert(JSON.stringify(response))

                    })
                    .catch(function (error) {
                        // alert(JSON.stringify(error.response))
                        setErrors(error.response.data.errors)

                    });
            }
            else {
                Toast.show({
                    text: 'please fill in all data',
                    buttonText: 'Okay',
                    type: "danger"

                })
            }
        })

    }
    var logout = ()=>{
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('type');

        navigation.navigate('Auth',{screen:'Login'});
    }
if(moment().isBefore(date) ){
    return (

        <ImageBackground
            style={styles.image}
            source={require('../../Assets/Images/Group209.png')}
        >
            <StatusBarPlaceHolder/>
            <View style={{width:'70%',margin:10}}>
                <Text style={{        fontFamily:'Poppins-SemiBold',
                    fontSize:19,
                    textAlign:'center'

                }}>You don't have to pay any new payment</Text>
            </View>
            <View style={{backgroundColor:'#fff',padding:30,borderRadius:20,bottom:27,alignItems:'center',position:'absolute',
                shadowOpacity: 0.3,
                shadowRadius: 20,
                shadowColor: '#000',
                elevation: 1,
                shadowOffset: { height: 0, width: 0 },
            }}>
                <Text
                    style={{        fontFamily:'Poppins-SemiBold',
                        fontSize:15,
                        textAlign:'center'

                    }}>Your next payment is on </Text>
                <Text
                    style={{        fontFamily:'Poppins-SemiBold',
                        fontSize:17,
                        textAlign:'center',
                        color:'#E50000',
                    }}> {date}</Text>
            </View>
        </ImageBackground>


    );
}
else {
       return(
           <ImageBackground
               style={styles.image}
               source={require('../../Assets/Images/Group.png')}
           >
               <StatusBarPlaceHolder/>

               <View style={{width:'70%',margin:10}}>
                   <Text style={{        fontFamily:'Poppins-SemiBold',
                       fontSize:19,
                       textAlign:'center',
                       marginVertical:20

                   }}>You  have to pay </Text>
               </View>
               <View style={{backgroundColor:'#fff',borderRadius:20,alignItems:'flex-start',
                   shadowOpacity: 0.3,
                   shadowRadius: 20,
                   shadowColor: '#000',
                   elevation: 1,
                   shadowOffset: { height: 0, width: 0 },
                   width:'80%'
               }}>
                   <View style={{paddingHorizontal:30,paddingTop:30}}>
                   <View style={{flexDirection:'row'}}>
                   <Text
                       style={{        fontFamily:'Poppins-SemiBold',
                           fontSize:15,
                           alignSelf:'flex-start'

                       }}>{t('From')} : </Text>
                   <Text
                       style={{        fontFamily:'Poppins-SemiBold',
                           fontSize:15,
                           color:'#E50000',
                           alignSelf:'flex-start'
                       }}> {moment().format("DD-MM-YYYY")}</Text>
                   </View>
                   <View style={{flexDirection:'row'}}>
                       <Text
                           style={{        fontFamily:'Poppins-SemiBold',
                               fontSize:15,
                               alignSelf:'flex-start'

                           }}>{t('To')} : </Text>
                       <Text
                           style={{        fontFamily:'Poppins-SemiBold',
                               fontSize:15,
                               textAlign:'center',
                               color:'#E50000',
                           }}> {moment().add(1, 'M').format("DD-MM-YYYY")}</Text>
                   </View>
                   <View style={{flexDirection:'row'}}>
                       <Text
                           style={{        fontFamily:'Poppins-SemiBold',
                               fontSize:15,
                               textAlign:'center'

                           }}>{t('Amount')} : </Text>
                       <Text
                           style={{        fontFamily:'Poppins-SemiBold',
                               fontSize:15,
                               textAlign:'center',
                               color:'#E50000',
                           }}> 80 $</Text>

                   </View>
                   </View>
                   <Button
                       title="Press me"
                       onPress={() => navigation.navigate('PayScreen',{id})}
                       style={ styles.selectedButton }
                   >
                       <Text style={{color:'#fff' ,fontFamily:'Poppins-Medium',textAlign:'center',fontSize:15}}>{t('Pay')}</Text>

                   </Button>

               </View>
               <View style={{backgroundColor:'#fff',padding:30,borderRadius:20,alignItems:'flex-start',
                   margin:10,
                   shadowOpacity: 0.3,
                   shadowRadius: 20,
                   shadowColor: '#000',
                   elevation: 1,
                   width:'80%',
                   shadowOffset: { height: 0, width: 0 },
               }}>
                   <Text
                       style={{        fontFamily:'Poppins-SemiBold',
                           fontSize:15,
                           textAlign:'center'

                       }}>Remember </Text>
                   <Text
                       style={{        fontFamily:'Poppins-SemiBold',
                           fontSize:15,
                           textAlign:'left',
                           color:'#BBBBBB',
                       }}> - When you pay, your café details stays in the app for users to see </Text>
                   <Text
                       style={{        fontFamily:'Poppins-SemiBold',
                           fontSize:15,
                           textAlign:'left',
                           color:'#BBBBBB',
                       }}> - Paying on time gives your café more time to be in the app so, people would see it more </Text>
               </View>
           </ImageBackground>       )
}

}
const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
        alignItems:'center'
    },
    container: {
        borderRadius:40,
        flex: 1,
        flexDirection: "column"


    },
    searchInput:{
        width:'90%',
        borderRadius:10,
        backgroundColor:'#F5F5F5',
        alignItems:'center',
        paddingHorizontal:30,
        color:'#CECDCD',
        borderColor:'#F5F5F5',
        height:45,
        fontFamily:'Poppins-Medium',
        fontSize:4,
        textAlign:'center'
    },
    buttons:{
        flexDirection:'row',
        marginVertical:20,
        justifyContent:'center',
        alignItems:'center'
    },
    selectedButton: {
        backgroundColor: '#E50000',
        alignItems:'center',
        justifyContent:'center',
        width:'40%',
        borderBottomRightRadius:20,
        borderTopLeftRadius:10,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: '#E50000',
        shadowOffset: { height: 0, width: 0 },
        alignSelf:'flex-end'


    },
    button:{
        backgroundColor: '#FFFFFF',
        alignItems:'center',
        justifyContent:'center',
        width:'40%',
        borderRadius:50,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: '#FFFFFF',
        margin:10,
        shadowOffset: { height: 0, width: 0 },


    },
    components:{
        width:'90%'
    },
    stretch:{
        height:'100%',
        width:'100%',
        bottom:1

    }
});

