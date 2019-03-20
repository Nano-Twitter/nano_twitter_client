import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
// import { Link } from 'react-router';
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

class Register extends Component {

    changeUsername = (e) => {
        this.props.rootStore.registerStore.changeUsername(e.target.value);
    }

    changePassword = (e) => {
        this.props.rootStore.registerStore.changePassword(e.target.value);
    }

    changeEmail = (e) => {
        this.props.rootStore.registerStore.changeEmail(e.target.value);
    }

    register = () => {
        this.props.rootStore.registerStore.register();
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
                        Register
                    </Typography>
                    <form className={this.props.classes.form}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input onChange={this.changeUsername} id="username" name="username" type="text"
                                   autoComplete="current-username" autoFocus/>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input onChange={this.changeEmail} id="email" name="email" type="email"
                                   autoComplete="email"/>
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
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={this.register}
                        >
                            Register
                        </Button>
                    </form>
                </Paper>
            </main>

        );
    }
}

export default withStyles(styles)(inject('rootStore')(observer(Register)));