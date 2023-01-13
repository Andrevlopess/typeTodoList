import { GoogleAuthProvider, signInWithPopup, User, signOut } from "firebase/auth";
import { createContext, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Services/Firebase";
import { AuthContextType } from "../../types/Task";

export const AuthContext = createContext<AuthContextType | null>(null);


export const AuthProvider = ({children}: { children: JSX.Element}) => {
    
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

      useEffect(()=>{
        auth.onAuthStateChanged((user) =>{
         setCurrentUser(user)
        })
      },[])
      
    return(
        <AuthContext.Provider value={{currentUser, cleanUser,  signInWithGoogle}}>
            {children}
        </AuthContext.Provider>
    )
}