import React,{useState,useEffect} from 'react';
import {View,Image,StyleSheet,Alert,ScrollView,FlatList,TouchableOpacity} from 'react-native';
import { useTranslation } from 'react-i18next';
import {Container, Header, Content, Item, Input, Icon, Button, Text, Toast} from 'native-base';
import CouponBox from '../../components/Store/CouponBox'
import axios from "axios/index";
import AsyncStorage from "@react-native-community/async-storage";
import Modal from 'react-native-modal';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import  StatusBarPlaceHolder from '../../components/StatusBarPlaceHolder'

export default function CouponScreen({navigation}) {
    const { t } = useTranslation();
    const [selected , setSelected] = useState('coupons');
    const [coupons, setCoupons ] = useState([]);
    const [owned, setOwned ] = useState([]);
    const [currentData,setCurrentData] = useState(coupons);
    const [update,setUpdate] = useState(false);
    const [redirect,setRedirect] = useState(false);
    const [scanModal,setScanModal] = useState(false);
    useEffect(()=>{
        AsyncStorage.getItem('token').then((token)=>{

            axios.post('http://127.0.0.1:8000/api/store-coupons',null, {

                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(function (response) {

                        setCurrentData(response.data.coupons);


                })
                .catch(function (error) {
                    // alert(JSON.stringify(error))

                    // alert(error.response.data.errors);
                });
        });
    },[update]);

    var buy_coupon = (id)=>{
        AsyncStorage.getItem('token').then((token)=>{
            axios.post('http://127.0.0.1:8000/api/buy_coupon',null, {
                params:{
                    id
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(function (response) {
                    Toast.show({
                        text: 'Successfully bought the coupon',
                        buttonText: 'Okay',
                        type: "success"

                    });
                    setRedirect(true);

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
                });
        });
    }
    var check_coupon = (code)=>{

        AsyncStorage.getItem('token').then((token)=>{
            axios.post('http://127.0.0.1:8000/api/use-coupon',null, {
                params:{
                    id:code
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(function (response) {
                    setScanModal(false)
                    Toast.show({
                        text: 'This code is valid  ',
                        buttonText: 'Okay',
                        type: "success",
                        duration:3600000000

                    });

                    setUpdate(!update);


                })
                .catch(function (error) {
                    setScanModal(false)

                    if(error.response.data.err == 1){
                        Toast.show({
                            text: "This code isn't valid please check that user is using out app",
                            buttonText: 'Okay',
                            type: "danger",
                            duration:3600000000


                        });
                    }
                    else if(error.response.data.err == 2){
                        Toast.show({
                            text: "This code is used before",
                            buttonText: 'Okay',
                            type: "danger",
                            duration:3600000000


                        });
                    }
                });
        });
    }

    return (
        <View style={{backgroundColor:'#fff',height:'100%',alignItems:'center'}}>
                <Modal animationIn="fadeIn"  isVisible={scanModal}>
                    <View style={{height:'100%',backgroundColor:'#fff',padding:10,borderRadius:20,alignItems:'center'}}>
                        <Text style={{fontFamily:'Poppins-Medium',color:'#000',fontSize:20,paddingHorizontal:20,paddingTop:20}}>Scan Qr</Text>
                        <QRCodeScanner
                            onRead={(e)=>{check_coupon(e.data)}}
                            flashMode={RNCamera.Constants.FlashMode.torch}
                            topContent={
                                <Text style={styles.centerText}>

                                </Text>
                            }
                            bottomContent={
                                <TouchableOpacity onPress={()=>{
                                setScanModal(false)
                                }
                                } style={styles.buttonTouchable}>
                                    <Text style={styles.buttonText}>OK. Got it!</Text>
                                </TouchableOpacity>
                            }
                        />

                        <View style={{flexDirection:'row',justifyContent:'center'}}>




                        </View>
                    </View>
                </Modal>
            <StatusBarPlaceHolder/>

                <View  style={styles.container}>
                    <View style={styles.buttons}>
                        <Button
                            title="Press me"
                            onPress={() => {setScanModal(true);}}
                            style={styles.selectedButton }
                        >
                            <Text style={{color: '#fff' ,fontFamily:'Poppins-Medium',textAlign:'center',fontSize:15}}>{t('Scan Coupon')}</Text>
                        </Button>


                    </View>

                    <FlatList
                        style={styles.components}
                        data={currentData}
                        contentContainerStyle={{alignItems: 'center', justifyContent: 'center',width:"100%"}}

                        renderItem={({ item }) => (


                            <CouponBox
                                percent={(item.percent) ? item.percent :item.coupon.percent }
                                price={(item.price) ? item.price :item.coupon.price }
                                type={selected}
                                code={(item.code) ? item.code :item.coupon.code }
                                id={item.id}
                                user={item.user}
                                buy_coupon={()=>{buy_coupon(item.id)}}
                                image="https://docs.nativebase.io/docs/assets/web-cover1.jpg"
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
        width:'100%'
    },
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    }
});

