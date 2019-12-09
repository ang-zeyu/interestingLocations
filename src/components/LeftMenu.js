import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Navigation } from 'react-native-navigation';

class LeftMenu extends React.Component {
    render() {
        return (
            <View style={styles.menuView}>
                <Text style={styles.menuTitle}>Interesting Places</Text>
                <TouchableOpacity onPress={() => {console.log('clicked');}}>
                    <View style={styles.menuItem}>
                        <Image style={styles.menuItemIcon} source={this.props.logoutIcon} />
                        <Text style={styles.menuItemText}>Sign Out</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    menuView: {
        flex:1,
        marginTop:'8%'
    },
    menuTitle: {
        fontSize:28,
        fontWeight:'bold',
        color: 'rgba(155,155,155,0.8)',
        marginBottom:'2%'
    },
    menuItem: {
        paddingVertical:3,
        flexDirection:'row'
    },
    menuItemIcon: {
        width:25,
        height:25,
        marginHorizontal:'2%'
    },
    menuItemText: {
        fontSize:18
    }
});

export default LeftMenu;
