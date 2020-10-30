import React,{useState,useEffect} from 'react';
import {View,Image,StyleSheet,Alert,ScrollView,FlatList} from 'react-native';
import { useTranslation } from 'react-i18next';
import {Container, Header, Content, Item, Input, Icon, Button, Text, Toast,Spinner} from 'native-base';
import ReservationBox from '../../components/ReservationBox'
import axios from "axios/index";
import AsyncStorage from "@react-native-community/async-storage";
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native'
import  StatusBarPlaceHolder from '../../components/StatusBarPlaceHolder'
export default function CalenderScreen({navigation}) {
    const { t } = useTranslation();
    const [selected , setSelected] = useState('comming');
    const [comming, setComming ] = useState([]);
    const [past, setPast ] = useState([]);
    const [update,setUpdate] = useState(false);
    const isFocused = useIsFocused()
    const [token,setToken] = useState();
    const [featched,setFeatched] = useState(false);
    const [currentData,setCurrentData] = useState(comming);
    useEffect(()=>{
        AsyncStorage.getItem('token').then((token) => {
            setToken(token);
        })
        AsyncStorage.getItem('token').then((token)=>{
            if(token) {
                axios.post('http://192.168.1.2:8000/api/reservations', null, {

                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(function (response) {
                        setFeatched(true)
                        setComming(response.data.comming);
                        setPast(response.data.past);

                        setSelected('comming');
                        setCurrentData(response.data.comming);


                    })
                    .catch(function (error) {
                        // alert(JSON.stringify(error))

                        // alert(error.response.data.errors);
                    });
            }
        });
    },[update,isFocused]);
    var cancel = (id)=>{
        setFeatched(false)
        AsyncStorage.getItem('token').then((token)=>{
            axios.post('http://192.168.1.2:8000/api/cancel_reservation',null, {
                params:{
                    id
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(function (response) {
                    Toast.show({
                        text: 'Successfully canceled reservation',
                        buttonText: 'Okay',
                        type: "success"

                    });

                    setUpdate(!update);
                    setFeatched(true)


                })
                .catch(function (error) {
                    if(error.response.data.err == 1){
                        Toast.show({
                            text: "You don't have enough balance",
                            buttonText: 'Okay',
                            type: "danger"

                        });
                    }
                    // alert(JSON.stringify(error.response.data));
                });
        });
    }

    if(token != null){
        return (

            <View style={styles.container}>
                <StatusBarPlaceHolder/>

                <View style={styles.buttons}>
                    <Button
                        title="Press me"
                        onPress={() => {setSelected('past'); setCurrentData(past);}
                        }
                        style={selected == 'past' ?  styles.selectedButton : styles.button}
                    >
                        <Text style={{color:selected== 'past' ? '#fff' : '#000',fontFamily:'Poppins-Medium',textAlign:'center',fontSize:15}}>{t('previous')}</Text>
                    </Button>

                    <Button
                        onPress={() => {setSelected('comming');setCurrentData(comming)}}
                        style={selected == 'comming' ?  styles.selectedButton : styles.button}
                    >
                        <Text style={{color: selected== 'comming' ? '#fff' : '#000',fontFamily:'Poppins-Medium',textAlign:'center',fontSize:15}}>{t('comming')}</Text>
                    </Button>
                </View>
                {
                    (featched) ?

                        <FlatList
                            style={styles.components}
                            data={currentData}
                            contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
                            ListEmptyComponent={() =>
                                <Text style={{
                                    color: '#000',
                                    fontFamily: 'Poppins-Medium',
                                    textAlign: 'center',
                                    fontSize: 15
                                }}>No New Reservations</Text>
                            }
                            renderItem={({item}) => (


                                <ReservationBox
                                    date={(item.type == 1) ? moment(item.created_at).format('h:mm a') : moment(item.special_event.time, 'hh:mm:ss').format('h:mm a')}
                                    address={item.store.address}
                                    type={item.type}
                                    clientReview={item.clientReview}
                                    cancel={() => {
                                        cancel(item.id)
                                    }}
                                    id={item.id}
                                    store_id={item.store.id}
                                    image={'http://192.168.1.2:8000/images/' + item.store.image}
                                    status={item.status}
                                    lat={item.store.lat}
                                    lng={item.store.lng}
                                    navigation={navigation}
                                    reservation={item}
                                />
                            )}
                            keyExtractor={item => item.id}
                        />
                        :
                        <Spinner color='#E50000' />
                }
                <View style={styles.components}>


                </View>
            </View>

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
                        <Text style={{color:  '#fff',fontFamily:'Poppins-Medium',textAlign:'center',fontSize:15}}>{t('Sign In')}</Text>
                    </Button>
                </View>
            </View>
        )
    }

}
const styles = StyleSheet.create({

    container: {
        backgroundColor:'#FFFFFF',
        textAlign:'center',
        alignItems:'center',
        marginBottom:70,
        height:'100%',

    },
    searchInput:{
        width:'90%',
        borderRadius:10,
        backgroundColor:'#F5F5F5',
        marginTop:35,
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
        marginVertical:30,
    },
    selectedButton: {
        backgroundColor: '#E50000',
        flex: .4,
        alignItems:'center',
        borderRadius:50,
        marginHorizontal:5,

        justifyContent:'center',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: '#E50000',
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
    components:{
        width:'90%',
    }
});

