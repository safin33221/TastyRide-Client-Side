import React, { createContext, useState } from 'react';

import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateCurrentUser, updateProfile } from 'firebase/auth';
export const authContext = createContext(null)
import {auth} from '../Firebase/firebase.config.js';
const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)

    // Register User
    const CreateUserWithEmail = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //LogIn user
    const LoginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    //SignOut user
    const LogoutUser = () => {
        setLoading(true)
        return signOut(auth)
    }

    //update user profile 
    const UpdateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }


    const unsubcribe = onAuthStateChanged(auth, (currentUser => {
        console.log(currentUser);
        setUser(currentUser)
        setLoading(false)


        return () => { unsubcribe() }

    }))



    const authValue = {
        CreateUserWithEmail,
        LoginUser,
        LogoutUser,
        UpdateUserProfile

    }
    return (
        <authContext.Provider value={authValue}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;