import firebase from "firebase/app";
require("firebase/auth");

// This is only for the database in the FE
require("firebase/database");

require("dotenv").config();

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECTID,
};

firebase.initializeApp(config);

export const db = firebase.database();
export const auth = firebase.auth;

// ############### AUTH ACTIONS ##################

export const signin = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
};

export const signout = async () => {
  return auth().signOut();
};

export const signup = async (email, password, name) => {
  return auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async (res) => {
      await db.ref("chats/main").child("members").update({ id: res.user.uid });
      await db
        .ref("users")
        .child(res.user.uid)
        .set({
          id: res.user.uid,
          email: res.user.email,
          name: name,
          isOnline: true,
          photoURL: `https://ui-avatars.com/api/?background=random&name=${name}&format=png`,
        });
    });
};
