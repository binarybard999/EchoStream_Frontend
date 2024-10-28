import { createContext, useContext, useState } from 'react';

const IsLoginContext = createContext();

export const IsLoginProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false); // Initially set to false

    // Function to set the login state
    const setLoginState = (value) => {
        setIsLogin(value);
    };

    return (
        <IsLoginContext.Provider value={{ isLogin, setLoginState }}>
            {children}
        </IsLoginContext.Provider>
    );
};

export const useIsLogin = () => useContext(IsLoginContext);