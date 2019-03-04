
import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { register } from '../serviceWorker';

const styles = (theme: Theme) =>
  createStyles({
    main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing.unit,
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
  });

type State = {
  email: string;
  password: string;
}

class Login extends Component<WithStyles<typeof styles>, State> {

  constructor(props: any) {

    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.emailChange = this.emailChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.submit = this.submit.bind(this);

  }

  emailChange(e: any) {
    this.setState({ email: e.target.value });
  }

  passwordChange(e: any) {
    this.setState({ password: e.target.value });
  }

  submit() {
    const email: String = this.state.email;
    const password: String = this.state.password;
    // authService.login(this.state.email, this.state.password)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }
    return fetch(`/api/user/signin`, requestOptions)
      .then(response => response.json()).then(
        data => {
          if (data.success) {
            alert('Login success!');
            localStorage.setItem("isLoggedIn", "true");
          }
          else alert('Login failed')
        }
      )
      .catch(err => {
        console.log(err)
      })
  }


  render() {

    const cacheAvatar=false

    return (
      <main className={this.props.classes.main}>
        <CssBaseline />
        <Paper className={this.props.classes.paper}>
          { cacheAvatar?
            <Avatar className={this.props.classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
          :
            <Avatar className={this.props.classes.avatar} alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg">
            </Avatar>
          }
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={this.props.classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input onChange={this.emailChange} id="email" name="email" type="email" autoComplete="email" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input onChange={this.passwordChange} id="password" name="password" type="password" autoComplete="current-password" />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={this.props.classes.submit}
              onClick={this.submit}
            >
              Log in
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(Login);
