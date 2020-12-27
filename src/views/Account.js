import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { ThemeTypeContext } from "../components/ThemeContext";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    marginTop: "1rem",
  },
}));

const Account = () => {
  const classes = useStyles();
  const { handleDarkModeToggle, darkMode } = React.useContext(ThemeTypeContext);

  return (
    <Container>
      <Typography variant="h3" className={classes.title}>
        My Account
      </Typography>
      <Grid container justify="center" alignItems="center">
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
      </Grid>
    </Container>
  );
};

export default Account;
