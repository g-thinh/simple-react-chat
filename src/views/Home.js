import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { ThemeTypeContext } from "../components/ThemeContext";
import { makeStyles } from "@material-ui/core/styles";
import { db } from "../services/firebase";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
  },
  button: {
    margin: "2rem",
  },
}));

const Home = () => {
  const { handleDarkModeToggle, darkMode } = React.useContext(ThemeTypeContext);
  const classes = useStyles();

  const sendData = async () => {
    await db.ref("chats").push({ hello: "world" });
  };

  return (
    <Container>
      <Typography variant="h3" className={classes.title}>
        This is the Home Page
      </Typography>
      <Grid container justify="center" alignItems="center">
        <Grid item className={classes.button}>
          <Button
            variant="contained"
            className={classes.textAlign}
            color="primary"
            onClick={handleDarkModeToggle}
          >
            Change Theme
          </Button>
        </Grid>
        <Grid item>
          <FormControlLabel
            labelPlacement="start"
            label={darkMode ? "Dark" : "Light"}
            control={
              <Switch
                checked={darkMode}
                onChange={handleDarkModeToggle}
                name="Dark Theme"
              />
            }
          />
        </Grid>
        <Grid item className={classes.button}>
          <Button
            variant="outlined"
            className={classes.textAlign}
            color="secondary"
            onClick={sendData}
          >
            Add Data
          </Button>
        </Grid>
      </Grid>
      <Paper>
        <Typography variant="p">
          This is where some text would reside
        </Typography>
      </Paper>
    </Container>
  );
};

export default Home;
