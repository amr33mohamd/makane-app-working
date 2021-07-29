import React,{useState,useEffect} from 'react';
import {View,Image,StyleSheet,Alert,ScrollView,FlatList,TouchableOpacity,Linking,Dimensions} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Container, Header, Content, Item, Input, Icon,Button,Text,Spinner } from 'native-base';
import StoreBox from '../../components/StoreBox'
import Geolocation from '@react-native-community/geolocation';
import axios from "axios/index";
import AsyncStorage from "@react-native-community/async-storage";
import  StatusBarPlaceHolder from '../../components/StatusBarPlaceHolder'
import { ImageBackground,Tile,Overlay,Caption,Title } from '@shoutem/ui';
import Carousel from 'react-native-snap-carousel';

import Feather from 'react-native-vector-icons/Feather';
import i18n from "i18next/index";

export default function ImagesScreen({route,navigation}) {
  const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16);
const { width, height } = Dimensions.get("window");

    const { t } = useTranslation();
    const [selected , setSelected] = useState('resturant');
    const [restaurants, setRestaurants ] = useState([]);
    const [images, setImages ] = useState([
        { url: "https://images.pexels.com/photos/1382734/pexels-photo-1382734.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", name:"shakira" },
        { url: 'https://images.pexels.com/photos/9413/animal-cute-kitten-cat.jpg?cs=srgb&dl=adorable-animal-cat-9413.jpg&fm=jpg', name: "cat" },
        { url: 'https://i.pinimg.com/236x/c6/6b/11/c66b111bf4df809e87a1208f75d2788b.jpg', name: "baby" }
      ]);
    const [pool, setPool ] = useState([]);
    const [bar, setBar ] = useState([]);
    const [carouselItems,setcarouselItems] = useState([

        ]);
        var carousel = '';
        const [activeIndex,setactiveIndex] = useState(0);
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

        // })


    },[update]);
    var bottom = (e)=> {
        alert('Swipe Bottom')
      }

      var top = (e)=> {
        alert('Swipe Top')
      }

    return (

      <View>

          {
              images.map((image) =>
                  <Image renderToHardwareTextureAndroid source={{
                      uri:  image.url
                  }}
                         style={{
                             width:width,
                             height: width*2,
                             resizeMode: 'stretch'
                         }}/>

              )
          }


</View>

    );
}
const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
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
