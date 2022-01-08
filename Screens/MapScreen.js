import React, {useState} from "react";
import {View, Text, StyleSheet, Dimensions} from "react-native";
import MapView,{Marker} from "react-native-maps";

const defaultLocation={
    latitude: 20.5931,
    longitude: -100.392,
    latitudeDelta: 0.00422,
    longitudeDelta: 0.00421,
}

const MapScreen = () =>{
    const [coords, setCoords] = useState(null);

    const addMarker = (event) =>{
        setCoords(event.nativeEvent.coordinate)
    }

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

export default MapScreen;

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
