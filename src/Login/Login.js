import React, { useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import useVerifyEmail from "../Hooks/useVerifyEmail";
import useVerifyPassword from "../Hooks/useVerifyPassword";
import { UserAuthorizationContext } from "../context/AuthenticateUser";
import Axios from "../Axios/Axios";
import jwtDecode from "jwt-decode";

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

function Login(props) {
  const classes = useStyles();

  const authContext = useContext(UserAuthorizationContext);

  const [email, setEmail, emailError, EmailErrorMessage] = useVerifyEmail();
  const [password, setPassword, passwordError, passwordErrorMessage] =
    useVerifyPassword();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("test");
      let result = await Axios.post("/login", {
        email,
        password,
      });
      console.log(result);

      localStorage.setItem("jwtToken", result.data.jwtToken);

      let decodedToken = jwtDecode(result.data.jwtToken);
      authContext.dispatch({ type: "LOGIN", email: decodedToken.email });
      props.history.push("/home");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Enter Login Info
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleOnSubmit}>
          <FormControl error={emailError}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              style={{ width: 400 }}
              value={email}
              onChange={(e) => setEmail(e)}
            />
            <FormHelperText>{emailError && EmailErrorMessage}</FormHelperText>
          </FormControl>
          <FormControl error={passwordError}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
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
              {passwordError && passwordErrorMessage}
            </FormHelperText>
          </FormControl>
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href='#' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Login;
