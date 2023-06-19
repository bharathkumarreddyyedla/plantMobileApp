import { ReduxLoadingConstants } from "../reduxConstants/constants"


export const setLoading = (status, text = '') => {
    return dispatch => {
        dispatch({ type: ReduxLoadingConstants.SET_LOADING, payload: { status: status, text: text } })
    }
}
export const setError = data => {
    return dispatch => {
        dispatch({ type: ReduxLoadingConstants.SET_ERROR, payload: data })
    }
}
export const checkInternetConnection = data => {
    return dispatch => {
        dispatch({ type: ReduxLoadingConstants.SET_INTERNET_CONNECTION, payload: data })
    }
}
export const setApiMessage = data => {
    return dispatch => {
        dispatch({ type: ReduxLoadingConstants.SET_API_MESSAGE, payload: data })
    }
}
