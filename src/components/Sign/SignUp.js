
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


import { FormControl, FormLabel, RadioGroup, Radio } from '@material-ui/core';


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
  },
  radioContainer: {
    marginTop: "30px"
  }
}));

export default function SignUp(props) {
  const classes = useStyles();

  const history = useHistory();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatedPassword, setRepeatedPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [valueInterest, setValueInterest] = useState("")
  const [valueEducation, setValueEducation] = useState("")
  const [valueResaon, setValueReason] = useState("")

  const handleClick = () => {
    if (email == "" || password == "" || repeatedPassword == "" || valueResaon == "" || valueEducation == "" || valueInterest == "") {
        setErrorMessage("Please enter details")
        return
    }
    axios.post('https://back-ecommerce01.herokuapp.com/auth/register', {
        name: email,
        password: password,
        education: valueEducation,
        reason: valueResaon,
        interest: valueInterest
    }).then(res => {

      console.log(res)

        axios.post('https://back-ecommerce01.herokuapp.com/auth/login', {
            name: email,
            password: password
        }).then(res => {
            props.setToken(res.data)
            history.push('/ecomm')
        }).catch(function (error) {
            setErrorMessage("Problem during connexion")
        });
    }).catch(function (error) {
        setErrorMessage("Sign Up refused: use another name")
    });
  }

  const handleGoSignIn = () => {
    history.push('/ecomm/signin')
  }

  const handleChangeInterest = (event) => {
    setValueInterest(event.target.value)
  }

  const handleChangeEducation = (event) => {
    setValueEducation(event.target.value)
  }

  const handleChangeReason = (event) => {
    setValueReason(event.target.value)
  }



  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
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

          <TextField
            value={repeatedPassword} onChange={(event) => setRepeatedPassword(event.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Repeat Password"
            label="Repeat Password"
            type="password"
            autoComplete="current-password"
          />

        <FormControl className={classes.radioContainer} component="fieldset">
          <FormLabel component="legend">Interest *</FormLabel>
          <RadioGroup aria-label="gender" name="gender1" value={valueInterest} onChange={handleChangeInterest}>
            <FormControlLabel value="Informational Technology" control={<Radio />} label="Informational Technology" />
            <FormControlLabel value="Business Intelligence" control={<Radio />} label="Business Intelligence" />
            <FormControlLabel value="Data Science"  control={<Radio />} label="Data Science" />
            <FormControlLabel value="Digital Economics" control={<Radio />} label="Digital Economics" />
            <FormControlLabel value="biological Computing" control={<Radio />} label="biological Computing" />
            <FormControlLabel value="E-commerce"  control={<Radio />} label="E-commerce" />
          </RadioGroup>
        </FormControl>


        <FormControl className={classes.radioContainer} component="fieldset">
          <FormLabel component="legend">Education *</FormLabel>
          <RadioGroup aria-label="gender" name="gender1" value={valueEducation} onChange={handleChangeEducation}>
            <FormControlLabel value="Higher Education" control={<Radio />} label="Higher Education" />
            <FormControlLabel value="Bachelors" control={<Radio />} label="Bachelors" />
            <FormControlLabel value="Masters"  control={<Radio />} label="Masters" />
            <FormControlLabel value="PhD" control={<Radio />} label="PhD" />
            <FormControlLabel value="Postdoctorate" control={<Radio />} label="Postdoctorate" />
          </RadioGroup>
        </FormControl>

        <FormControl className={classes.radioContainer} component="fieldset">
          <FormLabel component="legend">Reasons for taking new courses *</FormLabel>
          <RadioGroup aria-label="gender" name="gender1" value={valueResaon} onChange={handleChangeReason}>
            <FormControlLabel value="Person Interest" control={<Radio />} label="Person Interest" />
            <FormControlLabel value="Educational" control={<Radio />} label="Educational" />
            <FormControlLabel value="Career Development"  control={<Radio />} label="Career Development" />
          </RadioGroup>
        </FormControl>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleClick}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
            </Grid>
            <Grid item>
              <Link>
              <a className={classes.astext} onClick={handleGoSignIn} variant="body2">
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