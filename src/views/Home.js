import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    marginTop: "1rem",
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <Container>
      <Typography variant="h3" className={classes.title}>
        Landing Page
      </Typography>
    </Container>
  );
};

export default Home;
