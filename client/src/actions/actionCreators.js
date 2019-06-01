export const TEST = "TEST"
export const POPULATE_VENUE = "POPULATE_VENUE"
export const POPULATE_IDS = "POPULATE_IDS"
export const VENUE_DETAILS = "VENUE_DETAILS"
export const ASSIGN_SEARCH_INPUTS = "ASSIGN_SEARCH_INPUTS"


export function testing(){
    return {
        type:TEST,
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