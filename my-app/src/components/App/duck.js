const initialState = {
    isTabActive: true
};

export const appReducer = (state = initialState, action) => {
    if (action.type === "SET_IS_TAB_ACTIVE") {
        return {...state, isTabActive: action.payload}
    }
    return state;
}

export const setIsTabActive = (payload) => {
    return { type: "SET_IS_TAB_ACTIVE", payload }
};