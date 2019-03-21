import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {withStyles, createStyles} from '@material-ui/core/styles';
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
import Link from '@material-ui/core/Link';
import NameCardSmall from '../../components/tweet/NameCardSmall';

const styles = theme =>

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


class Login extends Component {

    changeUsername = (e) => {
        this.props.rootStore.loginStore.changeUsername(e.target.value);
    }

    changePassword = (e) => {
        this.props.rootStore.loginStore.changePassword(e.target.value);
    }

    changeEmail = (e) => {
        this.props.rootStore.loginStore.changeEmail(e.target.value);
    }

    submit = (e) => {
        this.props.rootStore.loginStore.login();
    }

    render() {
        const cacheAvatar = false;

        return (

            <main className={this.props.classes.main}>
                <CssBaseline/>
                <Paper className={this.props.classes.paper}>
                    {cacheAvatar ?
                        <Avatar className={this.props.classes.avatar}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        :
                        <Avatar className={this.props.classes.avatar} alt="Remy Sharp"
                                src="https://material-ui.com/static/images/avatar/1.jpg">
                        </Avatar>
                    }
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <form className={this.props.classes.form}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input onChange={this.changeEmail} id="email" name="email" type="email" autoComplete="email"
                                   autoFocus/>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input onChange={this.changePassword} id="password" name="password" type="password"
                                   autoComplete="current-password"/>
                        </FormControl>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <Typography>
                            <Link href='/register' className="register">Don't have an account? Register?</Link>
                        </Typography>
                        <NameCardSmall></NameCardSmall>
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

export default withStyles(styles)(inject('rootStore')(observer(Login)));