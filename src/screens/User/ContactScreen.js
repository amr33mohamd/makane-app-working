import React,{useState,useEffect} from 'react';
import {View,Image,StyleSheet,Alert,ScrollView,I18nManager} from 'react-native';
import { useTranslation } from 'react-i18next';
import {Container, Header, Content, Item, Input, Icon, Button, Text, Label, Toast} from 'native-base';
import StoreBox from '../../components/StoreBox'
import RNRestart from 'react-native-restart'; // Import package from node modules
import  StatusBarPlaceHolder from '../../components/StatusBarPlaceHolder'

import axios from "axios/index";
import AsyncStorage from "@react-native-community/async-storage";
import i18n from "i18next/index";
import {useIsFocused} from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ContactScreen({navigation}) {
    const {t} = useTranslation();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [code, setCode] = useState();
    const [points, setPoints] = useState();
    const [message, setMessage] = useState();
    const [token, setToken] = useState();
    const isFocused = useIsFocused()

    const [errors, setErrors] = useState({});

    const [update, setUpdate] = useState(false);
    useEffect(() => {
        AsyncStorage.getItem('token').then((token) => {
            AsyncStorage.getItem('token').then((token) => {
                setToken(token);
            })
            if (token) {

                axios.post('http://makaneapp.com/api/contact', null, {

                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(function (response) {
                        setName(response.data.user.name);
                        setCode(response.data.user.invite_code)
                        setPoints(response.data.user.points)


                    })
                    .catch(function (error) {
                        // alert(JSON.stringify(error))

                        // alert(error.response.data.errors);
                    });

            }
        });
    }, [update,isFocused]);

    var submit = () => {
        AsyncStorage.getItem('token').then((token) => {

            if (email != '') {
                axios.post('http://makaneapp.com/api/contact', null, {
                    params: {
                        email, message
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(function (response) {
                        setUpdate(!update);
                        setErrors({});
                        Toast.show({
                            text: 'Thanks for contacting us we will reply ASAP ',
                            buttonText: 'Okay',
                            type: "success"

                        })
                        navigation.navigate('User');
                        // alert(JSON.stringify(response))

                    })
                    .catch(function (error) {
                        alert(JSON.stringify(error.response))
                        // setErrors(error.response.data.errors)

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
    var logout = () => {
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('type');

        navigation.navigate('Auth', {screen: 'Login'});
    }
    if(token != null){

    return (
        <Container>
            <Content>

                <View style={{alignItems: 'center'}}>
                    <Image
                        style={styles.stretch}
                        source={require('../../Assets/Images/verify.png')}
                    />
                    <Button
                        onPress={() => navigation.goBack()}
                        style={{
                            position: 'absolute',
                            width: 50,
                            height: 50,
                            backgroundColor: '#fff',
                            top: 30,
                            left: 10,
                            justifyContent: 'center',
                            borderRadius: 130
                        }}
                    >
                        <Ionicons name="ios-arrow-back" size={24} color="black"/>

                    </Button>
                </View>

                <View style={styles.container}>






                    <Text style={{
                        fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',                        fontSize: 12,
                        padding: 10,
                        textAlign: 'center'
                    }}>{t('Email')}</Text>
                    <Item style={styles.searchInput} rounded>

                        <Input placeholder={t('Email')} value={email} onChangeText={(value) => setEmail(value)}
                               style={{textAlign: 'center'}} fontFamily='Poppins-ExtraLight' fontSize={15}
                               placeholderTextColor="#CECDCD"
                        />
                    </Item>
                    {
                        errors.email && <Text style={{
                            fontFamily: 'Poppins-Medium',
                            fontSize: 12,
                            padding: 10,
                            textAlign: 'center',
                            color: '#E50000'
                        }}>{errors.email}</Text>
                    }

                    <Text style={{
                        fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',                        fontSize: 13,
                        fontSize: 12,
                        padding: 10,
                        textAlign: 'center'
                    }}>{t('Message')}</Text>
                    <Item style={styles.searchInput2} rounded>

                        <Input  placeholder={t('Message')} value={message} multiline={true}
                               onChangeText={(value) => setMessage(value)} style={{textAlign: 'center',height:100}}
                               fontFamily='Poppins-ExtraLight' fontSize={15} placeholderTextColor="#CECDCD"
                        />
                    </Item>
                    {
                        errors.password && <Text style={{
                            fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',                        fontSize: 13,
                            fontSize: 12,
                            padding: 10,
                            textAlign: 'center',
                            color: '#E50000'
                        }}>{errors.password}</Text>
                    }



                </View>
                <View style={{
                    alignItems: 'center',
                    padding: 20,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Button
                        title="Press me"
                        onPress={() => submit()}
                        style={styles.selectedButton}
                    >
                        <Text style={{
                            color: '#fff',
                            fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',                        fontSize: 13,
                            textAlign: 'center',
                            fontSize: 15
                        }}>{t('Send')}</Text>

                    </Button>

                </View>
            </Content>

        </Container>


    );
}
else {
        return (
            <View style={{backgroundColor:'#fff',height:'100%',width:'100%',alignItems:'center'}}>
                <View style={{
                    backgroundColor:'#fff',
                    shadowOpacity: 0.3,
                    shadowRadius: 5,
                    shadowColor: '#000',
                    height:300,
                    shadowOffset: { height: 0, width: 0 },
                    marginVertical:10,
                    borderRadius:30,
                    elevation: 1,
                    margin:20,
                    alignItems:'center',
                    justifyContent:'center',
                    width:'80%'
                }}>
                    <Image
                        source={require('../../Assets/Images/people.png')}
                        style={{resizeMode:'contain',height:200,width:'70%',padding:10}}
                    />
                    <Button
                        onPress={() => {navigation.navigate('Auth',{screen:'Login'})}}
                        style={{
                            backgroundColor: '#E50000',
                            alignItems:'center',
                            borderBottomRightRadius:30,
                            borderBottomLeftRadius:30,

                            marginHorizontal:5,
                            width:'100%',
                            justifyContent:'center',
                            shadowOpacity: 0.3,
                            shadowRadius: 5,
                            shadowColor: '#E50000',
                            shadowOffset: { height: 0, width: 0 },
                            position:'absolute',
                            bottom:0
                        }}
                    >
                        <Text style={{color:  '#fff' ,fontFamily:'Poppins-Medium',textAlign:'center',fontSize:15}}>{t('Sign In')}</Text>
                    </Button>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({

    container: {
        borderRadius:40,
        textAlign:'left',
        alignItems:'center',
        alignSelf:'center'
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
    searchInput2:{
        width:'90%',
        borderRadius:10,
        backgroundColor:'#F5F5F5',
        alignItems:'center',
        paddingHorizontal:30,
        color:'#CECDCD',
        borderColor:'#F5F5F5',
        height:100,
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
        borderRadius:50,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: '#E50000',
        shadowOffset: { height: 0, width: 0 },
        margin:10,
        alignSelf:'center'


    },
    button:{
        backgroundColor: '#FFFFFF',
        alignItems:'center',
        justifyContent:'center',
        width:'40%',
        borderRadius:50,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: '#000',
        margin:10,
        shadowOffset: { height: 0, width: 0 },


    },
    components:{
        width:'90%'
    },
    stretch:{
        resizeMode: 'stretch',


    }
});
