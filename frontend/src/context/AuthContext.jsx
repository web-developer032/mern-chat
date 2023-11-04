import { createContext, useContext, useReducer } from "react";
import { clearLocalStorage, getAccessToken, setAccessToken } from "@/utils/helpers";

const authActions = {
    SET_TOKEN: "SET_TOKEN",
    SET_USER: "SET_USER",
    DELETE_USER: "DELETE_USER",
};

const initialState = {
    token: getAccessToken(),
    user: null,
};

const reducer = (state, { type, payload }) => {
    switch (type) {
        case authActions.SET_TOKEN: {
            setAccessToken(payload);

            return {
                ...state,
                token: payload,
            };
        }

        case authActions.SET_USER: {
            return {
                ...state,
                user: { ...payload },
            };
        }

        case authActions.DELETE_USER: {
            clearLocalStorage();

            return {
                token: "",
                user: null,
            };
        }

        default:
            return state;
    }
};

export const AuthContext = createContext({
    authState: initialState,
    updateToken: () => {},
    updateUser: () => {},
    deleteUser: () => {},
});

export function AuthStateProvider({ children }) {
    const [authState, authDispatch] = useReducer(reducer, initialState);

    function updateToken(payload = "") {
        // console.log("UPDATE TOKEN CALLED: ", payload);
        authDispatch({ type: authActions.SET_TOKEN, payload });
    }

    function updateUser(payload = {}) {
        // console.log("UPDATE USER CALLED: ", payload);
        authDispatch({ type: authActions.SET_USER, payload });
    }


    function deleteUser() {
        // console.log("DELETE USER CALLED: ");
        authDispatch({ type: authActions.DELETE_USER });
    }

    return (
        <AuthContext.Provider
            value={{ authState, updateToken, updateUser,  deleteUser }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthState() {
    const authContext = useContext(AuthContext);

    return authContext;
}
