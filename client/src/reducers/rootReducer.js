import {
    TEST,
    POPULATE_VENUE,
    POPULATE_IDS,
    VENUE_DETAILS

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
        default:
            return state;
    }
}