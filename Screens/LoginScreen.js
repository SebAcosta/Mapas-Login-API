import React,{useState} from 'react';
import {StyleSheet, View, TextInput, Button, Alert, Dimensions, Text} from "react-native";
import {useDispatch} from "react-redux";
import * as authActions from "../Store/Actions/authActions";

const LoginScreen = (props) =>{
    const [user, setUser] = useState(null)
    const [password, setPassword] = useState(null)
    

    const dispatch = useDispatch();
    const onClick = () =>{
        try {
            console.log(user, password)
            user && password ?
                dispatch(authActions.tryLogin(user, password))
            :
                Alert.alert("Error", "Campos vacios", [{text:'ok'}])
        }catch(e){
            Alert.alert("Error", e.toString(), [{text:'ok'}])
        }
    }
    const validateUser = (user) =>{
        console.log(user)
        setUser(user)
    }
    const validatePassword = (password) =>{
        console.log(password)
        setPassword(password)
    }
    return(
        <View style={styles.container}>
            <View style={styles.texto}>
                <Text style={styles.priemra}>Bienvenido</Text>
                <Text style={styles.segunda}>Inicie sesión antes de seguir</Text>
            </View>
            <View style={styles.inputs}>
                <TextInput
                    style={styles.input}
                    placeholder={"User"}
                    onChangeText={txt => validateUser(txt)}
                />
                <TextInput
                    style={styles.input}
                    placeholder={"Password"}
                    onChangeText={txt => validatePassword(txt)}
                />
            </View>
            <View style={styles.boton}>
                <Button title={"Login"} onPress={onClick} color={'#2D538C'}/>
            </View>
        </View>
    )
}
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        borderColor:'#2D538C',
        width:'60%',
        borderWidth:1,
        borderRadius:10,
        paddingLeft:15
    },
    texto:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height*.45,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    priemra:{
        fontSize: 40,
        fontWeight:'bold',
        color:'#2D538C'
    },
    segunda:{
       fontSize:25,
       fontStyle:'italic',
       color:'#2D538C'
    },
    inputs:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height*.17,
        justifyContent:'space-evenly',
        alignItems: 'center',
    },
    boton:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height*.38,
        justifyContent:'flex-start',
        alignItems: 'center',
        marginTop:5
    }
});
