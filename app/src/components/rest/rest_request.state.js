const restActionsSetRequestMethod = 'WEB_API_SET_REQUEST_METHOD';
const restActionsSetRequestEndpoint = 'WEB_API_SEAD_REQUEST_ENDPOINT';
const restActionsAddRequestHeader = 'WEB_API_ADD_REQUEST_HEADER';
const restActionsSetResponse = 'WEB_API_SET_RESPONSE';

const restRequestInitialState = {    
    request: {
        method: 0,
        endpoint: 'https://restcountries.eu/rest/v2/capital/sofia',
        headers: {},
        body: ''
    },
    response: {
        statusCode: -1,
        headers: '',
        content: ''
    }
};

const electron = window.require("electron")
const rest = electron.remote.require('./main/rest');

export const RestReducer = (state, action) => {
    const newState = state || restRequestInitialState;

    if (action.type === restActionsSetRequestMethod) {
        return {
            ...newState, 
            request: {
                ...newState.request,
                method: action.payload
            }
        };
    }
    if (action.type === restActionsSetRequestEndpoint) {
        return {
            ...newState, 
            request: {
                ...newState.request,
                endpoint: action.payload
            }
        };
    }
    if (action.type === restActionsAddRequestHeader) {
        return {
            ...newState, 
            request: {
                ...newState.request,
                headers: {
                    ...newState.request.headers,
                    [action.payload.name]: action.payload.value
                }
            }
        };
    }

    if (action.type === restActionsSetResponse) {
        const { headers } = action.payload;
        const headersDisplay = Object.keys(headers).map(key => `${key}: ${headers[key]}`).join('\n');

        return {
            ...newState, 
            response: {
                ...action.payload,
                headers: headersDisplay
            }
        };
    }

    return newState;
};

export const restActions = {
    setMethod: (method) => (dispatch) => {
        dispatch({ type: restActionsSetRequestMethod, payload: method });
    },
    setEndPoint: (endpoint) => (dispatch) => {
        dispatch({ type: restActionsSetRequestEndpoint, payload: endpoint.trim() });
    },
    execute: () => async (dispatch, getState) => {
        const { request } = getState().restCall;
        // Set empty response to clean output
        dispatch({ type: restActionsSetResponse, payload: restRequestInitialState.response });
        const response = await rest.get(request);
        dispatch({ type: restActionsSetResponse, payload: response });
    }
};
