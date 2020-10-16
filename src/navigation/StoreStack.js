import {NavigationContainer} from "@react-navigation/native";
import {Text} from  'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
const Tab = createBottomTabNavigator();
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

import { useTranslation } from 'react-i18next';

import HomeScreen from '../screens/Store/HomeScreen'
import CalenderScreen from "../screens/Store/CalenderScreen";
import CouponScreen from "../screens/Store/CouponsScreen";
import PaymentScreen from "../screens/Store/PaymentScreen";
import EventsScreen from "../screens/Store/EventsScreen";
import i18n from "i18next";

export default function Store() {
    const { t } = useTranslation();

    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: '#E50000',
                inactiveTintColor: '#000000',
                labelStyle: {
                    fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',
                    fontSize:10
                },
                style:{
                    borderRadius:25,
                    shadowOpacity: 0.1,
                    shadowRadius: 5,
                    shadowColor: '#000',
                    shadowOffset: { height: 0, width: 0 },
                    borderBottomLeftRadius:0,
                    borderBottomRightRadius:0,



                }
            }}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let type;
                    color = focused ? '#E50000' : '#000000';

                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'home'
                            : 'home';
                        type = 'AntDesign'
                    } else if (route.name === 'Calender') {
                        iconName = focused ? 'calendar' : 'calendar';

                        type = 'AntDesign'
                    }
                    else if (route.name === 'Coupons') {
                        iconName = focused ? 'percent' : 'percent';
                        type = 'Feather'
                    }
                    else if (route.name === 'Payment') {
                        iconName = focused ? 'money-bill-wave' : 'money-bill-wave';
                        type = 'FontAwesome5'
                    }
                    else if (route.name === 'Events') {
                        iconName = focused ? 'basketball-ball' : 'basketball-ball';
                        type = 'FontAwesome5'
                    }


                    // You can return any component that you like here!
                    switch (type) {
                        case 'Octicons':

                            return <Octicons name={iconName} size={size}  color={color}/>;
                            break;
                        case 'Ionicons':
                            return <Ionicons name={iconName}   size={size} color={color}/>;
                            break;
                        case 'MaterialCommunityIcons':
                            return <MaterialCommunityIcons name={iconName} size={size} color={color}/>;
                            break;
                        case 'EvilIcons':
                            return <EvilIcons name={iconName} size={size}  color={color}/>;
                            break;
                        case 'FontAwesome5':
                            return <FontAwesome5 name={iconName}  size={size} color={color}/>;
                            break;
                        case 'AntDesign':
                            return <AntDesign name={iconName} size={size} color={color}/>;
                            break;
                        case 'Feather':
                            return <Feather name={iconName} size={size} color={color}/>;
                            break;

                    }

                },
            })}
        >

            <Tab.Screen name="Home"   component={HomeScreen} options={{headerShown:false,title:t('Home')}} />
            <Tab.Screen name="Events" component={EventsScreen} options={{headerShown:false,title:t('Events')}} />

            <Tab.Screen name="Calender" component={CalenderScreen} options={{headerShown:false,title:t('Reservations')}} />
            <Tab.Screen name="Coupons" component={CouponScreen} options={{headerShown:false,title:t('Coupons')}}/>
            <Tab.Screen name="Payment" component={PaymentScreen} options={{headerShown:false,title:t('Payment')}} />

        </Tab.Navigator>

    );
};