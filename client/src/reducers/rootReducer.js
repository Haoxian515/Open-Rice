import {
    TEST,
    POPULATE_VENUE,
    POPULATE_IDS,
    VENUE_DETAILS,
    ASSIGN_SEARCH_INPUTS,
    REMOVE_EMPTY_VENUES,
    GET_VENUES

} from "../actions/actionCreators";


const initialState = {
    test:"hello TEST",
    venues:[],
    venue_ids:[]
}

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case TEST:{
            let newState = {...state}
            newState.test = "hello test works!"
            return newState;
        };
        case GET_VENUES:{
            let newState = {... state}
            let searchVenuesArray = action.searchVenuesArray
            return {
                ...newState,
                searchVenuesArray: searchVenuesArray
            }
        };
        case ASSIGN_SEARCH_INPUTS:{
            let newState = {... state}
            let searchKey = action.searchKey
            let searchLocation = action.searchLocation
            return {
                ...newState,
                searchKey: searchKey,
                searchLocation: searchLocation
            }
        };
        case POPULATE_VENUE:{
            let newState = {...state}
            let newArr = action.venues;
            // debugger
            return {
                ...newState,
                // venues:[...newState.venues, ...newArr]
                venues: newArr
            }
        };
        case POPULATE_IDS:{
            let newState = {...state}
            let newArr = action.venue_ids;
            // debugger
            return {
                ...newState,
                // venues:[...newState.venues, ...newArr]
                venue_ids: newArr
            }
        };
        case VENUE_DETAILS:{
            let newState = {...state}
            let newObj = action.venue_details;
            // debugger
            return {
                ...newState,
                venue_details: newObj
            }
        };
        case REMOVE_EMPTY_VENUES:{
            let newState = {...state}
            let idToRemove = action.venue_id
            let newArr = newState.filter(currVenue => currVenue.venue_id != idToRemove)
            return {
                ...newState,
                venue_ids: newArr
            }
        }
        default:
            return state;
    }
}