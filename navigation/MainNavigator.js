import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import MapScreen from "../Screens/MapScreen";
import LocationMap from "../Screens/LocationMap";
import FormScreen from "../Screens/FormScreen";
import DetailsScreen from "../Screens/DetailsScreen";
import HttpFetchScreen from "../Screens/HttpFetchScreen";
import LoginScreen from "../Screens/LoginScreen"
import LogoutScreen from "../Screens/LogoutScreen"

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export const MyDrawer = () =>{
    return (
        //<NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name="Maps" component={MapScreen} />
                <Drawer.Screen name="LocationMap" component={LocationMap} />
                <Drawer.Screen name="FormScreen" component={FormScreen} />
                <Drawer.Screen name="Details" component={DetailsScreen} />
                <Drawer.Screen name="HttpFetch" component={HttpFetchScreen} />
                <Drawer.Screen name="Salir" component={LogoutScreen} />
            </Drawer.Navigator>
        //</NavigationContainer>
    );
}

export const StackLogin = () =>{

    return(
            <Stack.Navigator>
                <Stack.Screen name={"LoginScreen"}
                              component={LoginScreen}
                              options={{headerShown:false}}
                />
            </Stack.Navigator>

    )
}