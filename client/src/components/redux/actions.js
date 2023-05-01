import { GET_ALL_COUNTRIES } from "./actionType"
import axios from "axios";


export function getAllCountries() {
    return async (dispatch) => {
        try {
            const results = await axios.get("http://localhost:3001/country")
            dispatch({ type: GET_ALL_COUNTRIES, payload: results.data})
        } catch (error) {
            console.log("error", error.message);
        }
    }
}