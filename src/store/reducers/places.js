import placesTypes from '../actions/places';

const initialPlaces = [];

const placesReducer = (prevState = initialPlaces, action) => {
    switch (action.type) {
        case placesTypes.ADD_PLACE:
            return [...prevState, action.payload];
            break;
        case placesTypes.DELETE_PLACE:
            return prevState.filter(place => place.placeName !== action.payload.placeName);
            break;
        default:
            return prevState;
    }
};

export default placesReducer;
