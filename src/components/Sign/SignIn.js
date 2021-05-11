import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';




function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: "red"
  },
  astext: {
    background: "none",
    border:"none",
    margin:0,
    padding:0,
    cursor: "pointer"
  }
}));

export default function SignIn(props) {
  const classes = useStyles();

  const history = useHistory();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleClick = () => {
    if (email == "" || password == "") {
        setErrorMessage("Please enter details")
    }
    axios.post('https://back-ecommerce01.herokuapp.com/auth/login', {
        name: email,
        password: password
    }).then(res => {
        props.setToken(res.data)
        history.push('/ecomm')
    }).catch(function (error) {
        setErrorMessage("Connection refused")
    });
}

const handleGoSignUp = () => {
  history.push('/ecomm/signup')
}


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email} onChange={(event) => setEmail(event.target.value)}
            autoFocus
          />
          <TextField
            value={password} onChange={(event) => setPassword(event.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleClick}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                
              </Link>
            </Grid>
            <Grid item>
              <Link>
              <a className={classes.astext} onClick={handleGoSignUp} variant="body2">
                {"Don't have an account? Sign Up"}
              </a>
              </Link>
            </Grid>
          </Grid>
        </form>
        <p className={classes.error}>{errorMessage}</p> 
      </div>
    </Container>
  );
}