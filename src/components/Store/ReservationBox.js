import React,{useState} from 'react';
import {View,Image,StyleSheet,Alert} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Container, Header, Content, Thumbnail, Text, Button, Item, Input, Toast} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import moment from 'moment';
import Modal from 'react-native-modal';
import StarRating from 'react-native-star-rating';

import {useTranslation} from "react-i18next";
import axios from "axios/index";
import AsyncStorage from "@react-native-community/async-storage";
import i18n from "i18next/index";
const ReservationBox: () => React$Node = (props) => {
    const { t } = useTranslation();
    const [notArrivedModal,setNotArrivedModal] = useState(false);
    const [ArrivedModal,setArrivedModal] = useState(false);

    const [reviewModal,setReviewModal] = useState(false);
    const [stars,setStars] = useState(5);
    const  [review,setReview] = useState();
    var rate = ()=>{
        AsyncStorage.getItem('token').then((token)=>{
            axios.post('http://192.168.1.2:8000/api/user-review',null, {
                params:{
                    user_id:props.user_id,
                    reservation_id:props.id,
                    review,
                    stars
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(function (response) {
                    Toast.show({
                        text: 'Thanks for your review',
                        buttonText: 'Okay',
                        type: "success"

                    });
                    props.navigation.navigate('Store',{screen:'Home',  initial: false})


                })
                .catch(function (error) {
                    alert(JSON.stringify(error))

                    // alert(error.response.data.errors);
                });
        });
        // alert(props.id)
    }
    // noinspection JSAnnotator
    return(

        <View style={styles2.container} >
            <Modal animationIn="fadeIn"  isVisible={notArrivedModal}>
                <View style={{height:150,backgroundColor:'#fff',padding:10,borderRadius:20}}>
                    <Text style={{fontFamily:(i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',color:'#000',fontSize:20,paddingHorizontal:20,paddingTop:20}}>{t('Are you sure you want tell that he didn\'t arrive?')}</Text>
                    <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                        <Button
                            title="Press me"
                            onPress={() => {setNotArrivedModal(false)}}
                            style={ styles2.modalCancel }
                        >
                            <Text style={{color:'#000' ,fontFamily:'Poppins-Medium',textAlign:'center',fontSize:12,textAlign:'center'}}>{t('Skip')} </Text>

                        </Button>
                        <Button
                            title="Press me"
                            onPress={() => {props.notArrived();setNotArrivedModal(false)}}
                            style={ styles2.modalBook }
                        >
                            <Text style={{color:'#fff' ,fontFamily:'Poppins-Medium',textAlign:'center',fontSize:12,textAlign:'center'}}>{t('Confirm')} </Text>

                        </Button>


                    </View>
                </View>
            </Modal>
            <Modal animationIn="fadeIn"  isVisible={ArrivedModal}>
                <View style={{height:150,backgroundColor:'#fff',padding:10,borderRadius:20}}>
                    <Text style={{fontFamily:'Poppins-Medium',color:'#000',fontSize:20,paddingHorizontal:20,paddingTop:20}}>{t('Are you sure you want tell that he  arrived?')}</Text>
                    <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                        <Button
                            title="Press me"
                            onPress={() => {setArrivedModal(false)}}
                            style={ styles2.modalCancel }
                        >
                            <Text style={{color:'#000' ,fontFamily:'Poppins-Medium',textAlign:'center',fontSize:12,textAlign:'center'}}>{t('Skip')} </Text>

                        </Button>
                        <Button
                            title="Press me"
                            onPress={() => {props.arrived();setArrivedModal(false)}}
                            style={ styles2.modalBook }
                        >
                            <Text style={{color:'#fff' ,fontFamily:'Poppins-Medium',textAlign:'center',fontSize:12,textAlign:'center'}}>{t('Confirm')} </Text>

                        </Button>


                    </View>
                </View>
            </Modal>
            <Modal animationIn="fadeIn"  isVisible={reviewModal}>
                <View style={{height:260,backgroundColor:'#fff',padding:10,borderRadius:20,alignItems:'center'}}>
                    <Text style={{fontFamily:'Poppins-Medium',color:'#000',fontSize:20,paddingHorizontal:20,paddingTop:20}}>{t('Rate Us!')}</Text>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        fullStarColor={'gold'}
                        containerStyle={{width:'50%',alignSelf:'center',justifyContent:'center',margin:15}}
                        halfStarEnabled={false}
                        rating={stars}
                        selectedStar={(rating) => setStars(rating)}
                    />
                    <Item style={styles2.searchInput} rounded >

                        <Input placeholder='Review' style={{textAlign:'center'}}
                               value={review}
                               onChangeText={(value)=>{setReview(value)}}
                               fontFamily='Poppins-ExtraLight' fontSize={15}  placeholderTextColor="#CECDCD"
                        />
                    </Item>
                    <View style={{flexDirection:'row',justifyContent:'center'}}>

                        <Button
                            title="Press me"
                            onPress={() => {setReviewModal(false)}}
                            style={ styles2.modalCancel }
                        >
                            <Text style={{color:'#000' ,fontFamily:'Poppins-Medium',textAlign:'center',fontSize:12,textAlign:'center'}}>{t('Cancel')} </Text>

                        </Button>
                        <Button
                            title="Press me"
                            onPress={() => {rate();setReviewModal(false)}}
                            style={ styles2.modalBook }
                        >
                            <Text style={{color:'#fff' ,fontFamily:'Poppins-Medium',textAlign:'center',fontSize:12,textAlign:'center'}}>{t('Confirm')} </Text>

                        </Button>


                    </View>
                </View>
            </Modal>
            <View style={styles2.left}>
                <Image  source={{
                    uri: props.image}}
                        style={{
                            width:'100%',
                            height:170
                        }}/>

            </View>
            <View style={styles2.right}>
                <Text style={{fontFamily:(i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',color:'#000',fontSize:13,padding:5,alignSelf:'flex-start'}}>{t('Time')}</Text>
                <Text style={{fontFamily:'Poppins-Medium',color:'#CECDCD',fontSize:11,padding:5,alignSelf:'flex-start'}}>{props.date}</Text>
                <Text style={{fontFamily:(i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',color:'#000',fontSize:13,padding:5,alignSelf:'flex-start'}}>{t('User Name')}</Text>
                <Text style={{fontFamily:'Poppins-Medium',color:'#CECDCD',fontSize:11,padding:5,alignSelf:'flex-start'}}>{props.user.name}</Text>
                <Text style={{fontFamily:(i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',color:'#000',fontSize:13,padding:5,alignSelf:'flex-start'}}>{t('User Phone')}</Text>
                <Text style={{fontFamily:'Poppins-Medium',color:'#CECDCD',fontSize:11,padding:5,alignSelf:'flex-start'}}>{props.user.phone}</Text>
                <Text style={{fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',color:'#000',fontSize:13,padding:5,alignSelf:'flex-start'}}>{t('Persons')}</Text>
                <Text style={{fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',color:'#CECDCD',fontSize:11,padding:5,alignSelf:'flex-start'}}>{props.reservation.persons}</Text>
                <Text style={{fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',color:'#000',fontSize:13,padding:5,alignSelf:'flex-start'}}>{t('kids')}</Text>
                <Text style={{fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',color:'#CECDCD',fontSize:11,padding:5,alignSelf:'flex-start'}}>{props.reservation.kids}</Text>
                <Text style={{fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',color:'#000',fontSize:13,padding:5,alignSelf:'flex-start'}}>{t('Outside')}</Text>
                <Text style={{fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',color:'#CECDCD',fontSize:11,padding:5,alignSelf:'flex-start'}}>{(props.reservation.outt == 1) ? 'yes' : 'no'}</Text>

                <Text style={{fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',color:'#000',fontSize:13,padding:5,alignSelf:'flex-start'}}>{t('Smoking')}</Text>
                <Text style={{fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',color:'#CECDCD',fontSize:11,padding:5,alignSelf:'flex-start'}}>{(props.reservation.smoking == 1) ? 'yes' : 'no'}</Text>

                <Text style={{fontFamily:'Poppins-Medium',color:'#000',fontSize:13,padding:5,alignSelf:'flex-start'}}> {t('Status')}</Text>
                <Text style={{fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',color:'#CECDCD',fontSize:11,padding:5,alignSelf:'flex-start'}}>{(props.status == 0) ? (i18n.language == 'ar') ? 'قادم' : 'comming' : (props.status == 1)  ? (i18n.language == 'ar') ? 'تم' :'done' : (props.status == 2) ? (i18n.language == 'ar') ? 'تجاهل' : 'ignored' : (i18n.language == 'ar') ? 'الغاء' : 'canceled'}</Text>

                <View >
                {
                    (props.status == 0) ?
                        <Button
                            title="Press me"
                            onPress={() => setArrivedModal(true)}
                            style={ styles2.selectedButton }
                        >
                            <Text style={{color:'#fff' ,fontFamily:'Poppins-Medium',textAlign:'center',fontSize:11}}>{t('Arrived')} </Text>
                        </Button>
                        :null
                }
                {
                    (props.status == 0)?



                        (props.type == 1) ?
                            (Math.abs(moment(props.date,'h:mm a').diff(moment(),'minutes')) < 30 )

                                ? null
                                : <Button
                                    title="Press me"
                                    onPress={() => setNotArrivedModal(true)}
                                    style={ styles2.selectedButton }
                                >
                                    <Text style={{color:'#fff' ,fontFamily:'Poppins-Medium',textAlign:'center',fontSize:11}}>{t('Not Arrived')}</Text>

                                </Button>
                            :
                            (Math.abs(moment(props.date,'h:mm a').diff(moment(),'minutes')) > 30 )

                                ? null
                                : <Button
                                    title="Press me"
                                    onPress={() => setNotArrivedModal(true)}
                                    style={ styles2.selectedButton }
                                >
                                    <Text style={{color:'#fff' ,fontFamily:'Poppins-Medium',textAlign:'center',fontSize:11}}>{t('Not Arrived')}</Text>

                                </Button>

                        :(props.status == 1 && props.storeReview == false) ?
                        <Button
                            title="Press me"
                            onPress={() => setReviewModal(true)}
                            style={ styles2.selectedButton }
                        >
                            <Text style={{color:'#fff' ,fontFamily:'Poppins-Medium',textAlign:'center',fontSize:11}}>{t('Rate')}</Text>

                        </Button>
                        :null
                }
                </View>
            </View>

        </View>
    )

}
const styles2 = StyleSheet.create({
    container:{
        flexDirection:'row',
        backgroundColor:'#fff',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: '#000',
        shadowOffset: { height: 0, width: 0 },
        marginVertical:10,
        borderRadius:10,
        padding:10,
        elevation: 1,
        width:'90%',
        alignSelf:'center'

    },
    left:{
        flex:.4,
        padding:10
    },
    right:{
        flex:.6,
        padding:5,
    },
    buttom:{
        flexDirection:'row',
        flex:1,
        justifyContent: "center",
        alignItems:'center'

    },
    stars:{
        flexDirection:'row',
        flex:1,


    },
    selectedButton: {
        backgroundColor: '#E50000',
        width:'60%',
        height:35,
        alignSelf:'flex-end',
        alignItems:'center',
        borderRadius:30,
        marginHorizontal:5,

        justifyContent:'center',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: '#E50000',
        shadowOffset: { height: 0, width: 0 },
        marginVertical:5

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
    modalCancel:{
        backgroundColor: '#EFEFEF',
        flexDirection:'row',
        alignSelf:'center',
        borderRadius:10,
        height:45,
        marginHorizontal:15,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        margin:20,
        justifyContent:'center',
        width:85,
        shadowColor: '#EFEFEF',
        shadowOffset: { height: 0, width: 0 },

    },

    modalBook:{
        backgroundColor: '#E50000',
        flexDirection:'row',
        alignSelf:'center',
        borderRadius:10,
        height:45,
        width:85,
        justifyContent:'center',
        marginHorizontal:15,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        margin:20,
        shadowColor: '#E50000',
        shadowOffset: { height: 0, width: 0 },

    },



})
export default ReservationBox;