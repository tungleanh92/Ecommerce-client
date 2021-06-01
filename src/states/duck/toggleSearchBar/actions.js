import * as constants from './constants'

export const openSearchBar = () => {
    return {
        type: constants.OPEN_SEARCH_BAR,
    }
}

export const closeSearchBar = () => {
    return {
        type: constants.CLOSE_SEARCH_BAR,
    }
}