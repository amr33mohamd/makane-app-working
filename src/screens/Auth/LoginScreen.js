import React,{useState,useEffect} from 'react';
import {View,Image,StyleSheet,Alert,ScrollView,TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Container, Header, Content, Item, Input, Icon,Button,Text,Label,Toast } from 'native-base';
import StoreBox from '../../components/StoreBox'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { LoginButton, AccessToken,GraphRequest,GraphRequestManager,LoginManager } from 'react-native-fbsdk';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import messaging from '@react-native-firebase/messaging';

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';

export default function LoginScreen({route,navigation}) {
    const { t } = useTranslation();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [user,setUser] = useState();
    const [error,setError] = useState();
    const [login,setLogin] = useState('0');
    const [google,setGoogle] = useState('0');

     useEffect(()=>{
        AsyncStorage.getItem('token').then((token)=>{
            if(token){
                navigation.navigate('User');
            }
        })
         axios.get('http://makaneapp.com/api/settings',null, {

         }).then((value)=>{
             setLogin(''+value.data.settings[2].value)
             setGoogle(''+value.data.settings[3].value)

         })


     },[login]);
    //http://10.0.2.2:8000

    var fb = () =>{
      LoginManager.setLoginBehavior("web_only")

        LoginManager.logInWithPermissions(['public_profile']).then(
            function(result) {
                if (result.isCancelled) {
                    alert('Login was cancelled');
                } else {
                    const infoRequest = new GraphRequest(
                        '/me',
                        null,
                        _responseInfoCallback,
                    );

                    new GraphRequestManager().addRequest(infoRequest).start();

                }
            },
            function(error) {
                alert('Login failed with error: ' + error);
            }
        );

    }
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: '327886044350-hs06gobmm6t2publ6930svqh2hcf346b.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      // hostedDomain: '', // specifies a hosted domain restriction
      // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    //  accountName: '', // [Android] specifies an account name on the device that should be used
    //  iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
            var signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            setUser(userInfo);
            submitSocial(userInfo.user.email)
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                alert(error)
            }
        }
    };
    var _responseInfoCallback = (error: ?Object, result: ?Object) =>{
        if (error) {
            alert('Error fetching data: ' + error.toString());
        } else {
          // alert(JSON.stringify(result))
          // alert(JSON.stringify(result));
            submitSocial(result.name+'@facebook.com');
        }
    }

    var submitSocial = (email) =>{

            axios.post('http://makaneapp.com/api/social-login',null, {
                params: {
                    email,
                }
            })
                .then(function (response) {
                    // alert(JSON.stringify(response))
                    messaging().subscribeToTopic(''+response.data.user.id);

                    AsyncStorage.setItem('token',response.data.token);
                    if(response.data.status == 1 ){
                        navigation.navigate('User');
                        AsyncStorage.setItem('type','1');

                    }
                    else {
                        AsyncStorage.setItem('token',response.data.token);
                        navigation.navigate('Phone');
                        AsyncStorage.setItem('type','4');

                    }
                })
                .catch(function (error) {

                    setError('Wrong email or password');
                    // alert(JSON.stringify(error.response))
                    // alert(error.response.data.errors);
                });

            // Toast.show({
            //     text: 'please fill in all data'+email,
            //     buttonText: 'Okay',
            //     type: "danger"
            //
            // })


    }

    var submit = () =>{
        if(email != '' && password != '' ){
            axios.post('http://makaneapp.com/api/login',null, {
                params: {
                    email, password
                }
            })
                .then(function (response) {
                    AsyncStorage.setItem('token',response.data.token);
                    messaging().subscribeToTopic(''+response.data.user.id);
                    // alert(response.data.user.id);

                    if(response.data.user.type == 1 ){
                        navigation.navigate('User');
                        AsyncStorage.setItem('type','1');

                    }
                    else {
                      // alert(response.data.user.id);
                        navigation.navigate('Store');
                        AsyncStorage.setItem('type','2');

                    }
                })
                .catch(function (error) {

                    setError('Wrong email or password');
                    // alert(JSON.stringify(error.response))
                    // alert(error.response.data.errors);
                });
        }
        else{
            Toast.show({
                text: 'please fill in all data',
                buttonText: 'Okay',
                type: "danger"

            })
        }

    }
    return (
        <Container>
            <Content>

                <View style={{  alignItems: 'center'}}>
                    <Image
                        style={styles.stretch}
                        source={require('../../Assets/Images/login.png')}
                    />

                </View>

                <View style={styles.container}>
                    <View style={{borderBottomColor:'#000',borderBottomWidth:3,display:'flex',margin:10}}>
                        <Text style={{fontFamily:'Poppins-Medium',padding:10,fontSize:25}}>{t('Login')}</Text>

                    </View>
                    {
                        (login == '1')
                        ?
                            <View style={{flexDirection:'row'}}>
                            {

                            (google == 1)?
                                <Button
                                    title="Press me"
                                    onPress={() => {signIn()}}
                                    style={ styles.goButton }
                                >
                                    <Text style={{color:'#fff' ,fontFamily:'Poppins-Medium',textAlign:'center',fontSize:15}}><AntDesign name="google" size={20} style={{color:'#fff',textAlign:'center',fontSize:16}}/>{t(' Google')}</Text>

                                </Button>
                                :null
                              }
                                <Button
                                    title="Press me"
                                    onPress={() => {fb()}}
                                    style={ styles.fbButton }
                                >

                                    <Text style={{color:'#fff' ,fontFamily:'Poppins-Medium',textAlign:'center',fontSize:15}}><Entypo name="facebook" size={20} style={{color:'#fff',textAlign:'center',fontSize:16}}/>{t(' Facebook')}</Text>

                                </Button>

                            </View>
                            :null
                    }


                    {
                        error && <Text style={{        fontFamily:'Poppins-Medium',
                            fontSize:12,
                            padding:10,
                            textAlign:'center',
                            color:'#E50000'
                        }}>{error}</Text>
                    }
                    <Text style={{        fontFamily:'Poppins-Medium',
                        fontSize:12,
                        padding:10,
                        textAlign:'center'
                    }}>{t('Email')}</Text>
                    <Item style={styles.searchInput} rounded >

                        <Input placeholder='Email' value={email} onChangeText={(value)=>setEmail(value)} style={{textAlign:'center'}}  fontFamily='Poppins-ExtraLight' fontSize={15}  placeholderTextColor="#CECDCD"
                        />
                    </Item>


                    <Text style={{        fontFamily:'Poppins-Medium',
                        fontSize:12,
                        padding:10,
                        textAlign:'center'
                    }}>{t('Password')}</Text>
                    <Item style={styles.searchInput} rounded >

                        <Input secureTextEntry={true} placeholder='Password' value={password} onChangeText={(value)=>setPassword(value)} style={{textAlign:'center'}}  fontFamily='Poppins-ExtraLight' fontSize={15}  placeholderTextColor="#CECDCD"
                        />
                    </Item>




                    <TouchableOpacity onPress={()=>{
                        navigation.navigate('SignUp')
                    }}
                                  >
                    <Text style={{        fontFamily:'Poppins-Medium',
                        fontSize:12,
                        padding:10,
                        textAlign:'center',

                    }}
                    >{t('New User ?')}</Text>
                    </TouchableOpacity>


                </View>
                <View style={{alignItems:'center',padding:20}}>
                    <Button
                        title="Press me"
                        onPress={() => {submit()}}
                        style={ styles.selectedButton }
                    >
                        <Text style={{color:'#fff' ,fontFamily:'Poppins-Medium',textAlign:'center',fontSize:15}}>{t('Login')}</Text>

                    </Button>

                </View>
            </Content>

        </Container>


    );
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
    buttons:{
        flexDirection:'row',
        marginVertical:20,
    },
    selectedButton: {
        backgroundColor: '#E50000',
        alignItems:'center',
        justifyContent:'center',
        width:'70%',
        borderRadius:50,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: '#E50000',
        shadowOffset: { height: 0, width: 0 },
        alignSelf:'center'

    },
    fbButton: {
        backgroundColor: '#1a77f2',
        alignItems:'center',
        justifyContent:'center',
        width:'40%',
        borderRadius:50,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: '#E50000',
        shadowOffset: { height: 0, width: 0 },

    },
    goButton: {
        backgroundColor: '#E50000',
        alignItems:'center',
        justifyContent:'center',
        width:'40%',
        borderRadius:50,
        marginHorizontal:10,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: '#E50000',
        shadowOffset: { height: 0, width: 0 },

    },

    components:{
        width:'90%'
    },
    stretch:{
        resizeMode: 'stretch',


    }
});
