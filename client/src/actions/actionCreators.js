export const TEST = "TEST"
export const POPULATE_VENUE = "POPULATE_VENUE"
export const POPULATE_IDS = "POPULATE_IDS"
export const VENUE_DETAILS = "VENUE_DETAILS"
export const ASSIGN_SEARCH_INPUTS = "ASSIGN_SEARCH_INPUTS"
export const REMOVE_EMPTY_VENUES = "REMOVE_EMPTY_VENUES"
export const GET_MAIN_VENUES = "GET_MAIN_VENUES"
export const GET_EXPLORE_VENUES = "GET_EXPLORE_VENUES"
export const GET_VENUES = "GET_VENUES"
export const GET_VENUE_DETAILS = "GET_VENUE_DETAILS"
export const SET_DETAIL_ID = "SET_DETAIL_ID"

export const SET_REDIRECT_STATE = "SET_REDIRECT_STATE"

export function setRedirectState(redirectState){
    return {
        type:SET_REDIRECT_STATE,
        redirectState: redirectState
    }
}

export function setDetailID(venue_id){
    return {
        type:SET_DETAIL_ID,
        venueDetailID: venue_id
    }
}

// export function getVenueDetails(venue_id){
//     return {
//         type:GET_VENUE_DETAILS,
//         venueDetailID: venue_id
//     }
// }

export function getExploreVenues(exploreVenues){
    return{
        type:GET_EXPLORE_VENUES,
        exploreVenues: exploreVenues
    }
}

export function getMainVenues(mainVenues){
    return{
        type:GET_MAIN_VENUES,
        mainVenues: mainVenues
    }
}

export function testing(){
    return {
        type:TEST,
    }
}

export function getVenues(searchVenuesArray){
    return {
        type: GET_VENUES,
        searchVenuesArray: searchVenuesArray
    }
}

export function assignSearchInputs(searchKey, searchLocation){
    return {
        type:ASSIGN_SEARCH_INPUTS,
        searchKey: searchKey,
        searchLocation: searchLocation
    }
}

export function populateVenue(listOfVenues){
    // debugger
    return {
        type: POPULATE_VENUE,
        venues:listOfVenues
    }
}

export function getVenueIds(listOfIds){
    return {
        type: POPULATE_IDS,
        venue_ids: listOfIds
    }
}


export function removeEmptyVenues(venue_id){
    return {
        type: REMOVE_EMPTY_VENUES,
        venue_id: venue_id
    }
}