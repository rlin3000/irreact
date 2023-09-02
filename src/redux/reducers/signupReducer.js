let user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user || null,
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false,
    error: null
    // isLoggedIn: user ? true : false
};

export default function signupReducer(state = initialState, action) {
    switch (action.type) {
        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                user: action.payload, //action.payload or action.data
                isLoggedIn: true,
            };
        case 'SIGNUP_FAILED':
            return {
                error: action.payload,
                isLoggedIn: false,
            };
        case 'INIT':
            return {
                ...initialState
            };
        default:
            return state;
    }
};