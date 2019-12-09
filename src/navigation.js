import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

export const goToAuth = () => {
    Navigation.setRoot({
        root: {
            stack: {
                children:[
                    {
                        component: {
                            name:'authScreen'
                        }
                    }
                ]
            }
        }
    });
}

export const signUpScreen = (props) => ({
    component: {
        name:'signUpScreen',
        passProps: props
    }
});

export const goToMain = async () => {
    console.log('setting root to main');
    try {
        const placesImage = await Icon.getImageSource('md-map', 30);
        const addPlaceImage = await Icon.getImageSource('md-locate', 30);
        const logoutIcon = await Icon.getImageSource('md-log-out', 20);
        console.log('images fetched');
        Navigation.setRoot({
            root: {
                sideMenu: {
                    left: {
                        component: {
                            name: 'leftMenu',
                            passProps: {
                                logoutIcon: logoutIcon
                            }
                        }
                    },
                    center: {
                        bottomTabs: {
                            children: [
                                {
                                    stack: {
                                        children: [
                                            {
                                                component: {
                                                    name: 'viewPlaces',
                                                    options: {
                                                        topBar: {
                                                            visible:true,
                                                            title: {
                                                                text:'All Places',
                                                                fontSize:24,
                                                                color:'rgb(55,55,155)',
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        ],
                                        options: {
                                            bottomTab: {
                                                icon: placesImage,
                                                selectedIconColor: 'blue',
                                                text: 'Places'
                                            }
                                        }
                                    }
                                },
                                {
                                    component: {
                                        name: 'addPlace',
                                        options: {
                                            bottomTab: {
                                                icon: addPlaceImage,
                                                selectedIconColor: 'blue',
                                                text: 'Add Place'
                                            }
                                        }
                                    }
                                }
                            ],
                            options: {
                                bottomTabs: {
                                    visible: true,
                                    currentTabIndex: 1,
                                    animate: true
                                }
                            }
                        }
                    },
                    options: {
                        sideMenu: {
                            left: {
                                width:270
                            }
                        }
                    }
                }
            }
        });
        console.log('root set to main');
    } catch (err) {
        console.log(err);
    }
}
