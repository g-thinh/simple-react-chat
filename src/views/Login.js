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

import { signin } from "../services/firebase";

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

const Login = () => {
  const classes = useStyles();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await signin(email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      {/* <Typography variant="h3">This is the Login Page</Typography> */}
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
              <Typography variant="h5">Please Sign In</Typography>
            </Grid>
            <Grid item>
              <TextField
                className={classes.input}
                id="standard-textarea"
                label="Email"
                placeholder="Please enter your email"
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
                placeholder="Please enter your password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </Grid>
            <p>{error}</p>
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

export default Login;
