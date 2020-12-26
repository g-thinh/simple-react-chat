import React from "react";
import { db } from "../../services/firebase";
import { useHistory } from "react-router-dom";

export const UserContext = React.createContext({
  user: null,
  isLoggedIn: false,
});

const UserProvider = ({ children }) => {
  const history = useHistory();
  const [user, setUser] = React.useState({ name: null, isLoggedIn: false });

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
    const chatKey = db.ref("chats").push().getKey();

    const userRef = db.ref("users").child(userKey);
    const chatRef = db.ref("chats").child(chatKey);

    const info = {
      name: name,
      createdDate: Date.now(),
      isLoggedIn: true,
      currentChat: chatKey,
      id: userKey,
    };

    await chatRef.set({ members: { 0: userKey }, createTime: Date.now() });
    await userRef.set(info);
    setUser(info);
    localStorage.setItem("currentUser", userKey);
    history.push(`/chats/${chatKey}`);
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
  }

  async function logout() {
    await db.ref("users").child(user.id).update({ isLoggedIn: false });
    localStorage.removeItem("currentUser");
    setUser({ name: null, isLoggedIn: false });
  }

  React.useState(() => {
    console.log("[UserContext.js] Current User", user);

    const checkCurrentUser = localStorage.getItem("currentUser");
    if (checkCurrentUser) {
      console.log("Current user is:", checkCurrentUser);
      fetchUser(checkCurrentUser);
    }
  }, [user.isLoggedIn]);

  return (
    <UserContext.Provider value={{ addUser, user, validateChat, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
