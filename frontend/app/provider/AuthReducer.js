import React, { useState, useContext } from 'react';
import Cookies from 'js-cookie';

const ContxApp = React.createContext();
const ContxAppTgg = React.createContext();

export function useContxApp() {
    return useContext(ContxApp);
}

export function useContxAppTgg() {
    return useContext(ContxAppTgg);
}

export default function UserProvider({ children }) {
    const Iuser = () => {
        const cAuth = Cookies.get('ckt_tst');
        if (!cAuth) {
            return {
                isAuth: false,
                user: '',
                token: '',
                refresh: '',
            };
        } else {
            let cJSAuth = JSON.parse(cAuth);
            return {
                isAuth: true,
                user: cJSAuth.auth.user,
                token: cJSAuth.auth.token,
                refresh: cJSAuth.auth.refresh,
            };
        }
    };

    const [user, setUser] = useState(Iuser);

    function LoginDispacth(iData) {
        const cAuth = Cookies.get('ckt_tst');
        if (!cAuth) {
            Cookies.set('ckt_tst', JSON.stringify({ auth: iData }), { expires: 1 });
        }

        setUser({
            isAuth: true,
            user: iData.user,
            token: iData.token,
            refresh: iData.refresh,
        });
    }

    return (
        <ContxApp.Provider value={user}>
            <ContxAppTgg.Provider value={LoginDispacth}>{children}</ContxAppTgg.Provider>
        </ContxApp.Provider>
    );
}