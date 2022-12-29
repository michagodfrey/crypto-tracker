import React, { useState, useEffect, createContext, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "./firebase-config";
import { doc, getDoc } from "@firebase/firestore";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [ user, setUser ] = useState({});

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            try {
                getUser(currentUser.uid);
            } catch (error) {
                console.log(error.message);
            }
        });
    }, []);

    const getUser = async (uid) => {
        const userDoc = doc(db, "users", uid);
        try {
            const userSnap = await getDoc(userDoc);
            if (userSnap.exists()) {
                localStorage.setItem("userName", userSnap.data().name);
                localStorage.setItem("userEmail", userSnap.data().email);
                localStorage.setItem("userImg", userSnap.data().image);
            } else {
                console.log("User doc not found");
            }
        } catch (error) {
            console.log(error.message);
        }
        
    };

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}