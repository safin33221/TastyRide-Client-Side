import React, { createContext, useEffect, useState } from 'react';

import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateCurrentUser, updateProfile } from 'firebase/auth';
export const authContext = createContext(null)
import { auth } from '../Firebase/firebase.config.js';
import useAxiosPublic from '../Hooks/useAxiosPublic.jsx';
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isNotificationOpen, setIsNotificationOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const axiosPublic = useAxiosPublic()

    // Register User
    const CreateUserWithEmail = (email, password) => {
        setIsLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //LogIn user
    const LoginUser = (email, password) => {
        setIsLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    //SignOut user
    const LogoutUser = () => {
        return signOut(auth)
    }

    //update user profile 
    const UpdateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }

    // Sign in user with google
    const SignInWithGoogle = () => {
        setIsLoading(true)
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    }

    //Reset Passwords
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser => {
            if (currentUser) {
                setUser(currentUser)
                setIsLoading(false)
                console.log(currentUser);
                const userinfo = { email: currentUser?.email }
                axiosPublic.post('/jwt', userinfo)
                    .then(res => {
                        console.log(res);
                        if (res?.data) {
                            const token = res?.data
                            localStorage.setItem('token', token)
                        }
                    })
            } else {
                setUser(currentUser)
                setIsLoading(false)
                localStorage.removeItem('token')
            }








        }))
        return () => {
            unsubscribe()
        }
    }, [])



    const authValue = {
        isNotificationOpen,
        isLoading,
        user,
        CreateUserWithEmail,
        LoginUser,
        LogoutUser,
        UpdateUserProfile,
        resetPassword,
        SignInWithGoogle,
        setIsNotificationOpen,
    }
    return (
        <authContext.Provider value={authValue}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;