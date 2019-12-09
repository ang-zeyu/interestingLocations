import React from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { FlatList, StyleSheet} from 'react-native';
import ListItem from './ListItem';
import { deletePlace } from '../store/actions/places.js';

const styles = StyleSheet.create({
    listContainer: {
        width: "100%"
    }
});



class PlaceList extends React.Component {
    keyHash = {}

    render() {
        return (
            <FlatList
                style={styles.listContainer}
                data={this.props.places.map(p => ({ key: keyGen(p.placeName, this.keyHash), place:p }))}
                renderItem={({item, index, seperator}) => {
                    return <ListItem
                        key={item.key}
                        placeName={item.place.placeName}
                        placeImage={item.place.placeImage}
                        onItemPress={() => {
                            Navigation.push(
                                this.props.componentId,
                                {
                                    component: {
                                        name: 'viewPlaceDetail',
                                        passProps: {
                                            image: item.place.placeImage,
                                            description: item.place.placeName,
                                            position: item.place.placeLocation
                                        },
                                        options: {
                                            topBar: {
                                                visible:true,
                                                title: {
                                                    text:item.place.placeName,
                                                    fontSize:24,
                                                    color:'rgb(55,55,155)',
                                                }
                                            }
                                        }
                                    }
                                }
                            );
                        }
                        }
                    />
                }}
            />
        );
    }
}

const keyGen = (placename, hashset) => {
    let sum = 0;
    const charArray = placename
        ? placename.split('').forEach(c => { sum += c.charCodeAt(0); })
        : Math.random();
    while (hashset[sum]) {
        sum += (sum % 7);
    }
    hashset[sum] = true;
    return sum + '';
}

const mapStateToProps = (state, props) => {
    return {
        places: state.placesReducer
    };
}

export default connect(mapStateToProps, { deletePlace })(PlaceList);
