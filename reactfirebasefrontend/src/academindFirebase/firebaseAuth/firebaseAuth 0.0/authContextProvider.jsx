import React, { createContext, useState, useEffect, useCallback } from 'react'

let logOutTime;
let logOutTimer;

export const AuthContext = createContext({
    token: '',
    isLoggedIn: false,
    logIn: (token, ) => { },
    logOut: () => { },
})

const calculateSessionTime = (expirationTime) => {
    const currentTime = () => {
        new Date().getTime();
    }
    const adjustTime = () => {
        new Date(expirationTime).getTime();
    }
    const remainingTime = adjustTime - currentTime
    return remainingTime;
}

const retriveStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    const storedExpirationTime = localStorage.getItem('expirationTime');
    const remainingTime = calculateSessionTime(storedExpirationTime)
    if (remainingTime <= 3600) {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        return null;
    }
    return {
        token: storedToken,
        duration: remainingTime,
    }
}

const AuthContextProvider = (props) => {
    const storedData = retriveStoredToken();
    let initialData;
    if (storedData) {
        initialData = storedData.token;
    }
    const [token, setToken] = useState(initialData);
    const isLoggedIn = !!token;

    const logoutHandler = useCallback(() => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        if (logOutTime) {
            clearTimeout(logOutTimer)
        }
    }, []);

    const logInHandler = (token, expirationTime) => {
        setToken(token)
        localStorage.setItem('token', token);
        localStorage.setItem('expirationTime', expirationTime);
        const remainingTime = calculateSessionTime(expirationTime);
        logOutTime = setTimeout(logoutHandler, remainingTime);
    }

    useEffect(() => {
        if (storedData) {
            logOutTimer = setTimeout(logoutHandler, storedData.duration)
        }
    }, [storedData, logoutHandler])

    const authContext = {
        token: token,
        isLoggedIn: isLoggedIn,
        logIn: logInHandler,
        logOut: logoutHandler,
    }
    return (
        <AuthContext.Provider value={authContext} >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider