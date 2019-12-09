import React from 'react';
import { Text, View, TouchableOpacity, TextInput, Dimensions, Keyboard, StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation';

class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.email = React.createRef();
        this.password = React.createRef();
        this.confirmPassword = React.createRef();
        this.state = {
            mainViewPadding:0,
            inputViewStyle: Dimensions.get('screen').height > Dimensions.get('screen').width
                ? styles.inputViewPortrait
                : styles.inputViewLandscape
        };
        this.orientationHandler = (dims) => {
            this.setState({ inputViewStyle: dims.screen.height > dims.screen.width
                ? styles.inputViewPortrait
                : styles.inputViewLandscape })
        };
        this.keyboardShowHandler = () => {
            this.setState({mainViewPadding:'40%'});
        };
        this.keyboardHideHandler = () => {
            this.setState({mainViewPadding:0});
        };
        Dimensions.addEventListener('change', this.orientationHandler);
        Keyboard.addListener('keyboardWillShow', this.keyboardShowHandler);
        Keyboard.addListener('keyboardWillHide', this.keyboardHideHandler);
    }

    onReturnHandler = () => {
        Navigation.pop(this.props.componentId);
    }

    onSignupHandler = () => {
        //signup logic
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.orientationHandler);
        Keyboard.removeListener('keyboardWillShow', this.keyboardShowHandler);
        Keyboard.removeListener('keyboardWillHide', this.keyboardHideHandler);
    }

    render() {
        return (
            <View style={[styles.mainView, { paddingBottom:this.state.mainViewPadding }]}>
                <Text style={styles.loginText}> Sign Up </Text>
                <View style={this.state.inputViewStyle}>
                    <TextInput
                        placeholder='Email Address'
                        autoFocus={true}
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
                    <TextInput
                        placeholder='Confirm Password'
                        autoCapitalize='none'
                        autoCorrect={false}
                        ref={this.confirmPassword}
                        secureTextEntry={true}
                        style={styles.fieldInput}
                    />
                </View>
                <View style={styles.buttonsView}>
                    <TouchableOpacity onPress={this.onReturnHandler} style={styles.signInButton}>
                        <Text style={styles.whiteText}>Back to Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.onSignupHandler} style={styles.signUpButton} color='white'>
                        <Text style={styles.whiteText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
        height:'27%',
        fontSize:18,
        paddingHorizontal:'2%'
    },
    buttonsView: {
        marginTop:'2%',
        height:'8%',
        flexDirection:'row'
    },
    signInButton: {
        borderRadius:15,
        backgroundColor:'rgb(114,110,255)',
        width:'25%',
        justifyContent:'center',
        alignItems:'center',
        marginRight:'5%'
    },
    signUpButton: {
        borderRadius:15,
        backgroundColor:'rgb(150,100,200)',
        width:'25%',
        justifyContent:'center',
        alignItems:'center'
    },
    whiteText: {
        color: 'white',
        fontSize:18,
        textAlign:'center'
    }
});

export default SignUp;
