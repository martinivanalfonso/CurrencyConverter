export const INITIAL_STATE = {
    input: 0,
    output: 0,
    options: [],
    base: '',
    error: '',
}

export const currencyReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'setOutput': 
            return {
                ...state,
                output: action.payload,
                error: ''
            }
        case 'setInput': 
            return {
                ...state,
                input: action.payload
            }
        case 'setOptions': 
            return {
                ...state,
                options: action.payload
            }
        case 'setBase': 
            return {
                ...state,
                base: action.payload
            }
        case 'setError': 
            return {
                ...state,
                error: action.payload
            }
        default:
        return {
            ...state
        }
    }
}