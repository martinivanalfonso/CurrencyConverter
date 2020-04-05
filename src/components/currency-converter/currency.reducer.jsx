export const INITIAL_STATE = {
  input: '',
  output: '',
  options: [],
  outputBase: "",
  error: "",
};

export const currencyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "setOutput":
      return {
        ...state,
        output: action.payload,
        error: "",
      };
    case "setInput":
      return {
        ...state,
        input: action.payload,
      };
    case "setOptions":
      return {
        ...state,
        options: action.payload,
      };
    case "setOutputBase":
      return {
        ...state,
        outputBase: action.payload,
      };
    case "setError":
      return {
        ...state,
        error: action.payload,
        output: "",
      };
    default:
      return {
        ...state,
      };
  }
};
