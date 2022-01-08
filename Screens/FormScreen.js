import React,{useState} from 'react';
import {Switch, StyleSheet, View, Text, TextInput, ToastAndroid, Platform, Alert} from "react-native";

const FormScreen = (props) => {

    const [texto, setTexto] = useState(null)

    const [email, setEmail] = useState(null)

    const [isEnabled, setIsEnabled] = useState(false);


    const toggleSwitch = () =>{
        setIsEnabled(!isEnabled)
        Platform.OS === 'android' ?
            ToastAndroid.show('Un pikachu salvaje aparecio',ToastAndroid.LONG)
            :
            Alert.alert("Mensaje", 'Un pikachu salvaje aparecio', [{text:'ok'}])
    }

    const validateEmail = (txt) =>{

        const emailTest = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
        // console.log(txt.match(emailTest))
        if(txt.match(emailTest)){
            setEmail(txt)
        }else{
            setEmail(null)
        }
    }

    return(
        <View style={styles.container}>
            <Text>FormScreen</Text>
            <TextInput
                style={styles.input}
                placeholder={"Esto es un Placeholder"}
                value={texto}
                onChangeText={(e) => setTexto(e)}
                // keyboardType={"numeric"}
            />
            <TextInput
                style={styles.input}
                placeholder={"Email"}
                onChangeText={txt =>validateEmail(txt)}
                keyboardType={"email-address"}
            />
            {
                email ?
                    <Text>Email Valido</Text>
                    :
                    <Text>Email Invalido</Text>
            }

            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>
    )
}
export default FormScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    input:{
        height:40,
        margin:12,
        borderWidth:1,
        padding:10,
        borderColor:'red'

    }

});

