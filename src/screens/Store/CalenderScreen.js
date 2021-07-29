import React,{useState,useEffect} from 'react';
import {View,Image,StyleSheet,Alert,ScrollView,FlatList} from 'react-native';
import { useTranslation } from 'react-i18next';
import {Container, Header, Content, Item, Input, Icon, Button, Text, Toast} from 'native-base';
import ReservationBox from '../../components/Store/ReservationBox'
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

    const [currentData,setCurrentData] = useState(comming);
    useEffect(()=>{
        AsyncStorage.getItem('token').then((token)=>{
            axios.post('http://makaneapp.com/api/reservations',null, {

                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(function (response) {
                    setComming(response.data.comming);
                    setPast(response.data.past);

                    setSelected('comming');
                    setCurrentData(response.data.comming);


                })
                .catch(function (error) {
                    // alert(JSON.stringify(error))

                    // alert(error.response.data.errors);
                });
        });
    },[update,isFocused]);
    var arrived = (id)=>{
        AsyncStorage.getItem('token').then((token)=>{
            axios.post('http://makaneapp.com/api/arrived',null, {
                params:{
                    id
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(function (response) {
                    Toast.show({
                        text: 'Successfully marked as arrived',
                        buttonText: 'Okay',
                        type: "success"

                    });

                    setUpdate(!update);


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
    var notArrived = (id)=>{
        AsyncStorage.getItem('token').then((token)=>{
            axios.post('http://makaneapp.com/api/not-arrived',null, {
                params:{
                    id
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(function (response) {
                    Toast.show({
                        text: 'Successfully marked as not arrived ',
                        buttonText: 'Okay',
                        type: "success"

                    });

                    setUpdate(!update);


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
    return (
        <View style={{backgroundColor:'#fff',height:'100%',alignItems:'center'}}>

<StatusBarPlaceHolder/>

        <View  style={styles.container}>

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
                    <FlatList
                        style={styles.components}
                        data={currentData}
                        contentContainerStyle={{ paddingBottom: 150}}

                        ListEmptyComponent={() =>
                            <Text style={{
                                color: '#000',
                                fontFamily: 'Poppins-Medium',
                                textAlign: 'center',
                                fontSize: 15
                            }}>No New Reservations</Text>
                        }
                        renderItem={({ item }) => (


                            <ReservationBox

                                date={(item.type == 1 || item.type == 5)  ? moment(item.created_at).format('h:mm a') : moment(item.special_event.time,'hh:mm:ss').format('h:mm a')}
                                address={item.store.address}
                                type={item.type}
                                clientReview={item.clientReview}
                                arrived={()=>{arrived(item.id)}}
                                notArrived={()=>{notArrived(item.id)}}
                                storeReview={item.storeReview}
                                id={item.id}
                                store_id={item.store.id}
                                user_id={item.user.id}
                                user={item.user}
                                image="https://docs.nativebase.io/docs/assets/web-cover1.jpg"
                                status={item.status}
                                lat={item.store.lat}
                                lng={item.store.lng}
                                navigation={navigation}
                                reservation={item}
                            />
                        )}
                        keyExtractor={item => item.id}
                    />

                </View>
        </View>


    );
}
const styles = StyleSheet.create({

    container: {
        backgroundColor:'#FFFFFF',
        borderRadius:40,
        textAlign:'center',
        alignItems:'center',
        width:'100%'
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
        marginVertical:20,
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
        width:'100%',
    }
});
