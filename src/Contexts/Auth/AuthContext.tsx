import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  signOut,
  getAuth
} from "firebase/auth";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Services/Firebase";
import { AuthContextType } from "../../types/Task";

export const AuthContext = createContext<AuthContextType | null>(null);


export const AuthProvider = ({ children }: { children: JSX.Element }) => {

  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const navigate = useNavigate()

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        setCurrentUser(result.user);
      }).catch((error) => {
        console.log(error);
      });
  }

  const cleanUser = () => {
    auth.signOut()
    navigate('/')
  }

  function createUser(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);

      })
      .catch((err) => console.log(err))
  }

  function signInWithEmail(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((err) => {
        const errCode = err.code
        console.log(errCode);
        
        switch (errCode) {
          case 'auth/wrong-password':
            console.log('senha errada patrao');
            break;    
          case 'auth/invalid-email':
            console.log('email invalido filho');
            break;    
       }
      })

  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
    })
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser, cleanUser, signInWithGoogle, createUser, signInWithEmail }}>
      {children}
    </AuthContext.Provider>
  )
}