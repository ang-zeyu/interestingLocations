import React from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableWithoutFeedback, TouchableOpacity, Keyboard, TextInput, StyleSheet, Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { goToMain, signUpScreen } from '../navigation.js';

class Auth extends React.Component {

    constructor(props) {
        super(props);
        this.email = React.createRef();
        this.password = React.createRef();

        const isPortrait = Dimensions.get('screen').height > Dimensions.get('screen').width;
        this.state = { inputViewStyle: isPortrait ? styles.inputViewPortrait : styles.inputViewLandscape, mainViewPadding:0 };
        this.orientationHandler = (dims) => {
            this.setState({ inputViewStyle: dims.screen.height > dims.screen.width
                ? styles.inputViewPortrait
                : styles.inputViewLandscape })
        };
        this.keyboardShowHandler = () => {
            this.setState({mainViewPadding:'30%'});
        };
        this.keyboardHideHandler = () => {
            this.setState({mainViewPadding:0});
        };
        Dimensions.addEventListener('change', this.orientationHandler);
        Keyboard.addListener('keyboardWillShow', this.keyboardShowHandler);
        Keyboard.addListener('keyboardWillHide', this.keyboardHideHandler);
    }

    onLoginHandler = () => {
        goToMain();
    }

    onSignupHandler = () => {
        Navigation.push(this.props.componentId, signUpScreen({}));
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.orientationHandler);
        Keyboard.removeListener('keyboardWillShow', this.keyboardShowHandler);
        Keyboard.removeListener('keyboardWillHide', this.keyboardHideHandler);
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.mainView, { paddingBottom: this.state.mainViewPadding }]}>
                <Text style={styles.loginText}> Login To Continue  </Text>
                <View style={this.state.inputViewStyle}>
                    <TextInput
                        placeholder='Email Address'
                        autoCapitalize='none'
                        autoCorrect={false}
                        ref={this.email}
                        style={styles.fieldInput}
                    />
                    <TextInput
                        placeholder='Password'
                        autoCapitalize='none'
                        autoCorrect={false}
                        ref={this.password}
                        secureTextEntry={true}
                        style={styles.fieldInput}
                    />
                </View>
                <View style={styles.buttonsView}>
                    <TouchableOpacity onPress={this.onLoginHandler} style={styles.signInButton}>
                        <Text style={styles.whiteText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.onSignupHandler} style={styles.signUpButton} color='white'>
                        <Text style={styles.whiteText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    mainView: {
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:'5%',
        flex:1
    },
    loginText: {
        fontSize:28,
        fontWeight:'bold',
        textAlign:'center'
    },
    inputViewPortrait: {
        marginVertical: 5,
        width:'100%',
        borderColor:'rgba(20,20,100,0.3)',
        borderRadius:20,
        borderWidth:1,
        backgroundColor:'rgba(220,220,220,0.2)',
        paddingTop:'1%',
        paddingHorizontal:'2%',
        height:'25%',
        justifyContent:'center'
    },
    inputViewLandscape: {
        marginVertical: 5,
        width:'100%',
        borderColor:'rgba(20,20,100,0.3)',
        borderRadius:20,
        borderWidth:1,
        backgroundColor:'rgba(220,220,220,0.2)',
        padding:'1%',
        paddingBottom:'3%',
        height:'40%',
        justifyContent:'center'
    },
    fieldInput: {
        backgroundColor: 'rgba(222,222,222,0.5)',
        marginVertical:3,
        borderRadius:10,
        height:'40%',
        fontSize:20,
        padding:'2%'
    },
    buttonsView: {
        marginTop:'2%',
        height:'8%',
        flexDirection:'row'
    },
    miscView: {
        flex:1
    },
    signInButton: {
        borderRadius:15,
        backgroundColor:'rgb(114,110,255)',
        width:'20%',
        justifyContent:'center',
        alignItems:'center',
        marginRight:'5%'
    },
    signUpButton: {
        borderRadius:15,
        backgroundColor:'rgb(150,100,200)',
        width:'20%',
        justifyContent:'center',
        alignItems:'center'
    },
    whiteText: {
        color: 'white',
        fontSize:18
    }
});

export default connect()(Auth);
