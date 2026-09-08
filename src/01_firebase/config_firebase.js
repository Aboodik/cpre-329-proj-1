// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Swapped to a project we own (Phone + Email/Password enabled, SMS region
// policy allowed for India) — the original repo's project had no sign-in
// method turned on at all, so nothing here could ever authenticate.
const firebaseConfig = {
  apiKey: "AIzaSyArTIoDbEGGPGA4lXqmNBfpkYOeUBMacXk",
  authDomain: "proj-1-b0e3d.firebaseapp.com",
  projectId: "proj-1-b0e3d",
  storageBucket: "proj-1-b0e3d.firebasestorage.app",
  messagingSenderId: "925131875220",
  appId: "1:925131875220:web:c2a0bc5d27ab141144a581"
};

// Initialize Firebase
const firebase_app = initializeApp(firebaseConfig);

export default firebase_app