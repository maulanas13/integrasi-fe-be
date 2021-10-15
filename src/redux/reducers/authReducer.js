const INITIAL_STATE = {
    username: "",
    id: "",
    isVerified: "",
    role_id: 0,
    address: "",
    isLogin: false,
};

const AuthReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "LOGIN":
            return {...state, ...action.payload, isLogin: true};
        default:
            return state;
    };
};

export default AuthReducer;