import app from "firebase/compat/app";
import { firebaseConfig } from "./config";

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
  }
}

export const firebase = new Firebase();


