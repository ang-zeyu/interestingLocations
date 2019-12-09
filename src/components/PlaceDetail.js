
import React, { Component } from "react";
import {
    View,
    Image,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Dimensions
} from "react-native";
import { connect } from "react-redux";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import Icon from "react-native-vector-icons/Ionicons";
import { deletePlace } from "../store/actions/places";

class PlaceDetail extends Component {
    state = {
        viewMode: "portrait"
    };

    constructor(props) {
        super(props);
        Dimensions.addEventListener("change", this.updateStyles);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.updateStyles);
    }

    updateStyles = dims => {
        this.setState({
            viewMode: dims.window.height > 500 ? "portrait" : "landscape"
        });
    };

    placeDeletedHandler = () => {
        this.props.deletePlace(this.props.description);
        Navigator.pop(this.props.componentId);
    };

    render() {
        return (
            <View
                style={[
                    styles.container,
                    this.state.viewMode === "portrait"
                    ? styles.portraitContainer
                    : styles.landscapeContainer
                ]}
            >
                <View style={styles.subContainer}>
                    <Image
                        source={this.props.image}
                        style={styles.placeImage}
                    />
                </View>
                <View style={styles.subContainer}>
                    <MapView provider={ PROVIDER_GOOGLE } initialRegion={{...this.props.position, latitudeDelta: 0.0122, longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122}} style={{flex:1}}>
                        <MapView.Marker coordinate={this.props.position} />
                    </MapView>
                </View>
                <View style={styles.subContainer}>
                    <View>
                        <Text style={styles.placeName}>
                            {this.props.description}
                        </Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={this.placeDeletedHandler}>
                            <View style={styles.deleteButton}>
                                <Icon
                                    size={30}
                                    name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
                                    color="red"
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 22,
        flex: 1
    },
    portraitContainer: {
        flexDirection: "column"
    },
    landscapeContainer: {
        flexDirection: "row"
    },
    placeImage: {
        width: "100%",
        height: 200
    },
    placeName: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 28
    },
    deleteButton: {
        alignItems: "center"
    },
    subContainer: {
        flex: 1
    }
});

export default connect(null, { deletePlace })(PlaceDetail);

