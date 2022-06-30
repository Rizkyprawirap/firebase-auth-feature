import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  GithubAuthProvider,
  FacebookAuthProvider,
  signInWithRedirect} from "firebase/auth";
import { auth } from '../firebase-config'

export const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) throw new Error("There is no authentication provider!");   
    return context;
}

export function AuthProvider ({children}) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signup = async (email, password) => await createUserWithEmailAndPassword(auth, email, password);

    const login = async (email, password) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log(userCredential)
    }

    const logout = () => signOut(auth);

    const loginWithGoogle = async () => {
        const googleProvider = new GoogleAuthProvider();
        // console.log(googleProvider)
        return signInWithPopup(auth, googleProvider);
    }

    const loginWithGithub = async () => {
        const githubProvider = new GithubAuthProvider();
        // console.log(githubProvider)
        return signInWithPopup(auth, githubProvider);
    }

    const loginWithFaceBook = async () => {
        const facebookProvider = new FacebookAuthProvider();
        // console.log(facebookProvider)
        return signInWithPopup(auth, facebookProvider);
    }

    const resetPassword = (email) => sendPasswordResetEmail(auth, email);

    useEffect(() => {
        console.log('auth provider loaded');
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            // console.log(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [])

    return (
        <authContext.Provider value={{
            signup, login, user,
            logout, loading, loginWithGoogle,
            loginWithGithub, loginWithFaceBook,
            resetPassword}}>
            {children}
        </authContext.Provider>
    );
}