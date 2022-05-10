import { loginType, userSessionType } from "../interface/session";

export const userSignup = (data: userSessionType) => {
    if (typeof window !== 'undefined') {
        window.localStorage.setItem('user_data', JSON.stringify(data));
        userLogin(data);
        window.location.href = '/';
    }
}

export const userLogin = (data: loginType) => {
    if (typeof window !== 'undefined') {
        window.localStorage.setItem('session', JSON.stringify(data));
        window.location.href = '/';
    }
}

export const userLogout = () => {
    if (typeof window !== 'undefined') {
        window.localStorage.removeItem('session');
        window.location.href = '/login';
    }
}

export const getSignedupData = () => {
    let userSession: userSessionType | undefined;
    if (typeof window !== 'undefined') {
        let data = window.localStorage.getItem('user_data');
        if (data) {
            let parsedData = JSON.parse(data);
            
            if (parsedData && parsedData.email) {
                userSession = parsedData;
            }   
        } 
    }
    return userSession || null;
}

export const getUserSession = () => {
    let userSession: userSessionType | undefined;
    if (typeof window !== 'undefined') {
        let data = window.localStorage.getItem('session');
        if (data) {
            let parsedData = JSON.parse(data);
            
            if (parsedData && parsedData.email) {
                userSession = parsedData;
            }   
        } else {
            window.location.href = "/login"
        }
    }
    return userSession || null;
}