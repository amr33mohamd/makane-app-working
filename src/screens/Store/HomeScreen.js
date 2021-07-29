import React,{useState,useEffect} from 'react';
import {View, Image, StyleSheet, Alert, ScrollView, Platform, I18nManager} from 'react-native';
import { useTranslation } from 'react-i18next';
import {Container, Header, Content, Item, Input, Icon, Button, Text, Label,Picker, Toast} from 'native-base';
import StoreBox from '../../components/StoreBox'
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import ImagePicker from 'react-native-image-picker';
import i18n from "i18next";
import RNRestart from 'react-native-restart'; // Import package from node modules
import messaging from '@react-native-firebase/messaging';

export default  function HomeScreen({navigation}) {
    const { t } = useTranslation();
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [code,setCode] = useState();
    const [points,setPoints] = useState();
    const [description_ar,setDescriptionAr] = useState();
    const [description_en,setDescriptionEn] = useState();
    const [password,setPassword] = useState();
    const [available,setAvailable] = useState();
    const [errors,setErrors] = useState({});
    const [persons,setPersons] = useState();
    const [update,setUpdate] = useState(false);
    const [mainImage,setMainImage] = useState();
    const [formMainImage,setFormMainImage] = useState();
    const [user,setUser] = useState({store_images:[]});
    const [smoking, setSmoking] = useState('0');
    const [outt, setOutt] = useState('0');

    const options = {
        title: 'Select Avatar',
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };
    useEffect(()=>{
        AsyncStorage.getItem('token').then((token)=>{
            axios.post('http://makaneapp.com/api/user',null, {

                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(function (response) {
                    setName(response.data.user.name);
                    setCode(response.data.user.invite_code)
                    setPoints(response.data.user.points)
                    setDescriptionAr(response.data.user.description_ar)
                     setDescriptionEn(response.data.user.description_en)
                    setPersons(response.data.user.available)
                    setSmoking(response.data.user.smoking)
                    setOutt(response.data.user.outt)
                    setUser(response.data.user);
                })
                .catch(function (error) {
                    // alert(JSON.stringify(error))

                    // alert(error);
                });
        });
    },[update]);


   var deleteImage= (id)=>{
       AsyncStorage.getItem('token').then((token)=>{
           axios.post('http://makaneapp.com/api/delete-image',null, {
                params:{
                    id
                },
               headers: {
                   'Authorization': `Bearer ${token}`
               }
           })
               .then(function (response) {
                   Toast.show({
                       text: 'successfully deleted image',
                       buttonText: 'Okay',
                       type: "success"

                   })
                   setUpdate(!update);
               })
               .catch(function (error) {
                   // alert(JSON.stringify(error))

                   // alert(error);
               });
       });
   }

    var mainImageUpload = ()=>{
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // const source = { uri: response.uri };
                const data = new FormData();

                data.append('image', {
                    name: 'hhhh',
                    type: 'image/jpeg',
                    uri:  response.uri
                });


                axios({
                    url:'http://makaneapp.com/api/upload-image',
                    method:'POST',
                    headers:{
                        'Content-Type':'multipart/form-data'
                    },
                    data
                }).then(function(response){
                    // alert(JSON.stringify(response.data.file_name))
                    setFormMainImage(response.data.file_name);


                }).catch((error) =>{
                    // alert(JSON.stringify(error))
                })
                setMainImage(response);

            }
        });
    }

    var secondryImageUpload = ()=>{
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // const source = { uri: response.uri };
                AsyncStorage.getItem('token').then((token)=>{
                    const data = new FormData();



                            data.append('image', {
                                name: 'hhh',
                                type: 'image/jpeg',
                                uri:  response.uri
                            });
                          setTimeout(()=>{
// alert(JSON.stringify(data))

                    axios({
                        url:'http://makaneapp.com/api/add-image',
                        method:'POST',
                        headers:{
                            'Authorization': `Bearer ${token}`,
                            'Content-Type':'multipart/form-data'
                        },
                        data
                    }).then(function(response){
                        Toast.show({
                            text: 'successfully added image',
                            buttonText: 'Okay',
                            type: "success"

                        })
                        // alert(JSON.stringify(response))
                        setUpdate(!update);

                    }).catch((error) =>{
                        // alert(JSON.stringify(error))
                        // alert('bb')
                    })
                          },1000);



                })


            }
        });
    }

    var submit = (available2) =>{
        AsyncStorage.getItem('token').then((token)=> {

            if ( name != '') {
                axios.post('http://makaneapp.com/api/update_user', null, {
                    params: {
                        email, password, name,description_ar,description_en,
                        available:(available2 != null) ? available2 : persons,image:formMainImage,smoking,outt
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
    var logout = ()=>{
        AsyncStorage.removeItem('token');
        navigation.navigate('Auth',{screen:'Login'});
        messaging().unsubscribeFromTopic(''+user.id);

    }

    return (
        <Container>
            <Content>

                <View  style={{    position: 'absolute',height:220,width:'100%',justifyContent:'flex-start',flexDirection:'column'}}>
                    <Image
                        source={(i18n.language == 'ar') ? require('../../Assets/Images/arabic.jpg') :require('../../Assets/Images/test.jpg')}
                        style={{resizeMode:'cover',height:'100%',width:'100%'}}
                    />

                </View>
                <View renderToHardwareTextureAndroid style={styles.container}>

                    <Text style={{        fontFamily:'Poppins-Medium',
                        fontSize:12,
                        padding:10,
                        textAlign:'center'

                    }}>{t('available')}</Text>
                    <Item style={styles.searchInput} rounded >

                        <Input
                            placeholder='Available'
                            value={''+persons}
                            onChangeText={
                                 (value)=>{
                                   setPersons(value);
                                       submit(value);


                                }
                            }
                            style={{textAlign:'center'}}
                            fontFamily='Poppins-ExtraLight'
                            fontSize={15}
                            placeholderTextColor="#CECDCD"
                        />
                    </Item>

                    <Text style={{        fontFamily:'Poppins-Medium',
                        fontSize:12,
                        padding:10,
                        textAlign:'center'

                    }}>{t('Name')}</Text>
                    <Item style={styles.searchInput} rounded >

                        <Input placeholder='Name' value={name} onChangeText={(value)=>setName(value)} style={{textAlign:'center'}}  fontFamily='Poppins-ExtraLight' fontSize={15}  placeholderTextColor="#CECDCD"
                        />
                    </Item>
                    {
                        errors.name && <Text style={{        fontFamily:'Poppins-Medium',
                            fontSize:12,
                            padding:10,
                            textAlign:'center',
                            color:'#E50000'
                        }}>{errors.name}</Text>
                    }

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',padding:10 }}>
                        {(mainImage)? (
                                <Image
                                    source={{ uri: mainImage.uri }}
                                    style={{ width:100, height: 100,margin:10,resizeMode:'contain' }}
                                />
                            )
                            :
                            <Image
                                source={{ uri: 'http://makaneapp.com/images/'+user.image }}
                                style={{ width: 100, height: 100,margin:10,resizeMode:'contain' }}
                            />
                        }
                    <Button title="Choose Photo" style={{
                        backgroundColor: '#E50000',
                        alignItems:'center',
                        justifyContent:'center',
                        borderRadius:50,
                        shadowOpacity: 0.3,
                        shadowRadius: 5,
                        shadowColor: '#E50000',
                        shadowOffset: { height: 0, width: 0 },
                        margin:10,

                    }} onPress={()=>{mainImageUpload()}} >
                        <Text style={{
                            fontFamily:'Poppins-Medium',
                            fontSize:12,
                            padding:10,
                            textAlign:'center',
                            color:'#fff',
                            alignSelf:'center'

                        }}>{t('Upload intro image')}</Text>
                    </Button>
                </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',padding:10 }} renderToHardwareTextureAndroid>
                        <ScrollView
                            renderToHardwareTextureAndroid
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            decelerationRate="fast"


                        >
                            {
                                (user != null) &&
                                <View renderToHardwareTextureAndroid style={{flexDirection: 'row'}}>
                                    {user.store_images.map(
                                        (image) =>

                                            (<View>
                                                <Image
                                                    source={{uri: 'http://makaneapp.com/images/' + image.image}}
                                                    style={{flex: .3, height: 100, margin: 10}}
                                                />

                                                <Button title="Choose Photo" style={{
                                                    backgroundColor: '#E50000',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    borderRadius: 50,
                                                    shadowOpacity: 0.3,
                                                    shadowRadius: 5,
                                                    shadowColor: '#E50000',
                                                    shadowOffset: {height: 0, width: 0},
                                                    margin: 10,

                                                }} onPress={() => {
                                                    deleteImage(image.id)
                                                }}>
                                                    <Text style={{
                                                        fontFamily: 'Poppins-Medium',
                                                        fontSize: 12,
                                                        padding: 10,
                                                        textAlign: 'center',
                                                        color: '#fff',
                                                        alignSelf: 'center'

                                                    }}>{t('Delete')}</Text>
                                                </Button>
                                            </View>)
                                    )}


                                </View>
                            }
                        </ScrollView>

                        <Button title="Choose Photo" style={{
                            backgroundColor: '#E50000',
                            alignItems:'center',
                            justifyContent:'center',
                            borderRadius:50,
                            shadowOpacity: 0.3,
                            shadowRadius: 5,
                            shadowColor: '#E50000',
                            shadowOffset: { height: 0, width: 0 },
                            margin:10,

                        }} onPress={()=>{secondryImageUpload()}} >
                            <Text style={{
                                fontFamily:'Poppins-Medium',
                                fontSize:12,
                                padding:10,
                                textAlign:'center',
                                color:'#fff',
                                alignSelf:'center'

                            }}>{t('Upload secondary image')}</Text>
                        </Button>
                    </View>




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
                    }}>{t('Description Arabic')}</Text>
                    <Item style={[styles.searchInput,{height:150}]} rounded >

                        <Input placeholder='Description' value={description_ar} onChangeText={(value)=>setDescriptionAr(value)}
                               multiline = {true}
                               numberOfLines = {4}
                               style={{textAlign:'center',height:150}}  fontFamily='Poppins-ExtraLight' fontSize={15}  placeholderTextColor="#CECDCD"
                        />
                    </Item>

                    <Text style={{        fontFamily:'Poppins-Medium',
                        fontSize:12,
                        padding:10,
                        textAlign:'center'
                    }}>{t('Description English')}</Text>
                    <Item style={[styles.searchInput,{height:150}]} rounded >

                        <Input
                            multiline = {true}
                            numberOfLines = {4}
                            placeholder='Description' value={description_en} onChangeText={(value)=>setDescriptionEn(value)} style={{textAlign:'center'}}  fontFamily='Poppins-ExtraLight' fontSize={15}  placeholderTextColor="#CECDCD"
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
                            color:'#E50000',
                        }}>{errors.password}</Text>
                    }


                    <Text style={{
                        fontFamily: 'Poppins-Medium',
                        fontSize: 12,
                        padding: 10,
                        textAlign: 'center'

                    }}>{t('Smoking')}</Text>
                    <Item style={styles.searchInput} rounded>

                        <Picker
                            note
                            mode="dropdown"
                            style={{width: 120}}
                            selectedValue={smoking}
                            onValueChange={(value) => {
                                setSmoking(value)
                            }}
                        >
                            <Picker.Item label="Yes" value="1"/>
                            <Picker.Item label="No" value="0"/>
                        </Picker>

                    </Item>


                    <Text style={{        fontFamily:'Poppins-Medium',
                        fontSize:12,
                        padding:10,
                        textAlign:'center'

                    }}>{t('Outside Place')}</Text>

                    <Item style={styles.searchInput} rounded >

                        <Picker
                            note
                            mode="dropdown"
                            style={{ width: 120 }}
                            selectedValue={outt}
                            onValueChange={(value)=>{
                                setOutt(value)
                            }
                            }
                        >
                            <Picker.Item label="Yes" value="1" />
                            <Picker.Item label="No" value="0" />
                        </Picker>
                    </Item>




                    <Button
                        title="Press me"
                        onPress={() => {
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

                        }}
                        style={{
                            backgroundColor: '#E50000',
                            alignItems:'center',
                            justifyContent:'center',
                            width:'70%',
                            borderRadius:50,
                            shadowOpacity: 0.3,
                            shadowRadius: 5,
                            shadowColor: '#E50000',
                            shadowOffset: { height: 0, width: 0 },
                            margin:10,
                            alignSelf:'center'
                        }}
                    >
                        <Text style={{
                            color: '#fff',
                            fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',                        fontSize: 13,
                            textAlign: 'center',
                            fontSize: 15,
                            alignSelf:'center'
                        }}>{t('Change Langauage to ')}{ (i18n.language == 'ar') ? 'english' : 'Arabic'}</Text>

                    </Button>



                </View>
                <View style={{alignItems:'center',padding:20,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Button
                        title="Press me"
                        onPress={() => submit(null)}
                        style={ styles.selectedButton }
                    >
                        <Text style={{color:'#fff' ,fontFamily:'Poppins-Medium',textAlign:'center',fontSize:15}}>{t('Save')}</Text>

                    </Button>
                    <Button
                        title="Press me"
                        onPress={() => logout()}
                        style={ styles.button }
                    >
                        <Text style={{color:'#000' ,fontFamily:'Poppins-Medium',textAlign:'center',fontSize:15}}>{t('Log Out')}</Text>

                    </Button>
                </View>

            </Content>

        </Container>


    );
}
const styles = StyleSheet.create({

    container: {
        backgroundColor:'#FFFFFF',
        borderRadius:40,
        marginTop:190,
        textAlign:'center',
        alignItems:'center',
        padding:20,

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
