import { Dimensions } from 'react-native';

export const Screen = () => Dimensions.get('screen');

export const Window = () => Dimensions.get('window');

export const isPortrait = () => Dimensions.get('screen').height > Dimensions.get('screen').width;
