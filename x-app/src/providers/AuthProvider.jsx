import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
    const [auth, setAuth] = useState(false);
    const [authUser, setAuthUser] = useState({});
    const api = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            (async () => {
                const res = await fetch(`${api}/verify`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (res.ok) {
                    const user = await res.json();
                    setAuth(true);
                    setAuthUser(user);
                }
            })();
        }
    }, [])

    return <AuthContext.Provider value={{ auth, setAuth, authUser, setAuthUser }}>
        {children}
    </AuthContext.Provider>
}