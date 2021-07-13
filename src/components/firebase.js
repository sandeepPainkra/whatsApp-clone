import firebase from "firebase";

const firebaseConfig = {
   apiKey: "AIzaSyACW3RhQQOK9ipQ_MRkZwnu82C-W3quFS0",
   authDomain: "whatsapp-clone-89b3f.firebaseapp.com",
   projectId: "whatsapp-clone-89b3f",
   storageBucket: "whatsapp-clone-89b3f.appspot.com",
   messagingSenderId: "607745014138",
   appId: "1:607745014138:web:87de059387bc1341b83ec3",
   measurementId: "G-PPFBED9F0F",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export default db;
export { auth, provider };
