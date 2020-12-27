import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { UserContext } from "../components/UserContext";
import { db } from "../services/firebase";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  main: {
    padding: "0.5rem",
    overflowY: "scroll",
    overflow: "hidden",
    height: "50vh",
  },
  title: {
    textAlign: "center",
    margin: "1rem",
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
        .child(id)
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
        sentBy: user.uid,
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
    // validateChat(id);
    fetchChat(id);
  }, []);

  return (
    <Container>
      <Typography variant="h3" className={classes.title}>
        Main Chat
      </Typography>
      <Paper>
        <Container className={classes.main} ref={messageEl}>
          {messages.map((msg, index) => {
            return msg.sentBy === user.uid ? (
              <Message isUser key={index}>
                <p>{msg.content}</p>
              </Message>
            ) : (
              <Message key={index}>
                <p>{msg.content}</p>
              </Message>
            );
          })}
        </Container>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Box display="flex" p={1} justifyContent="center" alignItems="center">
            <Box p={1} flexGrow={1}>
              <TextField
                onChange={handleChange}
                value={content}
                variant="outlined"
                placeholder="Type your message..."
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

const Message = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
  /* margin: ${(props) => (props.isUser ? "0 5rem 0 0" : "0 0 0 5rem")}; */
  padding: ${(props) => (props.isUser ? "0 0 0 25%" : "0 25% 0 0")};
  /* border: 1px solid red; */
  width: auto;

  & p {
    padding: 0.5rem;
    margin: 0.3rem;
    border-radius: 12px;
    background: ${(props) => (props.isUser ? "dodgerblue" : "#6c757d")};
    color: white;
    word-break: break-all;
  }
`;

export default Chat;
