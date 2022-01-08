import React,{useState, useEffect} from 'react';
import {Switch, StyleSheet, View, SafeAreaView, Text, TextInput, Alert, ToastAndroid, Dimensions, Button} from "react-native";
import MapView,{Marker} from "react-native-maps";
import * as Location from "expo-location";

var defaultLocation={
    latitude: 20.5931,
    longitude: -100.392,
    latitudeDelta: 0.00422,
    longitudeDelta: 0.00421,
}

const DetailsScreen = (props) =>{
    const [coords, setCoords] = useState(null);
    const [address, setAddress] = useState(null)
    const [pais, setPais] = useState(null)
    const [estado, setEstado] = useState(null)
    const [municipio, setMunicipio] = useState(null)
    const [cp, setCP] = useState(null)
    const [calle, setCalle] = useState(null)

    var addressInfo;

    const addMarker = async (event) =>{
        setCoords(event.nativeEvent.coordinate)
        await getAddressInfo(event.nativeEvent.coordinate)
    }
    const getAddressInfo = async (coords) =>{ // Coords de tipo Marker
        try{
            addressInfo = await Location.reverseGeocodeAsync({
                latitude:coords.latitude,
                longitude:coords.longitude
            })
            setAddress(addressInfo[0])
            console.log(addressInfo[0])
            setPais(addressInfo[0].country)
            setEstado(addressInfo[0].region)
            setMunicipio(addressInfo[0].city)
            setCP(addressInfo[0].postalCode)
            setCalle(addressInfo[0].street)

        }catch(e){
            Alert.alert("Error", "Ocurrio un error "+e.toString(), [{text:'ok'}])
        }
    }

    const setMarker = async(event) =>{
        var address = calle + " " + municipio + " " + estado + " " + cp + " " + pais
        console.log(address)
        await getDataInfo(address)
    }

    const getDataInfo = async (address) =>{
        try{
            var dataInfo = await Location.geocodeAsync(address)
            setCoords(dataInfo[0])
            console.log(dataInfo[0])
        }catch(e){
            Platform.OS === 'android' ?
            ToastAndroid.show('No se encontró la dirección',ToastAndroid.LONG)
            :
            Alert.alert("Mensaje", 'No se encontró la dirección', [{text:'ok'}])
        }
    }
    const requestPermissions = async () =>{
        try{
            console.log("Ejecutando RequestPermission")
            let {status} = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted'){ // Usuario rechazo los permisos de Location
                Platform.OS === 'android' ?
            ToastAndroid.show('Error, no se aceptaron los permisos',ToastAndroid.LONG)
            :
            Alert.alert("Error", 'No se aceptaron los permisos', [{text:'ok'}])
            }
        }catch(e){
            Platform.OS === 'android' ?
            ToastAndroid.show('Error, ocurrió un error',ToastAndroid.LONG)
            :
            Alert.alert("Error", 'Ocurrió un error', [{text:'ok'}])
        }
    }

    useEffect(()=>{
        props.navigation.addListener('focus', requestPermissions)
    },[]);

    return (
        <View style={styles.container}>
            <View style={styles.part}>
                <MapView
                    style={styles.map}
                    initialRegion={defaultLocation}
                    onPress={addMarker}
                >
                    {
                        coords ?
                        <Marker key={1} coordinate={coords}/>
                            :
                            null
                    }
                </MapView>
            </View>
            <View style={styles.part}>
                <View style={styles.containerInput}>
                    <TextInput
                        style={styles.input}
                        placeholder={"País"}
                        value={pais}
                        onChangeText={(e)=>setPais(e)}
                    />
                    <TextInput
                        style={styles.input}
                        //setText={}
                        placeholder={"Estado"}
                        value={estado}
                        onChangeText={(e)=>setEstado(e)}
                    />
                    <TextInput
                        style={styles.input}
                        //setText={}
                        placeholder={"Municipio"}
                        value={municipio}
                        onChangeText={(e)=>setMunicipio(e)}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={txt =>validateEmail(txt)}
                        keyboardType={"numeric"}
                        //setText={}
                        placeholder={"Código postal"}
                        value={cp}
                        onChangeText={(e)=>setCP(e)}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={txt =>validateEmail(txt)}
                        //setText={}
                        placeholder={"Calle"}
                        value={calle}
                        onChangeText={(e)=>setCalle(e)}
                    />
                    <Button title={"Enviar"} color={'#2D538C'} onPress={setMarker}/>
                </View>
            </View>
        </View>
    );
}

export default DetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerInput: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        margin:20,
    },
    map: {
        width: "100%",
        height: "100%",
    },
    part:{
        width: Dimensions.get('window').width,
        height: (Dimensions.get('window').height)/2,
    },
    input:{
        height:40,
        width:'70%',
        margin:8,
        borderWidth:1,
        padding:10,
        borderColor:'#2D538C',
        borderRadius:15
    },
});
