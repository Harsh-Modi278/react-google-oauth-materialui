import { React, useContext, Fragment } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { GoogleLogin } from "react-google-login";
import { UserContext } from "../UserContext";
import { Redirect, useHistory } from "react-router-dom";
// refresh token
import { refreshTokenSetup } from "../utils/refreshToken.js";
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  const onSuccess = (res) => {
    // console.log(res);
    // console.log("Login Success: currentUser:", res.profileObj);
    setUser(res.profileObj);
    localStorage.setItem(
      "userObj",
      JSON.stringify({
        profileObj: res.profileObj,
        accessToken: res.accessToken,
      })
    );

    refreshTokenSetup(res);
    history.push("/dashboard");
  };

  const onFailure = (res) => {
    // console.log("Login failed: res:", res);
    // alert(`Failed to login.`);
    setUser(null);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {user && <Redirect to="/dashboard" />}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in with Google
        </Typography>
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign In with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          style={{ marginTop: "100px" }}
        />
        <Box mt={8}>
          <Copyright />
        </Box>
      </div>
    </Container>
  );
}
