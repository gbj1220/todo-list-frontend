import React, { useContext, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import useVerifyInput from "../Hooks/useVerifyInput";
import useVerifyPassword from "../Hooks/useVerifyPassword";
import useVerifyEmail from "../Hooks/useVerifyEmail";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Axios from "../Axios/Axios";
import checkToken from "../Hooks/useAuthenticateUser";
import { UserAuthorizationContext } from "../context/AuthenticateUser";

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp(props) {
  const classes = useStyles();

  const authContext = useContext(UserAuthorizationContext);

  const [username, setUsername, userNameInputError, userNameInputErrorMessage] =
    useVerifyInput();

  const [email, setEmail, emailInputError, emailInputErrorMessage] =
    useVerifyEmail();

  const [password, setPassword, passwordInputError, passwordInputErrorMessage] =
    useVerifyPassword();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      await Axios.post("/sign-up", {
        username,
        email,
        password,
      });

      let token = checkToken();
      if (token) {
        authContext.dispatch({ type: "LOGIN", email: token.email });
        props.history.push("/sign-in");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let token = checkToken();
    if (!token) {
      props.history.push("/home");
    } else {
      props.history.push("/sign-up");
    }
  }, [props.history]);

  return (
    <div>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleOnSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl error={userNameInputError}>
                  <TextField
                    variant='outlined'
                    required
                    id='username'
                    label='Username'
                    name='username'
                    autoComplete='username'
                    style={{ width: 400 }}
                    value={username}
                    onChange={(e) => setUsername(e)}
                  />
                  <FormHelperText>
                    {userNameInputError && userNameInputErrorMessage}
                  </FormHelperText>
                </FormControl>
                <FormControl error={emailInputError}>
                  <TextField
                    variant='outlined'
                    required
                    id='email'
                    label='Email Address'
                    name='email'
                    type='email'
                    autoComplete='email'
                    style={{ width: 400 }}
                    value={email}
                    onChange={(e) => {
                      setEmail(e);
                    }}
                  />
                  <FormHelperText>
                    {emailInputError && emailInputErrorMessage}
                  </FormHelperText>
                </FormControl>
                <FormControl error={passwordInputError}>
                  <TextField
                    variant='outlined'
                    required
                    name='password'
                    label='Password'
                    type='password'
                    id='password'
                    autoComplete='current-password'
                    style={{ width: 400 }}
                    value={password}
                    onChange={(e) => setPassword(e)}
                  />
                  <FormHelperText>
                    {passwordInputError && passwordInputErrorMessage}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify='flex-end'>
              <Grid item>
                <Link href='#' variant='body2'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}></Box>
      </Container>
      );
    </div>
  );
}

export default SignUp;
