import React,{useState,useEffect} from 'react';
import {View,Image,StyleSheet,Alert,ScrollView,FlatList,TouchableOpacity} from 'react-native';
import { useTranslation } from 'react-i18next';
import {Container, Header, Content, Item, Input, Icon, Button, Text, Toast} from 'native-base';
import CouponBox from '../../components/CouponBox'
import axios from "axios/index";
import AsyncStorage from "@react-native-community/async-storage";
import {useIsFocused} from "@react-navigation/native";
import  StatusBarPlaceHolder from '../../components/StatusBarPlaceHolder'

export default function CouponScreen({navigation}) {
    const {t} = useTranslation();
    const [selected, setSelected] = useState('coupons');
    const [coupons, setCoupons] = useState([]);
    const [owned, setOwned] = useState([]);
    const [currentData, setCurrentData] = useState(coupons);
    const [update, setUpdate] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [token, setToken] = useState();
    const isFocused = useIsFocused()

    useEffect(() => {
        AsyncStorage.getItem('token').then((token) => {
            setToken(token);
        })
        AsyncStorage.getItem('token').then((token) => {

            if (token) {

                axios.post('http://127.0.0.1:8000/api/coupons', null, {

                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(function (response) {
                        setCoupons(response.data.coupons);
                        setOwned(response.data.owned_coupons);

                        if (redirect == true) {
                            setSelected('owned');
                            setCurrentData(response.data.owned_coupons);

                        }
                        else {
                            setSelected('coupons');
                            setCurrentData(response.data.coupons);

                        }
                    })
                    .catch(function (error) {
                        // alert(JSON.stringify(error))

                        // alert(error.response.data.errors);
                    });
            }
        });
    }, [update,isFocused]);

    var buy_coupon = (id) => {
        AsyncStorage.getItem('token').then((token) => {
            axios.post('http://127.0.0.1:8000/api/buy_coupon', null, {
                params: {
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
                    if (error.response.data.err == 1) {
                        Toast.show({
                            text: "You don't have enough balance",
                            buttonText: 'Okay',
                            type: "danger"

                        });
                    }
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
                    onPress={() => {
                        setSelected('coupons');
                        setCurrentData(coupons)
                    }}
                    style={selected == 'coupons' ? styles.selectedButton : styles.button}
                >
                    <Text style={{
                        color: selected == 'coupons' ? '#fff' : '#000',
                        fontFamily: 'Poppins-Medium',
                        textAlign: 'center',
                        fontSize: 15
                    }}>{t('Coupons')}</Text>
                </Button>

                <Button
                    onPress={() => {
                        setSelected('owned');
                        setCurrentData(owned)
                    }}
                    style={selected == 'owned' ? styles.selectedButton : styles.button}
                >
                    <Text style={{
                        color: selected == 'owned' ? '#fff' : '#000',
                        fontFamily: 'Poppins-Medium',
                        textAlign: 'center',
                        fontSize: 15
                    }}>{t('Owned')}</Text>
                </Button>
            </View>

            <FlatList
                style={styles.components}
                data={currentData}
                contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}

                renderItem={({item}) => (


                    <CouponBox
                        percent={(item.percent) ? item.percent : item.coupon.percent}
                        price={(item.price) ? item.price : item.coupon.price}
                        type={selected}
                        code={(item.code) ? item.code : item.coupon.code}
                        id={item.id}
                        buy_coupon={() => {
                            buy_coupon(item.id)
                        }}
                        image={(item.price) ? item.store.image : item.coupon.store.image}
                    />
                )}
                keyExtractor={item => item.id}
            />

        </View>


    );
}
else {
        return (
            <View style={{backgroundColor:'#fff',height:'100%',width:'100%',alignItems:'center'}}>
                <StatusBarPlaceHolder/>

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
        height:'100%',
        marginBottom:70,

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
        width:'90%'
    }
});

