import React from 'react';
import {StyleSheet, View, Button, Text, Dimensions} from "react-native";
import {useDispatch} from "react-redux";
import * as authActions from "../Store/Actions/authActions";

const LogoutScreen = (props) =>{
    const dispatch = useDispatch();
    const onClick = () =>{
        dispatch(authActions.logOut())
    }
    return(
        <View style={styles.container}>
            <View style={styles.texto}>
                <Text style={styles.titulo}>
                    ¿Realmente quiere salir?
                </Text>
            </View>
            <View style={styles.boton}>
                <Button title={"Logout"} onPress={onClick} color={'#2D538C'}/>
            </View>
        </View>
    )
}
export default LogoutScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titulo: {
        fontSize:25,
        fontWeight:'bold',
        color:'#2D538C'
    },
    boton:{
        width: Dimensions.get('window').width,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop:20
    },
    texto:{
        width: Dimensions.get('window').width,
        height: (Dimensions.get('window').height)*.43,
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
});