import firebase from "firebase/app";
require("firebase/auth");

// This is only for the database in the FE
require("firebase/database");

require("dotenv").config();

const config = {
  authDomain: process.env.REACT_APP_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECTID,
};

firebase.initializeApp(config);

export const db = firebase.database();
