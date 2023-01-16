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
  const [newUserError, setNewUserError] = useState<string | null>(null)
  const [newUserLoading, setNewUserLoading] = useState<boolean>(false)
  const [signInError, setSignInError] = useState<string | null>(null)
  const [signInLoading, setSignInLoading] = useState<boolean>(false)

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
    setNewUserLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setCurrentUser(userCredential.user)

        setNewUserLoading(false)
      })
      .catch((err) => {
        setNewUserError(err.code)
        setNewUserLoading(false)
      })
  }

  function signInWithEmail(email: string, password: string) {
    setSignInLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setCurrentUser(userCredential.user)
        setSignInLoading(false)
      })
      .catch((err) => {
        setSignInError(err.code)
        setSignInLoading(false)
      }
      )

  }


  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
    })
  }, [])

  return (
    <AuthContext.Provider value={{
      currentUser,
      cleanUser,
      signInWithGoogle,

      signInWithEmail,
      signInLoading,
      signInError,

      createUser,
      newUserError,
      newUserLoading
    }}>
      {children}
    </AuthContext.Provider>
  )
}