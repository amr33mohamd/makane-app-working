import {NavigationContainer} from "@react-navigation/native";
import {Text} from  'react-native';
import React, { useState, useEffect } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "../screens/Auth/LoginScreen";
import SignUpScreen from "./../screens/Auth/SignUpScreen";
import {useTranslation} from "react-i18next/src/index";
import VerifyScreen from "../screens/Auth/VerifyScreen";
import AsyncStorage from '@react-native-community/async-storage';
import PhoneScreen from "../screens/Auth/PhoneScreen";

const Stack = createStackNavigator();

export default function Auth(route,navigation) {
    const { t } = useTranslation();

    useEffect(()=>{
        AsyncStorage.getItem('token').then((token)=>{
            if(token){
                navigation.navigate('User');
            }

        })
    });
    return (
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false,title:t('verify')}} />

                    <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown:false,title:t('Home')}} />
                    <Stack.Screen name="Verify" component={VerifyScreen} options={{headerShown:false,title:t('verify')}} />
                    <Stack.Screen name="Phone" component={PhoneScreen} options={{headerShown:false,title:t('Phone')}} />


                </Stack.Navigator>

    );
};