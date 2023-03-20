//import firebase from 'firebase';
import { app } from '../config/firebase.js'
import userAPI from "./userAPI.js"; 

import { getAuth, 
    createUserWithEmailAndPassword,
    sendPasswordResetEmail, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider,
    signInWithPopup } from "firebase/auth";

const auth = getAuth(app);
auth.useDeviceLanguage();
const googleProvider = new GoogleAuthProvider();



const authFirebase = {
    register: (email, password, name) => {
        return createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredencial) => {
            const user = userCredencial.user;
            console.log("USER AUTHENTICATED:");
            console.log(user);

            //CREATE USER ON DATABASE
            return userAPI.create(name, password, email, await user.getIdToken());
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log("ERRO AO CRIAR USUÁRIO: ERROR CODE:"+errorCode+" ERROR MESSAGE: "+errorMessage);

            return 0;
        })
    },
    singin: (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
        .then((userCredencial) => {
            const user = userCredencial.user;
            console.log("USER LOGGED:");
            console.log(user);
            return 200;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log("ERRO AO FAZER LOGIN: ERROR CODE:"+errorCode+" ERROR MESSAGE: "+errorMessage);
            return 0;
        })
    },
    singinWithGoogle: () => {
        signInWithPopup(auth, googleProvider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;

            console.log("USER CREATED W/ GOOGLE:");
            console.log(user)
            
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);

            console.log("ERRO AO FAZER LOGIN: ERROR CODE:"+errorCode+" ERROR MESSAGE: "+errorMessage);
        });
    },
    sendRecoverEmail: (email) => {
        return sendPasswordResetEmail(auth, email)
        .then(() => {
            return 200;
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("ERRO AO FAZER LOGIN: ERROR CODE:"+errorCode+" ERROR MESSAGE: "+errorMessage);
          });
        
    }
    
}

export default authFirebase;