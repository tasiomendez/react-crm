
export function download(data, isLoaded) {
    return {
        type: 'DOWNLOAD',
        data: data,
        visible: data,
        isLoaded: isLoaded,
    };
}

export function favourites(data) {
    return {
        type: 'FAVOURITES',
        data: data,
    };
}

export function select(index, data) {
    return {
        type: 'SELECT_VISIT',
        index: index,
        data: data,
    };
}

export function updateVisible(visible) {
    return {
        type: 'UPDATE_VISIBLE',
        visible: visible,
    };
}

export function error(error) {
    return {
        type: 'ERROR',
        error: error,
    };
}

export function salesmen(salesmen) {
    return {
        type: 'SALESMEN',
        salesmen: salesmen,
    };
}

export function customers(customers) {
    return {
        type: 'CUSTOMERS',
        customers: customers,
    };
}

export function expanded(key) {
    return {
        type: 'EXPANDED',
        key: key,
    };
}

export function reset() {
    return {
        type: 'RESET',
    };
}

