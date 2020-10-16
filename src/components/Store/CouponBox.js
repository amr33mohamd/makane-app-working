import React,{useState} from 'react';
import {View,Image,StyleSheet,Alert} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Container, Header, Content, Thumbnail, Text,Button } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {useTranslation} from "react-i18next";
import Modal from 'react-native-modal';
import QRCode from 'react-native-qrcode-svg';

const CouponBox: () => React$Node = (props) => {
    const { t } = useTranslation();
    const [normalModal,setNormalModal] = useState(false);
    const [buyModal,seBuyModal] = useState(false);

    return(

        <View style={styles2.container} >

            <View style={styles2.left}>
                <Image  source={{
                    uri: props.image}}
                        style={{
                            width:'100%',
                            height:70
                        }}/>

            </View>
            <View style={styles2.right}>
                <Text style={{fontFamily:'Poppins-Medium',color:'#000',fontSize:13,padding:5,alignSelf:'flex-start'}}>{t('Percent')}</Text>
                <Text style={{fontFamily:'Poppins-Medium',color:'#CECDCD',fontSize:11,padding:5,alignSelf:'flex-start'}}>{props.percent} %</Text>
                <Text style={{fontFamily:'Poppins-Medium',color:'#000',fontSize:13,padding:5,alignSelf:'flex-start'}}>{t('User Name')}</Text>
                <Text style={{fontFamily:'Poppins-Medium',color:'#CECDCD',fontSize:11,padding:5,alignSelf:'flex-start'}}>{props.user.name}</Text>
                <Text style={{fontFamily:'Poppins-Medium',color:'#000',fontSize:13,padding:5,alignSelf:'flex-start'}}> {t('User Phone')}</Text>
                <Text style={{fontFamily:'Poppins-Medium',color:'#CECDCD',fontSize:11,padding:5,alignSelf:'flex-start'}}>{props.user.phone}</Text>

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
        width:'90%'
    },
    left:{
        flex:.4,
        padding:10
    },
    right:{
        flex:.7,
        justifyContent:'flex-end'
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
        justifyContent:'flex-end',
        alignItems:'center',
        borderRadius:30,
        marginHorizontal:5,

        justifyContent:'center',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: '#E50000',
        shadowOffset: { height: 0, width: 0 },

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
        width:80,
        shadowColor: '#EFEFEF',
        shadowOffset: { height: 0, width: 0 },

    },

    modalBook:{
        backgroundColor: '#E50000',
        flexDirection:'row',
        alignSelf:'center',
        borderRadius:10,
        height:45,
        width:80,
        justifyContent:'center',
        marginHorizontal:15,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        margin:20,
        shadowColor: '#E50000',
        shadowOffset: { height: 0, width: 0 },

    },



})
export default CouponBox;