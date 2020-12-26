import React from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../components/UserContext";
import { db } from "../services/firebase";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  main: {
    padding: "0.5rem",
    overflowY: "scroll",
    overflow: "hidden",
    height: "50vh",
  },
}));

const Chat = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { user, validateChat } = React.useContext(UserContext);
  const [messages, setMessages] = React.useState([]);
  const [content, setContent] = React.useState("");
  const [loading, setLoading] = React.useState();

  const messageEl = React.useRef();

  async function fetchChat(chatID) {
    setLoading(true);
    try {
      await db
        .ref("messages")
        .child(chatID)
        .on("value", (snapshot) => {
          if (snapshot.exists()) {
            let msgs = [];
            snapshot.forEach((snap) => {
              msgs.push(snap.val());
            });
            setMessages(msgs);
            setLoading(false);
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleChange = (ev) => {
    setContent(ev.target.value);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      await db.ref("messages").child(id).push({
        content: content,
        date: Date.now(),
        sentBy: user.id,
      });
      setContent("");
    } catch (error) {
      console.log(error.message);
    }
  };

  function ScrollToBottom() {
    if (messageEl) {
      messageEl.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }

  React.useEffect(() => {
    ScrollToBottom();
    validateChat(id);
    fetchChat(id);
  }, []);

  return (
    <Container>
      <h1>This is the Chat Page for {id}</h1>
      <p>Currently Logged In User: {user.name}</p>
      <Paper>
        <Container className={classes.main} ref={messageEl}>
          {messages.map((msg) => {
            return <p key={msg.timestamp}>{msg.content}</p>;
          })}
        </Container>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Box display="flex" p={1} justifyContent="center" alignItems="center">
            <Box p={1} flexGrow={1}>
              <TextField
                onChange={handleChange}
                value={content}
                variant="outlined"
                fullWidth
              />
            </Box>
            <Box p={1}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Send
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Chat;
