import React,{useState,useEffect} from 'react';
import {View,Image,StyleSheet,Alert,ScrollView,FlatList,TouchableOpacity,I18nManager,Linking} from 'react-native';
import { useTranslation } from 'react-i18next';
import {Container, Header, Content, Item, Input, Icon, Button, Text,Picker, Tab, Tabs, Thumbnail, Toast,Spinner} from 'native-base';
import StoreBox from '../../components/StoreBox'
import Geolocation from '@react-native-community/geolocation';
import axios from "axios/index";
import AsyncStorage from "@react-native-community/async-storage";
import Carousel from 'react-native-snap-carousel';
import i18n from "i18next";
import Modal from 'react-native-modal';
import QRCode from 'react-native-qrcode-svg';
import DateTimePicker from '@react-native-community/datetimepicker';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ReviewBox from '../../components/ReviewBox'
import CouponBox from "../../components/CouponBox";
import SpecialEventBox from "../../components/SpecialEventBox";
import CalenderScreen from "./CalenderScreen";
import StatusBarPlaceHolder from "../../components/StatusBarPlaceHolder"
import moment from "moment/moment";
export default function CafeScreen({route,navigation}) {
    const {t} = useTranslation();
    const [store,setStore]= useState(JSON.parse(route.params.item));
    const [normalModal,setNormalModal] = useState(false);
    const [specialModal,setSpecialModal] = useState(false);
    const [currentSpecialEvent,setCurrentSpecialEvent]= useState();
    const [selected,setSelected] = useState('view');
    const [featched,setFeatched] = useState(false);
    const [time, setTime] = useState(new Date());
    const [show, setShow] = useState(false);
    const [persons, setPersons] = useState('1');
    const [kids, setKids] = useState('0');
    const [smoking, setSmoking] = useState('0');
    const [outt, setOutt] = useState('0');

    var renderStars = ()=>{
        var gold = parseInt(JSON.parse(route.params.item).rating);
        var empty = 5 - parseInt(JSON.parse(route.params.item).rating);
        stars = [];
        while(gold > 0){
            gold = gold - 1;
            stars.push ( <AntDesign name="star" color="gold" size={15} style={{padding:1}}/>)
        }
        for(let m = empty;m > 0;m--){
            stars.push ( <AntDesign name="star" color="gray" size={15} style={{padding:1}}/>)
        }
        return stars;
    }
    useEffect(()=>{
        setStore(JSON.parse(route.params.item));



        // i18n.changeLanguage ('ar');
    },[]);

    const showTimepicker = () => {
        setShow(true);
    };
    var reserveNormalButton = ()=>{
        setNormalModal(true);
    }
    var reserveSpecialButton = (id)=>{
        setSpecialModal(true);
        setCurrentSpecialEvent(id);
    }


    var closeModal = ()=>{
        setNormalModal(false);
        setSpecialModal(false);
    }

    var reserveNormal = ()=>{
        AsyncStorage.getItem('token').then((token)=>{
            if(token) {
                axios.post('http://127.0.0.1:8000/api/reserve', null, {
                    params: {
                        store_id: store.id,
                        type: 1,
                        smoking,
                        outt,
                        time,
                        persons,
                        kids

                    },
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then((response) => {

                    closeModal()
                    Toast.show({
                        text: 'Successfully booked waiting for you ;)',
                        buttonText: 'Okay',
                        type: "success"

                    })
                    navigation.navigate('User', {screen: 'Calender', initial: false})

                }).catch((error) => {
                        closeModal()
                        if (error.response.data.err == 1) {
                            Toast.show({
                                text: 'You are banned from booking',
                                buttonText: 'Okay',
                                type: "danger"

                            });
                        }
                        else if (error.response.data.err == 2) {
                            Toast.show({
                                text: 'You already have active reservation',
                                buttonText: 'Okay',
                                type: "danger"

                            })
                        }
                        else if (error.response.data.err == 3) {
                            Toast.show({
                                text: 'Sorry but some one got the last place',
                                buttonText: 'Okay',
                                type: "danger"

                            })
                        }

                    }
                );
            }
            else{
                closeModal()
                navigation.navigate('Auth',{screen:'Login'});

                Toast.show({
                    text: 'You need to login first',
                    buttonText: 'Okay',
                    type: "danger"

                });
            }
        })
    }
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate ;
        setShow(false);
        setTime(currentDate);
    };

    var reserveSpecial = ()=>{
        AsyncStorage.getItem('token').then((token)=>{
            if(token) {
                axios.post('http://127.0.0.1:8000/api/reserve', null, {
                    params: {
                        store_id: store.id,
                        type: 2,
                        SpecialEvent_id: currentSpecialEvent
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then((response) => {
                    closeModal()

                    Toast.show({
                        text: 'Successfully booked waiting for you ;)',
                        buttonText: 'Okay',
                        type: "success"

                    })
                    navigation.navigate('User', {screen: 'Calender', initial: false})

                }).catch((error) => {
                        closeModal()
                        if (error.response.data.err == 1) {
                            Toast.show({
                                text: 'You are banned from booking',
                                buttonText: 'Okay',
                                type: "danger"

                            });
                        }
                        else if (error.response.data.err == 2) {
                            Toast.show({
                                text: 'You already have active reservation',
                                buttonText: 'Okay',
                                type: "danger"

                            })
                        }
                        else if (error.response.data.err == 3) {
                            Toast.show({
                                text: 'Sorry but some one got the last place',
                                buttonText: 'Okay',
                                type: "danger"

                            })
                        }
                    }
                );
            }
            else{
                closeModal()
                navigation.navigate('Auth',{screen:'Login'});
                Toast.show({
                    text: 'You need to login first',
                    buttonText: 'Okay',
                    type: "danger"

                });
            }
        })


    }

return (
    <ScrollView
        decelerationRate="fast"
        renderToHardwareTextureAndroid
        >
        <StatusBarPlaceHolder/>

            <Modal animationIn="fadeIn" animationOut="fadeOut" isVisible={normalModal} style={{marginTop:70}}>
                <ScrollView>
                <View style={{backgroundColor:'#fff',padding:10,borderRadius:20}}>
                    <Text style={{fontFamily:'Poppins-Medium',color:'#000',fontSize:20,paddingHorizontal:20,paddingTop:20}}>{t('Are you sure you want to book now!')}</Text>
                    <Text style={{fontFamily:'Poppins-Medium',color:'#CECDCD',fontSize:15,padding:20}}>{t('You can cancel your reservation 30 minutes after reserve.')}</Text>
                    <Text style={{        fontFamily:'Poppins-Medium',
                        fontSize:12,
                        padding:10,
                        textAlign:'center'

                    }}> {moment(time).format('LLLL')}</Text>
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
                        alignSelf:'center'

                    }} onPress={showTimepicker} >
                        <Text style={{
                            fontFamily:'Poppins-Medium',
                            fontSize:12,
                            padding:10,
                            textAlign:'center',
                            color:'#fff',
                            alignSelf:'center'

                        }}>{t('Select Date and Time')}</Text>
                    </Button>

                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={time}
                            mode={'datetime'}
                            is24Hour={false}
                            display="default"
                            onChange={onChange}
                        />
                    )}

                    <Text style={{        fontFamily:'Poppins-Medium',
                        fontSize:12,
                        padding:10,
                        textAlign:'center'

                    }}>{t('Number of persons')}</Text>
                    <Item style={styles.searchInput} rounded >

                        <Input placeholder='Number' value={persons} onChangeText={(value)=>setPersons(value)} style={{textAlign:'center'}}  fontFamily='Poppins-ExtraLight' fontSize={15}  placeholderTextColor="#CECDCD"
                        />
                    </Item>

                    <Text style={{        fontFamily:'Poppins-Medium',
                        fontSize:12,
                        padding:10,
                        textAlign:'center'

                    }}>{t('Number of kids')}</Text>
                    <Item style={styles.searchInput} rounded >

                        <Input placeholder='Number' value={kids} onChangeText={(value)=>setKids(value)} style={{textAlign:'center'}}  fontFamily='Poppins-ExtraLight' fontSize={15}  placeholderTextColor="#CECDCD"
                        />
                    </Item>
                    {
                        (store.smoking == 1) &&
                        <View>
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
                        </View>
                    }



                    {
                        (store.outt == 1) &&
                            <View>
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
                            </View>
                    }



                    <View style={{flexDirection:'row',justifyContent:'center',padding:40}}>
                        <Button
                            title="Press me"
                            onPress={() => {reserveNormal()}}
                            style={ styles.modalBook }
                        >
                            <Text style={{color:'#fff' ,fontFamily:'Poppins-Medium',textAlign:'center',fontSize:12,textAlign:'center'}}>{t('Book Now')} </Text>

                        </Button>
                        <Button
                            title="Press me"
                            onPress={() => {closeModal()}}
                            style={ styles.modalCancel }
                        >
                            <Text style={{color:'#000' ,fontFamily:'Poppins-Medium',textAlign:'center',fontSize:12,textAlign:'center'}}>{t('Cancel')} </Text>

                        </Button>

                    </View>
                </View>
                </ScrollView>
            </Modal>
            <Modal animationIn="fadeIn" animationOut="fadeOut" isVisible={specialModal} style={{marginTop:70}}>
                <View style={{height:290,backgroundColor:'#fff',padding:10,borderRadius:20}}>
                    <Text style={{fontFamily:'Poppins-Medium',color:'#000',fontSize:20,paddingHorizontal:20,paddingTop:20}}>{t('Are you sure you want to book now!')}</Text>
                    <Text style={{fontFamily:'Poppins-Medium',color:'#CECDCD',fontSize:15,padding:20}}>{t('You can cancel your reservation 30 minutes after reserve.')}</Text>
                    <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                        <Button
                            title="Press me"
                            onPress={() => {reserveSpecial()}}
                            style={ styles.modalBook }
                        >
                            <Text style={{color:'#fff' ,fontFamily:'Poppins-Medium',textAlign:'center',fontSize:12,textAlign:'center'}}>{t('Book Now')} </Text>

                        </Button>
                        <Button
                            title="Press me"
                            onPress={() => {closeModal()}}
                            style={ styles.modalCancel }
                        >
                            <Text style={{color:'#000' ,fontFamily:'Poppins-Medium',textAlign:'center',fontSize:12,textAlign:'center'}}>{t('Cancel')} </Text>

                        </Button>

                    </View>
                </View>
            </Modal>
    <ScrollView
        renderToHardwareTextureAndroid
        horizontal={true}
        contentContainerStyle={{ width: '300%' }}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={200}
        style={{position: 'absolute'}}
        decelerationRate="fast"
        pagingEnabled

    >

        {
            store.store_images.map((image)=>
                <Image renderToHardwareTextureAndroid  source={{
                    uri: 'http://127.0.0.1:8000/images/'+image.image}}
                        style={{
                            width:'33.33333%',
                            height:250,
                            resizeMode:'stretch'
                        }}/>
            )
        }

        <Button
            onPress={ ()=> navigation.goBack() }
            style= {{position:'absolute',width:50,height:50,backgroundColor:'#fff',top:30,left:10,justifyContent:'center',borderRadius:130}}
        >
            <Ionicons name="ios-arrow-back" size={24} color="black" />

        </Button>

    </ScrollView>

            <View  renderToHardwareTextureAndroid style={styles.container}>
                <Text style={{fontFamily:'Poppins-Medium',color:'#CECDCD',fontSize:12,padding:5,alignSelf:'flex-start'}}>{store.country}</Text>

                <Text style={{fontFamily:'Poppins-Medium',color:'#000',fontSize:28,padding:5,alignSelf:'flex-start'}}>{store.name}</Text>
                <Text style={{fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',color:'#CECDCD',fontSize:12,padding:5,alignSelf:'flex-start'}}>{store.available} {t('person available')}</Text>
                <View style={{flexDirection:'row',alignItems:'flex-start',alignSelf:'flex-start',padding:10}}>
                   <Text
                       onPress={()=>
                       {
                           setSelected('view')
                       }
                       }
                       style={{fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',color:(selected != 'view') ? '#CECDCD' : '#000',fontSize:12,paddingHorizontal:20,paddingTop:10,paddingBottom:15, borderBottomColor :'#E50000',borderBottomWidth: (selected == 'view') ? 1 : 0}}>
                       {t('Overview')}
                   </Text>
                    <Text
                        onPress={()=>
                        {
                            setSelected('reviews')
                        }
                        }
                        style={{fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',color:(selected != 'reviews') ? '#CECDCD' : '#000',fontSize:12,paddingHorizontal:20,paddingTop:10,borderBottomColor :'#E50000',paddingBottom:15,borderBottomWidth: (selected == 'reviews') ? 1 : 0}}>
                        {t('Reviews')}
                    </Text>
                </View>

                        {
                            (selected == 'view' ) ?
                            <View style={{alignItems:'center'}}>
                                    <Text style={{fontFamily:'Poppins-Medium',color:'#CECDCD',fontSize:15,padding:20}}>

                                        {(i18n.language == 'ar') ? store.description_ar : store.description_en}

                                </Text>
                                <Button
                                    onPress={ ()=> Linking.openURL('https://www.google.com/maps?q='+store.lat+','+store.lng) }
                            style= {styles.selectedButton}
                            >
                            <Text style={{color:'#fff' ,fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',textAlign:'center',fontSize:15}}>{t('Website')}</Text>


                            </Button>
                                <View style={styles.stars}>

                                    {renderStars()}
                                </View>
                                {
                                    (store.special_events.length == 0)
                                        ?
                                        null
                                        :
                                        (<Text style={{
                                                fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',                                                color: '#000',
                                                fontSize: 20,
                                                padding: 5
                                            }}>{t('Special Events')}</Text>
                                        )
                                }


                                <View style={{justifyContent:'center',alignItems:'center'}}>

                                    <FlatList
                                        style={styles.components}
                                        contentContainerStyle={{}}
                                        data={store.special_events}

                                        ListFooterComponent={()=>

                                            <Button
                                                title="Press me"
                                                onPress={() => {reserveNormalButton()}}
                                                style={ styles.selectedButton2 }
                                            >
                                                <Text style={{color:'#fff' ,fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',fontSize:12,textAlign:'center',alignSelf:'center'}}>{t('Book Now')} </Text>


                                            </Button>
                                        }
                                        renderItem={({ item }) => (



                                            <SpecialEventBox
                                                image={'http://127.0.0.1:8000/images/'+store.image}
                                                name={item.name}
                                                time={item.time}
                                                available={item.available}
                                                onPress={()=> {
                                                    reserveSpecialButton(item.id)
                                                }
                                                }
                                            />
                                        )}
                                        keyExtractor={item => item.id}
                                    />

                                </View>



                            </View>
                            :
                            (
                            <FlatList
                            style={styles.components}
                            data={store.store_reviews}
                            renderItem={({ item }) => (



                            <ReviewBox
                                image={'https://docs.nativebase.io/docs/assets/web-cover1.jpg'}
                                username={item.reviewer.name}
                                rate={item.rate}
                                review={item.review}
                            />
                        )}
                            keyExtractor={item => item.id}
                            />)

                        }




            </View>



    </ScrollView>
)

}
const styles = StyleSheet.create({

    container: {
        backgroundColor:'#FFFFFF',
        borderRadius:40,
        marginTop:200,
        textAlign:'center',
        alignItems:'center',
        padding:20,
        paddingTop:40,
        height:'100%'

    },
    searchInput:{
        width:'100%',
        borderRadius:10,
        backgroundColor:'#F5F5F5',
        alignItems:'center',
        paddingHorizontal:30,
        color:'#CECDCD',
        borderColor:'#F5F5F5',
        height:45,
        fontFamily:'Poppins-Medium',
        fontSize:4
    },
    buttons:{
        flexDirection:'row',
        marginVertical:20,
    },
    selectedButton: {
        backgroundColor: '#E50000',
        flexDirection:'row',
        alignItems:'center',
        borderRadius:50,
width:130,
        alignSelf:'center',
        height:40,
        margin:15,
        justifyContent:'center',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: '#E50000',
        shadowOffset: { height: 0, width: 0 },

    },
    selectedButton2: {
        backgroundColor: '#E50000',
        flexDirection:'row',
alignSelf:'center',
        justifyContent:'center',
        borderRadius:10,
        width:'70%',
        justifyContent:'center',
        height:45,
        margin:15,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: '#E50000',
        shadowOffset: { height: 0, width: 0 },

    },
    selectedButton3: {
        backgroundColor: '#EFEFEF',
        flexDirection:'row',
        alignSelf:'flex-end',
        borderRadius:30,
        justifyContent:'center',
        alignItems:'center',
        width:'20%',
        flex:.2,
        height:44,
        margin:15,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: '#EFEFEF',
        shadowOffset: { height: 0, width: 0 },

    },
    button:{
        backgroundColor: '#FFFFFF',
        color: '#ffffff',
        flex: .4,
        marginHorizontal:5,
        borderColor:'#fff',
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:50,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: '#000',
        shadowOffset: { height: 0, width: 0 },


    },
    modalBook:{
        backgroundColor: '#E50000',
        flexDirection:'row',
        alignSelf:'flex-end',
        borderRadius:10,
        height:45,

    },
    modalCancel:{
        backgroundColor: '#EFEFEF',
        flexDirection:'row',
        alignSelf:'flex-end',
        borderRadius:10,
        height:45,
        marginHorizontal:15,


    },
    components:{
        width:'95%'
    },
    stars:{
        flexDirection:'row',
        margin:15,
        alignSelf:'center'


    },

});