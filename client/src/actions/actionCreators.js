export const TEST = "TEST"
export const POPULATE_VENUE = "POPULATE_VENUE"
export const POPULATE_IDS = "POPULATE_IDS"
export const VENUE_DETAILS = "VENUE_DETAILS"
export const ASSIGN_SEARCH_INPUTS = "ASSIGN_SEARCH_INPUTS"
export const REMOVE_EMPTY_VENUES = "REMOVE_EMPTY_VENUES"
export const GET_MAIN_VENUES = "GET_MAIN_VENUES"

export const GET_VENUES = "GET_VENUES"


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

export function getVenueDetails(venue_details){
    return {
        type: VENUE_DETAILS,
        venue_details: venue_details
    }
}

export function removeEmptyVenues(venue_id){
    return {
        type: REMOVE_EMPTY_VENUES,
        venue_id: venue_id
    }
}