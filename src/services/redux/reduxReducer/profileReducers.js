import { ReduxProfileConstants } from '../reduxConstants/constants'

const initialState = {
    profile: {},
}

export const profileReducers = (state = initialState, action) => {
    switch (action?.type) {
        case ReduxProfileConstants?.SET_PROFILE:
            return {
                ...state,
                profile: action.payload,
            }
            default:
            return state
        }
    }