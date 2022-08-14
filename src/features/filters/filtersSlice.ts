// @ts-nocheck

const initialState = {
    filters: {
        status: 'All',
        colors: []
    }
}

// Use the initialState as a default value
export default function filtersReducer(state = initialState, action: any) {
    // The reducer normally looks at the action type field to decide what happens
    switch (action.type) {
        case 'filters/statusFilterChanged': {
            return {

                // copy the other filter fields
                ...state,
                // And replace the status field with the new value
                status: action.payload
            }
        }
        default:
            // If this reducer doesn't recognize the action type, or doesn't
            // care about this specific action, return the existing state unchanged
            return state
    }
}