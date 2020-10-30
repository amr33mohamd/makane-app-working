import User from './UserStack';
import  Auth from './AuthStack';
import { Root } from "native-base";

import {NavigationContainer} from "@react-navigation/native";
import {Text} from  'react-native';
import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {useTranslation} from "react-i18next/src/index";
import AsyncStorage from '@react-native-community/async-storage';
import LoadingScreen from "../screens/LoadingScreen";
import CafeScreen from "../screens/User/CafeScreen";
import Store from "./StoreStack";
import PayScreen from "../screens/Store/PayScreen";

const Stack = createStackNavigator();
const linking = {
    prefixes: ['https://makane.com', 'makane://'],
    config: {
        screens: {
            User: 'user/:id',
            CafeScreen:'cafe/:id'
        },
    },
};
export default function RootNavigation() {
    const { t } = useTranslation();
    const [initial , setIninitial] = useState('Auth');

        return (
            <Root>
                <NavigationContainer linking={linking}>
                    <Stack.Navigator  >
                        <Stack.Screen name="Loading" component={LoadingScreen} options={{headerShown:false,title:t('Home')}}/>


                        <Stack.Screen name="User" component={User} options={{headerShown:false,title:t('Home')}}/>

                        <Stack.Screen name="Auth" component={Auth} options={{headerShown:false,title:t('Home')}} />
                        <Stack.Screen name="CafeScreen" component={CafeScreen} options={{headerShown:false,title:t('CafeScreen')}} />

                        <Stack.Screen name="Store" component={Store} options={{headerShown:false,title:t('CafeScreen')}} />
                        <Stack.Screen name="PayScreen" component={PayScreen} options={{headerShown:false,title:t('PayScreen')}} />





                    </Stack.Navigator>
                </NavigationContainer>
            </Root>

        );
    }
