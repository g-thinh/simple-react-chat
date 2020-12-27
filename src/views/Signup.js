import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { UserContext } from "../components/UserContext";
import { signup } from "../services/firebase";

const useStyles = makeStyles((theme) => ({
  main: {
    margin: "2rem 0",
  },
  paper: {
    padding: "2rem",
    margin: "2rem auto",
  },
  margin: {
    margin: theme.spacing(1),
  },
  input: {
    width: 300,
  },
}));

const Signup = () => {
  const classes = useStyles();
  const { addUser } = React.useContext(UserContext);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await signup(email, password, name);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      <Typography variant="h3">Sign Up</Typography>
      <Paper className={classes.paper}>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            className={classes.main}
            direction="column"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <Typography variant="h5">Please Sign Up</Typography>
            </Grid>
            <Grid item>
              <TextField
                className={classes.input}
                id="standard-textarea"
                label="Name"
                placeholder="Please enter your name here."
                value={name}
                onChange={handleNameChange}
                required
              />
            </Grid>
            <Grid item>
              <TextField
                className={classes.input}
                id="standard-textarea"
                label="Email"
                placeholder="Please enter your email here."
                value={email}
                onChange={handleEmailChange}
                required
              />
            </Grid>
            <Grid item>
              <TextField
                className={classes.input}
                id="standard-textarea"
                label="Password"
                type="password"
                placeholder="Please enter your desired password."
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Signup;
