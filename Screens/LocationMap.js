import React, {useState, useEffect} from "react";
import {View, Alert, StyleSheet, Dimensions} from "react-native";
import MapView,{Marker} from "react-native-maps";
import * as Location from "expo-location";

const defaultLocation={
    latitude: 20.5931,
    longitude: -100.392,
    latitudeDelta: 0.00422,
    longitudeDelta: 0.00421,
}
/**
 *Marker recibe un objeto de coordenadas
 * {
 *     latitude: 20.5931,
 *       longitude: -100.392,
 * }
 *
 *
 */
const LocationMap = (props) => {

    const [coords, setCoords] = useState(null);

    const addMarker = async (event) =>{
        setCoords(event.nativeEvent.coordinate)
        await getAddressInfo(event.nativeEvent.coordinate)
    }
    const getAddressInfo = async (coords) =>{ // Coords de tipo Marker
        try{
            let addressInfo = await Location.reverseGeocodeAsync({
                latitude:coords.latitude,
                longitude:coords.longitude
            })
            console.log(addressInfo);
        }catch(e){
            Alert.alert("Error", "Ocurrio un error "+e.toString(), [{text:'ok'}])
        }
    }

    const requestPermissions = async () =>{
        try{
            console.log("Ejecutando RequestPermission")
            let {status} = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted'){ // Usuario rechazo los permisos de Location
                Alert.alert("Error", "Rechazaste los permisos de ubicacion", [{text:'ok'}])
            }

            // let locationCoords = await Location.getCurrentPositionAsync({accuracy:5});//-> 3s
            // console.log(locationCoords.coords)
            // setCoords({
            //     // latitude:locationCoords.coords.latitude,
            //     // longitude:locationCoords.coords.longitude,
            //     latitude:20.5931,
            //     longitude:-100.392,
            // })

        }catch(e){
            Alert.alert("Error", "Ocurrio un error "+e.toString(), [{text:'ok'}])
        }
    }

    useEffect(()=>{
        //En el primer Ciclo de renderizado
        //Y
        //SI coords cambia
        props.navigation.addListener('focus', requestPermissions)
    },[]);
    return (
        <View style={styles.container}>
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
                    // if(coords){
                    //<Marker key={1} coordinate={coords}/>
                    //}else{
                    //null
                    // }
                }
            </MapView>
        </View>
    );
}

export default LocationMap;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});