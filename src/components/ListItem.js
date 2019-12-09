import React from 'react';
import { Animated, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';

class ListItem extends React.Component {
    state = {
        slideFromLeftX: new Animated.Value(-100)
    }

    componentDidMount() {
        console.log('list item mounted');
        Navigation.events().
            registerBottomTabSelectedListener(({selectedTabIndex}) => {
                if (selectedTabIndex == 0) {
                    Animated.timing(this.state.slideFromLeftX,
                        {
                            toValue:0,
                            duration:300,
                            useNativeDriver:true
                        }
                    ).start();
                }
            });

    }

    render() {
        return <TouchableOpacity onPress={this.props.onItemPress}>
            <Animated.View
                style={[
                    styles.listItem,
                    {
                        transform:[{ translateX:this.state.slideFromLeftX }],
                        opacity:this.state.slideFromLeftX.interpolate({
                            inputRange: [-100, 0],
                            outputRange: [0.2, 1]
                        })
                    }
                ]}>
                <Image style={styles.placeImage} source={this.props.placeImage} />
                <Text>{this.props.placeName}</Text>
            </Animated.View>
        </TouchableOpacity>
    }
};

const styles = StyleSheet.create({
    listItem: {
        width: "100%",
        marginBottom: 5,
        padding: 8,
        backgroundColor: "#eee",
        flexDirection: 'row',
        alignItems:'center'
    },
    placeImage: {
        marginRight:8,
        height:30,
        width:30,
        resizeMode:'stretch'
    }
});

export default ListItem;
