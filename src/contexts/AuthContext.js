import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'



const AuthContext = React.createContext()

// console.log('auth', auth.createUserWithEmailAndPassword())

export function useAuth() {
    const context = useContext(AuthContext)
    console.log(context)
    return context;
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, password) { 
        //not a function error --> until i fixed firebase.js
        return auth.createUserWithEmailAndPassword(email, password)
    }

    useEffect(() =>{
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })
        return unsubscribe
    }, [])


    const value = {
        currentUser,
        signup
    }

  return (
   <AuthContext.Provider value={value}>
    {!loading && children}
   </AuthContext.Provider>
  )
}
