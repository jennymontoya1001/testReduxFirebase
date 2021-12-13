import { types } from '../types/types'

const initialState = {
    taks: [],
    active: {
        id: '',
        url: '',
        nombre: '',
        description: ''
    }
}

export const taksReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.taksAddNew:
            return {
                ...state,
                taks: [action.payload, ...state.taks]
            }

        case types.taksLoad:
            return {
                ...state,
                taks: [...action.payload]
            }

        case types.taksActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }
        default:
            return state
    }
}
