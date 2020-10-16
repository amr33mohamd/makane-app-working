import React, {Component} from "react";
import {StyleSheet, StatusBar, View, Platform} from "react-native";
import SpecialEventBox from "./SpecialEventBox";

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

function StatusBarPlaceHolder() {
    return (
        <View style={{
            width: "100%",
            height: STATUS_BAR_HEIGHT,
        }}>
            <StatusBar
                barStyle="default"
            />
        </View>
    );
}
export default StatusBarPlaceHolder;