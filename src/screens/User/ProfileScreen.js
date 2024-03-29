import React,{useState,useEffect} from 'react';
import {View,Image,StyleSheet,Alert,ScrollView,I18nManager,TouchableOpacity} from 'react-native';
import { useTranslation } from 'react-i18next';
import {Container, Header, Content, Item, Input, Icon, Button, Text, Label, Toast,List,ListItem,Right,Left} from 'native-base';
import StoreBox from '../../components/StoreBox'
import RNRestart from 'react-native-restart'; // Import package from node modules
import  StatusBarPlaceHolder from '../../components/StatusBarPlaceHolder'

import axios from "axios/index";
import AsyncStorage from "@react-native-community/async-storage";
import i18n from "i18next/index";
import {useIsFocused} from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import messaging from '@react-native-firebase/messaging';

export default function ProfileScreen({navigation}) {
    const {t} = useTranslation();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [code, setCode] = useState();
    const [points, setPoints] = useState();
    const [password, setPassword] = useState();
    const [token, setToken] = useState();
    const isFocused = useIsFocused()
    const [user,setUser] = useState();
    const [errors, setErrors] = useState({});

    const [update, setUpdate] = useState(false);
    useEffect(() => {
        AsyncStorage.getItem('token').then((token) => {
            AsyncStorage.getItem('token').then((token) => {
                setToken(token);
            })
            if (token) {

                axios.post('http://makaneapp.com/api/user', null, {

                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(function (response) {
                        setUser(response.data.user);
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
    var logout = () => {
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('type');

        navigation.navigate('Auth', {screen: 'Login'});
    }
    var submit = () => {
        AsyncStorage.getItem('token').then((token) => {

            if (name != '') {
                axios.post('http://makaneapp.com/api/update_user', null, {
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
    var logout = () => {
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('type');
        messaging().unsubscribeFromTopic(''+user.id);

        navigation.navigate('Auth', {screen: 'Login'});
    }
    if(token != null){

    return (
        <Container>
            <Content>

            <View  style={{    height:220,width:'100%',justifyContent:'flex-start',flexDirection:'column'}}>
    <Image
        style={styles.stretch}
        source={require('../../Assets/Images/test.jpg')}
        style={{resizeMode:'cover',height:'100%',width:'100%'}}
    />

</View>

                <View style={styles.container}>
                <ListItem itemDivider>
                <Text style={{
                    fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',
                    fontSize: 19,
                    padding: 10,
                    textAlign: 'center'
                }}>{t('Settings')}</Text>
</ListItem>

                <List>
           <ListItem button                         onPress={() => {navigation.navigate('EditScreen')}}
>
             <Left>
             <Text style={{
                 fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',
                 fontSize: 13,
                 padding: 10,
                 textAlign: 'center'
             }}>{t('Edit Account & profile')}</Text>
               </Left>
             <Right>
<MaterialIcons name="edit" size={24} color="black" />
             </Right>
           </ListItem >
           <ListItem button                         onPress={() => {navigation.navigate('ContactScreen')}}>
            <Left>
            <Text style={{
                fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',
                fontSize: 13,
                padding: 10,
                textAlign: 'center'
            }}>{t('Contact Us')}</Text>
                         </Left>
             <Right>
<SimpleLineIcons name="envelope" size={24} color="black" />
             </Right>
           </ListItem>

           <ListItem button onPress={() => {
               if(i18n.language == 'ar'){
                   AsyncStorage.setItem('lang','en');
                   i18n.changeLanguage ('en');
                   I18nManager.forceRTL(false);

                   RNRestart.Restart();

               }
               else {
                   AsyncStorage.setItem('lang','ar');
                   i18n.changeLanguage ('ar');
                   I18nManager.forceRTL(true);

                   RNRestart.Restart();

               }

           }} >

           <Left>
           <Text style={{
             fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',
             fontSize: 13,
             padding: 10,
             textAlign: 'center'
           }}>{ (i18n.language == 'ar') ? 'English' : 'Arabic'}</Text>
                        </Left>
             <Right>
<MaterialIcons name="g-translate" size={24} color="black" />
            </Right>
           </ListItem>

           <ListItem button                         onPress={() => logout()}
>
           <Left>
           <Text style={{
               fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',
               fontSize: 13,
               padding: 10,
               textAlign: 'center'
           }}>{t('Logout')}</Text>
                        </Left>
             <Right>
<MaterialCommunityIcons name="logout" size={24} color="black" />
             </Right>
           </ListItem>
         </List>
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
