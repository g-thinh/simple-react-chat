import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    margin: "1rem",
  },
}));

const About = () => {
  const classes = useStyles();
  return (
    <Container>
      <Typography variant="h3" className={classes.title}>
        About Page
      </Typography>
    </Container>
  );
};

export default About;
