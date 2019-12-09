import React from 'react';
import { connect } from 'react-redux';
import { Image, ScrollView, Text, View, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { addPlace } from '../store/actions/places';
import validate from '../util/validator';


class AddPlace extends React.Component {
    constructor(props) {
        super(props);
        const currWindow = Dimensions.get('window');

        this.state = {
            inputIsValid: true,
            inputVal: 'Test Place',
            currentRegion:{
                latitude:1.4, longitude:103.7777, latitudeDelta: 0.0122, longitudeDelta: currWindow.width / currWindow.height * 0.0122
            },
            locationChosen: false,
            imageChosen: null,
            imageSize: {
                height: currWindow.height > currWindow.width ? currWindow.height / 2 : currWindow.height / 1.5,
                width: currWindow.height > currWindow.width ? '90%' : '60%'
            }
        };

        Dimensions.addEventListener('change', this.onOrientationChange);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.onOrientationChange);
    }

    onOrientationChange = (dims) => {
        const { height, width } = dims.window;
        this.setState({
            imageSize: {
                height: height > width ? height / 2 : height / 1.5,
                width: height > width ? '90%' : '60%'
            }
        });

    }

    onPlaceNameChange = (text) => {
        this.setState({
            inputVal: text, inputIsValid: validate(text).minLength(2).end()
        });
    }

    onPlacePress = event => {
        const coords = event.nativeEvent.coordinate;
        this.setState(prevState => {
            this.map.animateToRegion({ ...prevState.currentRegion, latitude:coords.latitude, longitude:coords.longitude }, 200);
            return {
                currentRegion: {...prevState.currentRegion, latitude:coords.latitude, longitude:coords.longitude},
                locationChosen: true
            };
        });
    }

    onLocateMe = () => {
        navigator.geolocation.getCurrentPosition(
            pos => {
                this.setState(prevState => {
                    this.map.animateToRegion({ ...prevState.currentRegion, latitude:pos.coords.latitude, longitude:pos.coords.longitude }, 200);
                    return {
                        currentRegion: {...prevState.currentRegion, latitude:pos.coords.latitude, longitude:pos.coords.longitude},
                        locationChosen: true
                    };
                });
            },
            err => {
                console.log('nomnomnom');
            }
        );
    }

    onAdd = () => {
        if (this.state.inputIsValid && this.state.locationChosen && this.state.imageChosen) {
            this.props.addPlace(
                this.state.inputVal,
                this.state.imageChosen,
                {latitude: this.state.currentRegion.latitude, longitude: this.state.currentRegion.longitude}
            );
        }
    }

    onPickImage = () => {
        ImagePicker.showImagePicker({ title:'Pick an Image' }, (response) => {
            if (!(response.didCancel || response.error)) {
                console.log("Set image");
                this.setState({ imageChosen:{ uri: response.uri } });
            }
        });
    }

    render() {
        let marker = null;
        if (this.state.locationChosen) {
            marker = <MapView.Marker coordinate={this.state.currentRegion} />
        }

        return (
            <ScrollView contentContainerStyle={styles.inputContainer}>
                <View style={styles.addImageView}>
                    <Image source={this.state.imageChosen}
                        style={[styles.imageChosen, this.state.imageSize]}
                    />
                    <TouchableOpacity style={styles.chooseImageButtonView} onPress={this.onPickImage}>
                        <Text style={styles.buttonText}>Choose Image</Text>
                    </TouchableOpacity>
                </View>
                <MapView
                    ref={map => { this.map = map; }}
                    provider={PROVIDER_GOOGLE}
                    onPress={this.onPlacePress}
                    style={styles.map}
                    initialRegion={this.state.currentRegion}
                >
                    {marker}
                </MapView>
                <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonView} onPress={this.onLocateMe}>
                    <Text style={styles.buttonText}>Locate Me</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.onAdd}
                    style={[styles.buttonView,
                        this.state.inputIsValid && this.state.locationChosen && this.state.imageChosen
                            ? null
                            : styles.buttonDisabledView]}
                >
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
                </View>
                <TextInput
                    placeholder='Enter place name'
                    value={this.state.inputVal}
                    style={styles.placeInput}
                    onChangeText={this.onPlaceNameChange}
                />

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        alignItems:'center',
        paddingHorizontal: 10
    },
    placeInput: {
        marginVertical: 10,
        backgroundColor: 'rgba(222,222,222,0.5)',
        height: '6%',
        minWidth: '80%',
        textAlign: 'center',
        fontSize: 18
    },
    map: {
        width:'90%',
        minHeight:350,
        borderColor: 'blue',
        borderWidth: 1,
        borderRadius: 2
    },
    buttonContainer: {
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    buttonView: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderRadius:10,
        backgroundColor:'#60a115',
        marginVertical:'1%',
        marginHorizontal:'2%',
        minHeight:35,
        width:'30%'
    },
    buttonDisabledView: {
        backgroundColor:'#ff424b'
    },
    addImageView: {
        alignItems: 'center',
        width:'90%',
        borderWidth:1,
        borderColor:'black',
        borderRadius:10,
        marginVertical:5
    },
    chooseImageButtonView: {
        minWidth:100,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        borderWidth:1,
        backgroundColor:'#7752ff',
        minHeight:35,
        marginVertical:3
    },
    imageChosen: {
        marginTop:'2%',
        resizeMode:'stretch'
    },
    buttonText: {
        fontSize:24,
        textAlign:'center',
        marginHorizontal:'2%',
        color:'white'
    },
});

export default connect(null, { addPlace })(AddPlace);
