import React from "react";
import { db, auth } from "../../services/firebase";
import { useHistory } from "react-router-dom";

export const UserContext = React.createContext({
  user: null,
  isLoggedIn: false,
});

const UserProvider = ({ children }) => {
  const history = useHistory();
  const [loading, setLoading] = React.useState();
  const [user, setUser] = React.useState({
    name: null,
    isLoggedIn: false,
    email: null,
    uid: null,
  });

  async function validateChat(chatID) {
    const chatRef = db.ref("chats").child(chatID).child("members");
    console.log("validating chat...");
    await chatRef.on("value", (snapshot) => {
      if (snapshot.exists() && snapshot.val().includes(user.id)) {
        console.log("User has logged in");
      } else {
        history.push("/login");
      }
    });
  }

  async function addUser(name) {
    const userKey = db.ref("users").push().getKey();
    const chatRef = db.ref("chats").child("main");
    const userRef = db.ref("users").child(userKey);
    const info = {
      name: name,
      createdDate: Date.now(),
      isLoggedIn: true,
      currentChat: "main",
      id: userKey,
    };

    await chatRef.child("members").push(userKey);
    await userRef.set(info);
    setUser(info);
    localStorage.setItem("currentUser", userKey);
    history.push(`/dashboard`);
  }

  async function fetchUser(id) {
    await db
      .ref("users")
      .child(id)
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          setUser(snapshot.val());
        }
      });

    await db
      .ref("users")
      .child(id)
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          setUser(snapshot.val());
        }
      });
  }

  React.useState(() => {
    const unlisten = auth().onAuthStateChanged((profile) => {
      if (profile) {
        setUser({
          isLoggedIn: true,
          email: profile.email,
          name: profile.displayName,
          uid: profile.uid,
        });
        setLoading(false);
      } else {
        setUser({ name: null, isLoggedIn: false, email: null, uid: null });
        setLoading(false);
      }
    });
    return () => {
      unlisten();
    };
  }, [user.isLoggedIn]);

  return (
    <UserContext.Provider value={{ user, validateChat }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
