import React, { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);


    // Load user from localStorage when app starts
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);


    const login = async (email, password) => {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                throw new Error('Login failed');
            }

            const data = await res.json();
            setUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('token', data.token);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const signup = async (email, password) => {
        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                throw new Error('Signup failed');
            }

            const data = await res.json();
            setUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));
        } catch (error) {
            console.error(error);
            throw error;
        }
    };


    //Clears user from memory and localstorage
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


