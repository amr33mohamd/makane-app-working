import React,{useState} from 'react';
import {View,Image,StyleSheet,Alert,ScrollView} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Container, Header, Content, Item, Input, Icon,Button,Text,Label,Toast } from 'native-base';
import StoreBox from '../../components/StoreBox'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export default function PhoneScreen({route,navigation}) {
    const { t } = useTranslation();
    const [phone,setPhone] = useState('974');
    const [code,setCode] = useState();

    const [errors,setErrors] = useState({});

    var submit = () =>{
        AsyncStorage.getItem('token').then((token)=> {


            if (phone != '') {
                axios.post('http://127.0.0.1:8000/api/add-phone',null, {
                    params: {
                        phone,
                        code
                        // id: JSON.parse(route.params.data).user.id
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(function (response) {
                        // alert(JSON.stringify(response.data));
                        // // AsyncStorage.setItem('token',JSON.parse(response.data).token)
                        // // AsyncStorage.getItem('token').then((token)=>{
                        // //     alert(token);
                        // // });
                        navigation.reset({
                            index: 0,
                            routes: [{name: 'User'}],
                        });
                        AsyncStorage.setItem('type','1');
                        // navigation.navigate('User');
                    })
                    .catch(function (error) {
                        // alert(JSON.stringify(error))
                        setErrors(error.response.data.errors)

                        // alert(JSON.stringify(error.response))
                        // setError('wrorg Phone');
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
    return (
        <Container>
            <Content>

                <View style={{  alignItems: 'center'}}>
                    <Image
                        style={styles.stretch}
                        source={require('../../Assets/Images/verify.png')}
                    />

                </View>

                <View style={styles.container}>
                    <View style={{borderBottomColor:'#000',borderBottomWidth:3,display:'flex',margin:10}}>
                    <Text style={{fontFamily:'Poppins-Medium',padding:10,fontSize:25}}>{t('Add Number')}</Text>
                    </View>


                    <Text style={{        fontFamily:'Poppins-Medium',
                        fontSize:12,
                        padding:10,
                        textAlign:'center'
                    }}>{t('Phone (with country code)')}</Text>
                    <Item style={styles.searchInput} rounded >

                        <Input placeholder='Phone' value={phone} onChangeText={(value)=>setPhone(value)} style={{textAlign:'center'}}  fontFamily='Poppins-ExtraLight' fontSize={15}  placeholderTextColor="#CECDCD"
                        />
                    </Item>
                    {
                        errors.phone && <Text style={{        fontFamily:'Poppins-Medium',
                            fontSize:12,
                            padding:10,
                            textAlign:'center',
                            color:'#E50000'
                        }}> {errors.phone}</Text>
                    }
                    <Text style={{        fontFamily:'Poppins-Medium',
                        fontSize:12,
                        padding:10,
                        textAlign:'center'
                    }}>{t('Invite Code')}</Text>
                    <Item style={styles.searchInput} rounded >

                        <Input placeholder='Code' value={code} onChangeText={(value)=>setCode(value)} style={{textAlign:'center'}}  fontFamily='Poppins-ExtraLight' fontSize={15}  placeholderTextColor="#CECDCD"
                        />
                    </Item>
                    {
                        errors.code && <Text style={{        fontFamily:'Poppins-Medium',
                            fontSize:12,
                            padding:10,
                            textAlign:'center',
                            color:'#E50000'
                        }}> {errors.code}</Text>
                    }







                </View>
                <View style={{alignItems:'center',padding:20,flexDirection:'row',justifyContent:'center'}}>
                    <Button
                        title="Press me"
                        onPress={() => {submit()}}
                        style={ styles.selectedButton }
                    >
                        <Text style={{color:'#fff' ,fontFamily:'Poppins-Medium',textAlign:'center',fontSize:15}}>{t('Next')}</Text>

                    </Button>
                    <Button
                        title="Press me"
                        onPress={() => {
                            AsyncStorage.removeItem('token');
                            AsyncStorage.removeItem('type');
                            navigation.navigate('Auth',{screen:'SignUp'})
                        }}
                        style={ styles.button }
                    >
                        <Text style={{color:'#000' ,fontFamily:'Poppins-Medium',textAlign:'center',fontSize:15}}>{t('Edit Data')}</Text>

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
        width:'40%',
        borderRadius:50,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: '#E50000',
        shadowOffset: { height: 0, width: 0 },

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
        resizeMode: 'stretch',


    }
});

