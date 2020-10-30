import React,{useState,useEffect} from 'react';
import {View,Image,StyleSheet,Alert,ScrollView,ImageBackground} from 'react-native';
import { useTranslation } from 'react-i18next';
import {Container, Header, Content, Item, Input, Icon, Button, Text, Label, Toast} from 'native-base';
import StoreBox from '../../components/StoreBox'
import axios from "axios/index";
import moment from 'moment';
import AsyncStorage from "@react-native-community/async-storage";
import { WebView } from 'react-native-webview';

export default function PayScreen({route,navigation}) {
    const { t } = useTranslation();
    const [date,setDate] = useState();

    const [errors,setErrors] = useState({});

    const [update,setUpdate] = useState(false);
    useEffect(()=>{
        AsyncStorage.getItem('token').then((token)=>{
            axios.post('http://192.168.1.2:8000/api/user',null, {

                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(function (response) {
                    setDate(response.data.user.renew_date);


                })
                .catch(function (error) {
                    alert(JSON.stringify(error))

                    // alert(error.response.data.errors);
                });
        });
    },[update]);
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

        return (

            <WebView
                source={{ uri: 'http://192.168.1.2:8000/api/pay-month?id='+route.params.id }}
                style={{ marginTop: 20 }}
                onNavigationStateChange={(event) => {
                    if (event.url == 'http://example.com') {
                        navigation.navigate('Store',{screen:'Payment'});
                    }
                }}
            />


        );




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

