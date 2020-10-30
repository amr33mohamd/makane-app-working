import React,{useState} from 'react';
import {View,Image,StyleSheet,Alert} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Container, Header, Content, Thumbnail, Text,Button } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {useTranslation} from "react-i18next";
import Modal from 'react-native-modal';
import QRCode from 'react-native-qrcode-svg';
import i18n from "i18next";

 const CouponBox: () => React$Node = (props) => {
     const { t } = useTranslation();
     const [normalModal,setNormalModal] = useState(false);
     const [buyModal,seBuyModal] = useState(false);

     return(

    <View style={styles2.container} >
        <Modal animationIn="fadeIn"  isVisible={normalModal}>
            <View style={{height:285,backgroundColor:'#fff',padding:10,borderRadius:20,justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',color:'#000',fontSize:20,paddingHorizontal:20,padding:20}}>{t('Show coupon for store')}</Text>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <QRCode
                        value={""+props.id}
                        style={{        alignSelf:'center',
                        }}
                    />
                    <Button
                        title="Press me"
                        onPress={() => {setNormalModal(false)}}
                        style={ styles2.modalCancel }
                    >
                        <Text style={{color:'#000' ,fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',textAlign:'center',fontSize:12,textAlign:'center'}}>{t('Cancel')} </Text>

                    </Button>
                </View>
            </View>
        </Modal>
        <Modal animationIn="fadeIn"  isVisible={buyModal}>
            <View style={{height:180,backgroundColor:'#fff',padding:10,borderRadius:20,justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',color:'#000',fontSize:20,paddingHorizontal:20,padding:20}}>{t('Sure you want to buy this coupon')}</Text>
                <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                    <Button
                        title="Press me"
                        onPress={() => {seBuyModal(false);props.buy_coupon()}}
                        style={ styles2.modalBook }
                    >
                        <Text style={{color:'#FFF' ,fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',textAlign:'center',fontSize:12,textAlign:'center'}}>{t('Buy')} </Text>

                    </Button>
                    <Button
                        title="Press me"
                        onPress={() => {seBuyModal(false)}}
                        style={ styles2.modalCancel }
                    >
                        <Text style={{color:'#000' ,fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',textAlign:'center',fontSize:12,textAlign:'center'}}>{t('Cancel')} </Text>

                    </Button>
                </View>
            </View>
        </Modal>
        <View style={styles2.left}>
            <Image  source={{
                uri: 'http://192.168.1.2:8000/images/'+props.image}}
            style={{
                width:'100%',
                height:70,
                resizeMode:'contain'
            }}/>

        </View>
        <View style={styles2.right}>
            <Text style={{fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',color:'#000',fontSize:13,padding:5}}>{t('Percent')}</Text>
            <Text style={{fontFamily:'Poppins-Medium',color:'#CECDCD',fontSize:11,padding:5,alignSelf:'flex-start'}}>{props.percent} %</Text>
            {
                (props.price == 0 || props.type == 'owned') ?

                    <Button
                        title="Press me"
                        onPress={() => setNormalModal(true)}
                        style={ styles2.selectedButton }
                    >
                        <Text style={{color:'#fff' ,fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',textAlign:'center',fontSize:11}}>{t('Show')}</Text>

                    </Button>
                    :
                    <Button
                        title="Press me"
                        onPress={() => {seBuyModal(true)}}
                        style={ styles2.selectedButton }
                    >
                        <Text style={{color:'#fff' ,fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',textAlign:'center',fontSize:11}}>{t('Buy') } {props.price} {t('Point')} </Text>

                    </Button>
            }
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
    width:'98%'

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