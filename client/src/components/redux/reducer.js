import { GET_ALL_COUNTRIES } from "./actionType"

const initialState = {
    countries: [],
    allCountries: [],
    allActivities: [],
    filteredCountries: [],
    activities: [],
    lettersId: [],
    detail: [],
    pag: 1,
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_COUNTRIES:
            return {
                ...state,
                pag: 1,
                countries: action.payload,
                allCountries: action.payload,
                lettersId: action.payload
            }
        default:
            return { ...state };
    }
};

export default rootReducer;