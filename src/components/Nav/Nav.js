import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

import { signout } from "../../services/firebase";

// Side bar
import Drawer from "@material-ui/core/Drawer";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Divider from "@material-ui/core/Divider";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ChatIcon from "@material-ui/icons/Chat";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: "none",
    color: "inherit",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
}));

export default function Nav({ children }) {
  const classes = useStyles();
  const { user } = React.useContext(UserContext);
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (toggle) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(toggle);
  };

  // const toggleDrawer = () => {
  //   setOpen(!open);
  // };

  React.useEffect(() => {}, [user.isLoggedIn]);

  const menu = () => {
    return (
      <div
        className={classes.list}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          <ListItem>
            <ListItemText primary={`Welcome, ${user.name}`} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button component={Link} to="/account">
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItem>
          <ListItem button component={Link} to="/dashboard">
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem
            button
            onClick={() => {
              signout();
              toggleDrawer(false);
            }}
          >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
        </List>
      </div>
    );
  };

  return (
    <Container className={classes.root} maxWidth="lg">
      <AppBar position="static">
        <Toolbar>
          {user.isLoggedIn && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(!open)}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant="h6"
            className={classes.title}
            component={Link}
            to={user.isLoggedIn ? "/dashboard" : "/"}
          >
            Simple Chat
          </Typography>
          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
          {!user.isLoggedIn && (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        className={classes.drawer}
        variant="temporary"
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        {menu()}
      </SwipeableDrawer>
      <main>{children}</main>
    </Container>
  );
}
