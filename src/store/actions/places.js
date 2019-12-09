const placesActionTypes = {
    ADD_PLACE: 'ADD_PLACE',
    DELETE_PLACE: 'DELETE_PLACE'
};

export const addPlace = (name, image, location) => {
    return async (dispatch, state) => {

        // type: placesActionTypes.ADD_PLACE,
        try {
            const payload = {
                placeName: name,
                placeImage: image,
                placeLocation: location
            }

            const responseStream = await fetch("https://rnn-maps-test-1559407056507.firebaseio.com/places.json",
                { method:'POST', body:JSON.stringify(payload) });
            const responseJson = await responseStream.json();
            console.log(responseJson);
        } catch (err) {
            console.log(err);
        }
    };
};

export const deletePlace = (name) => {
    return {
        type: placesActionTypes.DELETE_PLACE,
        payload: {
            placeName: name
        }
    };
};

export default placesActionTypes;
