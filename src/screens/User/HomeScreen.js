import React,{useState,useEffect} from 'react';
import {View,Image,StyleSheet,Alert,ScrollView,FlatList,TouchableOpacity} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Container, Header, Content, Item, Input, Icon,Button,Text,Spinner } from 'native-base';
import StoreBox from '../../components/StoreBox'
import Geolocation from '@react-native-community/geolocation';
import axios from "axios/index";
import AsyncStorage from "@react-native-community/async-storage";
import  StatusBarPlaceHolder from '../../components/StatusBarPlaceHolder'
import { ImageBackground,Tile,Overlay,Caption,Title } from '@shoutem/ui';

import Feather from 'react-native-vector-icons/Feather';
import i18n from "i18next/index";

export default function HomeScreen({navigation}) {
    const { t } = useTranslation();
    const [selected , setSelected] = useState('resturant');
    const [restaurants, setRestaurants ] = useState([]);
    const [cafes, setCafes ] = useState([]);
    const [pool, setPool ] = useState([]);
    const [bar, setBar ] = useState([]);

    const [currentData,setCurrentData] = useState(restaurants);
    const [search,setSearch] = useState();
    const [update,setUpdate] = useState();
    const [featched,setFeatched] = useState(false);
    useEffect(()=>{
        // AsyncStorage.removeItem('token');
        // Geolocation.getCurrentPosition((info) => {
        //     var lat = info.coords.latitude;
        //     var lng = info.coords.latitude;

// alert('amr')
            axios.get('http://192.168.1.2:8000/api/stores', {
                params: {
                    search
                }
            })
                .then(function (response) {
                    setFeatched(true);
// alert('ss')
                    setRestaurants(response.data.restaurants);
                    setCafes(response.data.cafes);
                    setPool(response.data.pool);
                    setBar(response.data.bar);

                    setCurrentData(response.data.restaurants);
                })
                .catch(function (error) {
// alert('jj')

                    alert(error.response.data.errors);
                });
        // })


    },[update]);
    return (
            <Container>
                <Content>


                    <View  style={{    position: 'absolute',height:220,width:'100%',justifyContent:'flex-start',flexDirection:'column'}}>
            <Image
                style={styles.stretch}
                source={require('../../Assets/Images/test.jpg')}
                style={{resizeMode:'cover',height:'100%',width:'100%'}}
            />

        </View>
            <View renderToHardwareTextureAndroid style={styles.container}>
                {
                    /*
                <View style={{width:'90%',justifyContent:'center',alignItems:'center',paddingTop:20}}>
                <ImageBackground
                    styleName="medium-portrait"
                    style={{margin:10,width:'100%'}}
                    imageStyle={{ borderRadius: 10}}

                    source={{ uri: 'https://i.pinimg.com/originals/9b/71/1e/9b711ec1c787197656dbe59846a7a6eb.jpg' }}
                >
                    <Tile>
                        <Overlay
                            style={{borderRadius:10,width:'80%'}}>
                            <Title style={{fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium'}}>Cafe</Title>
                        </Overlay>
                    </Tile>
                </ImageBackground>

                <ImageBackground
                    styleName="medium-portrait"
                    style={{margin:10,width:'100%'}}
                    imageStyle={{ borderRadius: 10}}

                    source={{ uri: 'https://jooinn.com/images/blur-restaurant-3.png' }}
                >
                    <Tile>
                        <Overlay
                            style={{borderRadius:10,width:'80%'}}>

                        <Title
                        style={{fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium'}}
                        styleName="md-gutter-bottom">Restaurants</Title>
                        </Overlay>
                    </Tile>
                </ImageBackground>

                <ImageBackground
                    styleName="medium-portrait"
                    style={{margin:10,width:'100%'}}
                    imageStyle={{ borderRadius: 10}}

                    source={{ uri: 'https://thumbs.dreamstime.com/b/seascape-abstract-beach-background-blur-bokeh-light-calm-sea-sky-seascape-abstract-beach-background-blur-bokeh-light-143477053.jpg' }}
                >
                    <Tile>
                        <Overlay
                            style={{borderRadius:10,width:'80%'}}>

                        <Title
                        style={{fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium'}}
                         styleName="md-gutter-bottom">Beach Club\ POOL</Title>
                        </Overlay>
                    </Tile>
                </ImageBackground>

                <ImageBackground
                    styleName="medium-portrait"
                    style={{margin:10,width:'100%'}}
                    imageStyle={{ borderRadius: 10}}

                    source={{ uri: 'https://jooinn.com/images/blur-restaurant-1.png' }}
                >
                    <Tile>
                        <Overlay
                            styleName="fill-parent image-overlay">

                        <Text
                        style={{fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium'}}
                        styleName="md-gutter-bottom">Bar / Club</Text>
                        </Overlay>
                    </Tile>
                </ImageBackground>
                </View>
                */
                }



                <Item style={styles.searchInput} rounded>
                    <Feather active name='search' size={20} style={{color:'#CECDCD'}} />
                    <Input placeholder={t('Search')} value={search} onChangeText={(value)=>{setSearch(value)}} onSubmitEditing={()=>{setUpdate(!update)}} fontFamily='Poppins-ExtraLight' fontSize={15}  placeholderTextColor="#CECDCD"
                    />
                </Item>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}

                        >
                        <View  style={styles.buttons}>

                        <TouchableOpacity
                    title="Press me"
                    onPress={() => {setSelected('cafe'); setCurrentData(cafes)}}

                >
                            <ImageBackground
                                styleName="medium-portrait"
                                style={{margin:10,width:165,height:65,borderRadius:50}}

                                imageStyle={{ borderRadius: 10}}

                                source={{ uri: 'https://i.pinimg.com/originals/9b/71/1e/9b711ec1c787197656dbe59846a7a6eb.jpg' }}
                            >
                                <View style={styles.child}>

                                <Text style={{color:selected== 'cafe' ? '#d6d6d6' : '#fff',fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',textAlign:'center',fontSize:18}}>{t('Cafe')}</Text>
                                </View>
                            </ImageBackground>
                </TouchableOpacity>

                    <TouchableOpacity
                    onPress={() => {setSelected('resturant'); setCurrentData(restaurants)}}
                >
                        <ImageBackground
                            styleName="medium-portrait"
                            style={{margin:10,width:165,height:65,borderRadius:50}}

                            imageStyle={{ borderRadius: 10}}

                            source={{ uri: 'https://jooinn.com/images/blur-restaurant-3.png' }}
                        >
                            <View style={styles.child}>

                            <Text style={{color: selected== 'resturant' ? '#d6d6d6' : '#fff',fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',textAlign:'center',fontSize:18}}>{t('resturants')}</Text>
                            </View>
                        </ImageBackground>
                </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {setSelected('pool'); setCurrentData(pool)}}
                    >
                        <ImageBackground
                            styleName="medium-portrait"
                            style={{margin:10,width:165,height:65,borderRadius:50}}

                            imageStyle={{ borderRadius: 10}}

                            source={{ uri: 'https://thumbs.dreamstime.com/b/seascape-abstract-beach-background-blur-bokeh-light-calm-sea-sky-seascape-abstract-beach-background-blur-bokeh-light-143477053.jpg' }}
                        >
                            <View style={styles.child}>

                            <Text style={{color: selected== 'pool' ? '#d6d6d6' : '#fff',fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',textAlign:'center',fontSize:18}}>{t('Pool / Beach club')}</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {setSelected('bar'); setCurrentData(bar)}}
                    >
                        <ImageBackground
                            styleName="medium-portrait"
                            style={{margin:10,width:165,height:65,borderRadius:50}}

                            imageStyle={{ borderRadius: 10}}

                            source={{ uri: 'https://jooinn.com/images/blur-restaurant-1.png' }}
                        >
                            <View style={styles.child}>

                            <Text style={{color: selected== 'bar' ? '#d6d6d6' : '#fff',fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',textAlign:'center',fontSize:18}}>{t('Bar / Club')}</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                        </View>

                    </ScrollView>


                {
                    (featched) ?
                        <FlatList
                            renderToHardwareTextureAndroid
                            style={styles.components}
                            data={currentData}
                            ListEmptyComponent={()=>
                                <Text style={{color:  '#000',fontFamily:'Poppins-Medium',textAlign:'center',fontSize:15}}>No Data</Text>
                            }
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={()=>{
                                    navigation.navigate('CafeScreen',{item:JSON.stringify(item)})
                                }}
                                                  activeOpacity={.95}
                                >

                                    <StoreBox
                                        name={item.name}
                                        description={item.description_en}
                                        image={'http://127.0.0.1:8000/images/'+item.image}
                                        available={item.available}
                                        rate={item.rating}
                                    />
                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item.id}
                        />
                        :
                        <Spinner color='#E50000'/>
                }





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
        alignItems:'center'
    },
    searchInput:{
        width:'90%',
        borderRadius:10,
        backgroundColor:'#F5F5F5',
        marginTop:35,
        height:70,
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
        width:'90%'
    },
    child: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10
    }

});
