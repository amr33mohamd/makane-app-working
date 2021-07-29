import React,{useState,useEffect} from 'react';
import {View,Image,StyleSheet,Alert,ScrollView,TouchableOpacity} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Container, Header, Content, Item, Input, Icon,Button,Text,Label,Toast } from 'native-base';
import StoreBox from '../../components/StoreBox'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import messaging from '@react-native-firebase/messaging';

export default function SignUpScreen({route,navigation}) {
    const { t } = useTranslation();
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [phone,setPhone] = useState('974');
    const [code,setCode] = useState();

    const [errors,setErrors] = useState({});
    useEffect(()=>{
        AsyncStorage.getItem('token').then((token)=>{
            if(token){
                navigation.navigate('User');
            }
        })
    },[]);

   var submit = () =>{
       if(email != '' && password != '' && password != '' && phone != '20'){
           axios.get('http://makaneapp.com/api/signup', {
               params: {
                   email, password, phone, name, country: 'kkk',code
               }
           })
               .then(function (response) {
                 messaging().subscribeToTopic(''+response.data.user.id);

                 navigation.reset({
                     index: 0,
                     routes: [{name: 'User'}],
                 });
                 AsyncStorage.setItem('type','1');
                   AsyncStorage.setItem('token',response.data.token);
               })
               .catch(function (error) {
                // alert(JSON.stringify(error.response))
                setErrors(error.response.data.errors)

                    // alert(error);
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
                <Button
                    onPress={() => navigation.goBack()}
                    style={{
                        position: 'absolute',
                        width: 50,
                        height: 50,
                        backgroundColor: '#fff',
                        left: 10,
                        justifyContent: 'center',
                        borderRadius: 130
                    }}
                >
                    <Ionicons name="ios-arrow-back" size={24} color="black"/>

                </Button>
                    <Image
                        style={styles.stretch}
                        source={require('../../Assets/Images/signup.png')}
                    />

                </View>

                <View style={styles.container}>
                    <View style={{borderBottomColor:'#000',borderBottomWidth:3,display:'flex',margin:10}}>
                    <Text style={{fontFamily:'Poppins-Medium',padding:10,fontSize:25}}>{t('Sign Up')}</Text>
                    </View>
                    <Text style={{        fontFamily:'Poppins-Medium',
                        fontSize:12,
                        padding:10,
                        textAlign:'center'

                    }}>{t('Name')}</Text>
                    <Item style={styles.searchInput} rounded >

                        <Input placeholder='Name' value={name} onChangeText={(value)=>setName(value)} style={{textAlign:'center'}}  fontFamily='Poppins-ExtraLight' fontSize={15}  placeholderTextColor="#CECDCD"
                        />
                    </Item>

                    <Text style={{        fontFamily:'Poppins-Medium',
                        fontSize:12,
                        padding:10,
                        textAlign:'center'
                    }}>{t('Email')}</Text>
                    <Item style={styles.searchInput} rounded >

                        <Input placeholder='Email' value={email} onChangeText={(value)=>setEmail(value)} style={{textAlign:'center'}}  fontFamily='Poppins-ExtraLight' fontSize={15}  placeholderTextColor="#CECDCD"
                        />
                    </Item>
                    {
                        errors.email && <Text style={{        fontFamily:'Poppins-Medium',
                            fontSize:12,
                            padding:10,
                            textAlign:'center',
                            color:'#E50000'
                        }}>{errors.email}</Text>
                    }

                    <Text style={{        fontFamily:'Poppins-Medium',
                        fontSize:12,
                        padding:10,
                        textAlign:'center'
                    }}>{t('Password')}</Text>
                    <Item style={styles.searchInput} rounded >

                        <Input secureTextEntry={true} placeholder='Password' value={password} onChangeText={(value)=>setPassword(value)} style={{textAlign:'center'}}  fontFamily='Poppins-ExtraLight' fontSize={15}  placeholderTextColor="#CECDCD"
                        />
                    </Item>
                    {
                        errors.password && <Text style={{        fontFamily:'Poppins-Medium',
                            fontSize:12,
                            padding:10,
                            textAlign:'center',
                            color:'#E50000'
                        }}>{errors.password}</Text>
                    }

                    <Text style={{        fontFamily:'Poppins-Medium',
                        fontSize:12,
                        padding:10,
                        textAlign:'center'
                    }}>{t('Phone (start with country code)')}</Text>
                    <Item style={styles.searchInput} rounded >

                        <Input placeholder='Phone' value={phone} onChangeText={(value)=>{setPhone(value)}} style={{textAlign:'center'}}  fontFamily='Poppins-ExtraLight' fontSize={15}  placeholderTextColor="#CECDCD"
                        />
                    </Item>
                    {
                        errors.phone && <Text style={{        fontFamily:'Poppins-Medium',
                            fontSize:12,
                            padding:10,
                            textAlign:'center',
                            color:'#E50000'
                        }}>{errors.phone}</Text>
                    }
                    <Text style={{        fontFamily:'Poppins-Medium',
                        fontSize:12,
                        padding:10,
                        textAlign:'center'
                    }}>{t('Invitation Code')}</Text>
                    <Item style={styles.searchInput} rounded >

                        <Input placeholder='Invitation code' value={code} onChangeText={(value)=>{setCode(value)}} style={{textAlign:'center'}}  fontFamily='Poppins-ExtraLight' fontSize={15}  placeholderTextColor="#CECDCD"
                        />
                    </Item>
                    {
                        errors.code && <Text style={{        fontFamily:'Poppins-Medium',
                            fontSize:12,
                            padding:10,
                            textAlign:'center',
                            color:'#E50000'
                        }}>{errors.code}</Text>
                    }


                    <TouchableOpacity onPress={()=>{
                        navigation.navigate('Login')
                    }}
                    >
                        <Text style={{        fontFamily:'Poppins-Medium',
                            fontSize:12,
                            padding:10,
                            textAlign:'center'
                        }}
                        >{t('Already have an account ?')}</Text>
                    </TouchableOpacity>


                </View>
                <View style={{alignItems:'center',padding:20}}>
                    <Button
                        title="Press me"
                        onPress={() => {submit()}}
                        style={ styles.selectedButton }
                    >
                        <Text style={{color:'#fff' ,fontFamily:'Poppins-Medium',textAlign:'center',fontSize:15}}>{t('Next')}</Text>

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

    components:{
        width:'90%'
    },
    stretch:{
        resizeMode: 'stretch',


    }
});
