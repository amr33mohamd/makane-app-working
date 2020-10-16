import React,{useState,useEffect} from 'react';
import {View,Image,StyleSheet,Alert,ScrollView,FlatList,TouchableOpacity} from 'react-native';
import { useTranslation } from 'react-i18next';
import {Container, Header, Content, Item, Input, Icon, Button, Text, Toast} from 'native-base';
import SpecialEventBox from '../../components/Store/SpecialEventBox'
import axios from "axios/index";
import AsyncStorage from "@react-native-community/async-storage";
import Modal from 'react-native-modal';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import ImagePicker from 'react-native-image-picker';

export default function EventsScreen({navigation}) {
    const { t } = useTranslation();
    const [selected , setSelected] = useState('coupons');
    const [coupons, setCoupons ] = useState([]);
    const [available, setAvailable ] = useState();
    const [currentData,setCurrentData] = useState(coupons);
    const [update,setUpdate] = useState(false);
    const [redirect,setRedirect] = useState(false);
    const [addImage,setAddImage] = useState();
    const [addModal,setAddModal] = useState(false);
    const [time, setTime] = useState(new Date());
    const [show, setShow] = useState(false);
    const [name,setName] = useState();
    const [deleteModal,setDeleteModal] =useState(false);
    const [deleteId,setDeleteId] = useState();
    const options = {
        title: 'Select Avatar',
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };
    useEffect(()=>{
        AsyncStorage.getItem('token').then((token)=>{

            axios.post('http://127.0.0.1:8000/api/user',null, {

                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(function (response) {

                    setCurrentData(response.data.user.special_events);


                })
                .catch(function (error) {
                    // alert(JSON.stringify(error))

                    // alert(error.response.data.errors);
                });
        });
    },[update]);


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setTime(currentDate);
    };

    const showTimepicker = () => {
        setShow(!show);
    };


    var add_event = ()=>{
        AsyncStorage.getItem('token').then((token)=>{
            axios.post('http://127.0.0.1:8000/api/add-event',null, {
                params:{
                    name,
                    available
                    ,time:moment(time).format('HH:MM:SS')
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(function (response) {
                    setAddModal(false);
                    setName('');
                    setAvailable('');
                    Toast.show({
                        text: 'Successfully Added Event',
                        buttonText: 'Okay',
                        type: "success"

                    });

                    setUpdate(!update);


                })
                .catch(function (error) {

                    // alert(JSON.stringify(error))
                });
        });
    }

    var delete_event = ()=>{
        AsyncStorage.getItem('token').then((token)=>{
            axios.post('http://127.0.0.1:8000/api/delete-event',null, {
                params:{
                    id:deleteId

                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(function (response) {
                    setAddModal(false);
                    setName('');
                    setAvailable('');
                    Toast.show({
                        text: 'Successfully deleted Event',
                        buttonText: 'Okay',
                        type: "success"

                    });
                    setDeleteModal(false);
                    setUpdate(!update);


                })
                .catch(function (error) {

                    // alert(JSON.stringify(error))
                });
        });
    }


    return (
        <Container>
            <Content>
                <Modal  renderToHardwareTextureAndroid isVisible={deleteModal}>
                    <View style={{height:180,backgroundColor:'#fff',padding:10,borderRadius:20}}>
                        <Text style={{fontFamily:'Poppins-Medium',color:'#000',fontSize:20,paddingHorizontal:20,paddingTop:20}}>Are you sure you want delete this event?</Text>
                        <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                            <Button
                                title="Press me"
                                onPress={() => {setDeleteModal(false)}}
                                style={ styles.modalCancel }
                            >
                                <Text style={{color:'#000' ,fontFamily:'Poppins-Medium',textAlign:'center',fontSize:12,textAlign:'center'}}>{t('Cancel')} </Text>

                            </Button>
                            <Button
                                title="Press me"
                                onPress={() => {delete_event()}}
                                style={ styles.modalBook }
                            >
                                <Text style={{color:'#fff' ,fontFamily:'Poppins-Medium',textAlign:'center',fontSize:12,textAlign:'center'}}>{t('Confirm')} </Text>

                            </Button>


                        </View>
                    </View>
                </Modal>
                <Modal renderToHardwareTextureAndroid animationIn="fadeIn"  isVisible={addModal}>
                    <View style={{height:'100%',backgroundColor:'#fff',padding:10,borderRadius:20}}>
                        <Text style={{fontFamily:'Poppins-Medium',color:'#000',fontSize:20,paddingHorizontal:20,paddingTop:20}}>{t('Add Event')}</Text>




                            <Text style={{        fontFamily:'Poppins-Medium',
                                fontSize:12,
                                padding:10,
                                textAlign:'center'

                            }}>{t('Name')}</Text>
                            <Item style={styles.searchInput} rounded >

                                <Input placeholder='Name' value={name} onChangeText={(value)=>setName(value)} style={{textAlign:'center'}}  fontFamily='Poppins-ExtraLight' fontSize={15}  placeholderTextColor="#CECDCD"
                                />
                            </Item>
                            <Text style={{        fontFamily:'Poppins-Medium',
                                fontSize:12,
                                padding:10,
                                textAlign:'center'

                            }}>{t('Available')}</Text>
                            <Item style={styles.searchInput} rounded >

                                <Input placeholder='Available' value={available} onChangeText={(value)=>setAvailable(value)} style={{textAlign:'center'}}  fontFamily='Poppins-ExtraLight' fontSize={15}  placeholderTextColor="#CECDCD"
                                />
                            </Item>
                            <Text style={{        fontFamily:'Poppins-Medium',
                                fontSize:12,
                                padding:10,
                                textAlign:'center'

                            }}>{t('Time')} {moment(time).format('LT')}</Text>
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

                            }}>{t('Select Time')}</Text>
                        </Button>

                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={time}
                                mode={'time'}
                                is24Hour={false}
                                display="clock"
                                onChange={onChange}
                            />
                        )}
                        <View style={{flexDirection:'row',margin:10,justifyContent:'center'}}>
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

                        }} onPress={()=>{add_event()}} >
                            <Text style={{
                                fontFamily:'Poppins-Medium',
                                fontSize:12,
                                padding:10,
                                textAlign:'center',
                                color:'#fff',
                                alignSelf:'center'

                            }}>{t('Add Event')}</Text>
                        </Button>
                            <Button title="Choose Photo" style={{
                                backgroundColor: '#FFFFFF',
                                color: '#ffffff',
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
                                margin:10,
                                alignSelf:'center'


                            }} onPress={()=>{setAddModal(false)}} >
                                <Text style={{
                                    fontFamily:'Poppins-Medium',
                                    fontSize:12,
                                    padding:10,
                                    textAlign:'center',
                                    color:'#000',
                                    alignSelf:'center'

                                }}>{t('Cancel')}</Text>
                            </Button>
                        </View>


                        </View>
                </Modal>

                <View  style={styles.container}>
                    <View style={styles.buttons}>
                        <Button
                            title="Press me"
                            onPress={() => {setAddModal(true);}}
                            style={styles.selectedButton }
                        >
                            <Text style={{color: '#fff' ,fontFamily:'Poppins-Medium',textAlign:'center',fontSize:15}}>{t('Add Event')}</Text>
                        </Button>


                    </View>

                    <FlatList
                        style={styles.components}
                        data={currentData}
                        renderItem={({ item }) => (


                            <SpecialEventBox
                                name={item.name}
                                available={item.available}
                                time={item.time}
                                delete={()=>{setDeleteModal(true);setDeleteId(item.id)}}
                                image="https://docs.nativebase.io/docs/assets/web-cover1.jpg"
                            />
                        )}
                        keyExtractor={item => item.id}
                    />

                </View>
            </Content>

        </Container>


    );
}
const styles = StyleSheet.create({

    container: {
        backgroundColor:'#FFFFFF',
        borderRadius:40,
        textAlign:'center',
        alignItems:'center'
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
        alignSelf:'center'
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
        width:'90%'
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
        width:90,
        shadowColor: '#EFEFEF',
        shadowOffset: { height: 0, width: 0 },

    },

    modalBook:{
        backgroundColor: '#E50000',
        flexDirection:'row',
        alignSelf:'center',
        borderRadius:10,
        height:45,
        width:95,
        justifyContent:'center',
        marginHorizontal:15,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        margin:20,
        shadowColor: '#E50000',
        shadowOffset: { height: 0, width: 0 },

    },
});

