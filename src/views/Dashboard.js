import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { UserContext } from "../components/UserContext";
import { db } from "../services/firebase";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    margin: "1rem",
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const { user } = React.useContext(UserContext);
  const [chats, setChats] = React.useState(null);
  const [loading, setLoading] = React.useState();

  async function fetchChat() {
    setLoading(true);
    await db.ref("chats").on("value", (snapshot) => {
      if (snapshot.exists()) {
        let results = [];
        snapshot.forEach((snap) => {
          const MEMBERS = Object.values(snap.val().members);
          const KEY = snap.key;
          console.log("MEMBERS", MEMBERS);
          MEMBERS.forEach((m) => {
            if (m.id === user.uid) {
              console.log("This user is in this chat");
              results.push(KEY);
            }
          });
        });
        console.log("All Chats", results);
        setChats(results);
        setLoading(false);
      }
    });
  }

  React.useEffect(() => {
    fetchChat();
  }, []);

  return (
    <Container>
      <Typography variant="h3" className={classes.title}>
        Dashboard
      </Typography>
      <Paper>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          {chats &&
            chats.map((chat) => {
              return (
                <Grid item key={chats} component={Link} to={`/chats/${chat}`}>
                  <Typography
                    style={{ textDecoration: "none" }}
                    color="textPrimary"
                    variant="h5"
                  >
                    {chat}
                  </Typography>
                </Grid>
              );
            })}
        </Grid>
      </Paper>
    </Container>
  );
};

export default Dashboard;
