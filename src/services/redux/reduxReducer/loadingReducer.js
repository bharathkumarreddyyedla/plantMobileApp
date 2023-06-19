import { ReduxLoadingConstants } from "../reduxConstants/constants"

const initialState = {
    loading: {
        status: false,
        text: '',
    },
    error: '',
    connection: {},
    apiMessage: '',
}

export const loadingReducers = (state = initialState, action) => {
    switch (action.type) {
        case ReduxLoadingConstants.SET_LOADING:
            return {
                ...state,
                loading: { status: action.payload.status, text: action.payload.text },
            }
        case ReduxLoadingConstants.SET_ERROR:
            return {
                ...state,
                error: action.payload,
            }
        case ReduxLoadingConstants.SET_INTERNET_CONNECTION:
            return {
                ...state,
                connection: action.payload,
            }
        case ReduxLoadingConstants.SET_API_MESSAGE:
            return {
                ...state,
                apiMessage: action.payload,
            }
        default:
            return state
    }
}
