import React, {useState} from "react";
import {View, Text, StyleSheet, Image, Dimensions, Button, Platform, ActivityIndicator} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

//let defaultImg = {url:"https://avalos.sv/wp-content/uploads/295-default-featured-image.png"};
let defaultImg = "https://avalos.sv/wp-content/uploads/295-default-featured-image.png";

const HttpFetchScreen = () =>{
    const [date, setDate] = useState(new Date(1598051730000));
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [imageInfo, setImageInfo] = useState(null);

    const onSelectedDate = async (e, selectedDate) =>{
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        await tryFetch(currentDate)
    }

    const tryFetch = async (date) =>{
        try {
            setIsLoading(true)
            let fechaFormateada = date.toISOString().split("T")[0];
            await fetchNasa(fechaFormateada)
        } catch (e){
            console.log(e)
        }
        setIsLoading(false)
    }

    const fetchNasa = async (date) => {

        const endpoint = `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${date ? date : "2010-10-01"}`
        const response = await fetch(endpoint,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })
        const resData = await response.json()
        setImageInfo(resData)
    }
    if(isLoading){
        return(
            <View style={styles.loadingContainer}>
                <ActivityIndicator size={"large"} color={"blue"}/>
            </View>
        )
    }
    return(
        <View style={styles.container}>
            <Image style={styles.image} source={{uri:imageInfo?imageInfo.url:defaultImg}}/>

            {show &&
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={onSelectedDate}
                />
            }
            <Button title={"Seleccionar Fecha"} onPress={()=>setShow(true)}/>
            {
                imageInfo && //undefined null false // Cualquier otra cosa es true
                <View>
                    <Text>Titulo</Text>
                    <Text>{imageInfo.title}</Text>
                    <Text>Fecha</Text>
                    <Text>{imageInfo.date}</Text>
                    <Text>Descripcion</Text>
                    <Text>{imageInfo.explanation}</Text>
                </View>
            }

        </View>
    )
}

export default HttpFetchScreen;

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    image:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height *0.40
    },
    loadingContainer:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
    }
})