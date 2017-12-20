import { combineReducers } from 'redux';

/**
 * Reducers
 */
function selectReducer(state = null, action) {
    switch(action.type) {
    case 'SELECT_VISIT':
        return action.data[action.index];
    case 'RESET':
        return null;
    default:
        return state;
    }
}

function dataReducer(state = [], action) {
    switch(action.type) {
    case 'DOWNLOAD':
        return action.data;
    case 'RESET':
        return [];
    default:
        return state;
    }
}

function searhReducer(state = [], action) {
    switch(action.type) {
    case 'DOWNLOAD':
        return action.visible;
    case 'UPDATE_VISIBLE':
        return action.visible;
    case 'RESET':
        return [];
    default:
        return state;
    }
}

function isLoadedReducer(state = false, action) {
    switch(action.type) {
    case 'DOWNLOAD':
        return action.isLoaded;
    case 'ERROR':
        return true;
    case 'RESET':
        return false;
    default:
        return state;
    }
}

function errorReducer(state = false, action) {
    switch(action.type) {
    case 'ERROR':
        return action.error;
    case 'RESET':
        return false;
    default:
        return state;
    }
}

function favouritesReducer(state = [], action) {
    switch(action.type) {
    case 'FAVOURITES':
        return action.data;
    default:
        return state;
    }
}

function salesmenReducer(state = [], action) {
    switch(action.type) {
    case 'SALESMEN':
        return action.salesmen;
    default:
        return state;
    }
}

function customersReducer(state = [], action) {
    switch(action.type) {
    case 'CUSTOMERS':
        return action.customers;
    default:
        return state;
    }
}

function expandedReducer(state = null, action) {
    switch(action.type) {
    case 'EXPANDED':
        return action.key;
    case 'SELECT_VISIT':
        return null;
    default:
        return state;
    }
}

/**
 * Export GlobalState
 */
const GlobalState = combineReducers({
    data: dataReducer,
    visible: searhReducer,
    isLoaded: isLoadedReducer,
    selected: selectReducer,
    error: errorReducer,
    favourites: favouritesReducer,
    salesmen: salesmenReducer,
    customers: customersReducer,
    expanded: expandedReducer,
});

export default GlobalState;
