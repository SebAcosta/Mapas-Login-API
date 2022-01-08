import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {useSelector} from "react-redux";
import {StackLogin, MyDrawer} from "./MainNavigator";

const LoginValidation = (props) =>{

    const isAuth = useSelector(state => state.auth.login);

/*    if(!isAuth){
        fetchCookie(){

        }
    }*/

    return(
        <NavigationContainer>
            {isAuth && <MyDrawer/>}
            {!isAuth && <StackLogin/>}

        </NavigationContainer>
    );
}
export default LoginValidation;
