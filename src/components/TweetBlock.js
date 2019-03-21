import React from 'react';
import PropTypes from 'prop-types';
import {withStyles, MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Input from '@material-ui/core/Input';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import green from '@material-ui/core/colors/green';
import indigo from '@material-ui/core/colors/indigo';

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
    card: {
        minWidth: 275,
        // paddingLeft: theme.spacing.unit * 3,
        // paddingRight: theme.spacing.unit * 3,
        paddingBottom: 0,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },

    root: {
        display: 'flex',
        flexWrap: 'wrap',
        paddingRight: theme.spacing.unit * 3,
        // padding
        paddingBottom: 0,
    },
    margin: {
        margin: theme.spacing.unit,
    },
    cssLabel: {
        '&$cssFocused': {
            color: indigo[500],
        },
    },
    cssFocused: {},
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: indigo[500],
        },
        // minWidth: 275,
        minHeight: 100,
        borderRadius: 10,

    },
    notchedOutline: {
        borderRadius: 10,
    },
    avatar: {
        margin: 10,
    },
    bigAvatar: {
        margin: 10,
        width: 60,
        height: 60,
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

const theme = createMuiTheme({
    palette: {
        primary: green,
    },
    typography: {useNextVariants: true},
});


function SimpleCard(props) {
    const {classes} = props;

    return (
        <Card className={classes.card}>
            <CardContent>

                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="flex-start"
                    spacing={10}
                >
                    <Grid item xs={1.5}>
                        <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg"
                                className={classes.avatar}/>
                        {/*<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.bigAvatar} />*/}
                    </Grid>
                    <Grid item xs>
                        <Grid
                            container
                            direction="column"
                            justify="flex-start"
                            alignItems="stretch"
                        >

                            <Grid item>
                                <TextField
                                    className={classes.margin}
                                    InputLabelProps={{
                                        classes: {
                                            root: classes.cssLabel,
                                            focused: classes.cssFocused,
                                        },
                                    }}
                                    InputProps={{
                                        classes: {
                                            root: classes.cssOutlinedInput,
                                            focused: classes.cssFocused,
                                            notchedOutline: classes.notchedOutline,
                                        },
                                    }}
                                    label="Say something..."
                                    variant="outlined"
                                    id="custom-css-outlined-input"
                                    fullWidth
                                    margin="normal"
                                />
                            </Grid>

                            <Grid item
                                  justify="flex-end"
                            >
                                <Button variant="contained" color="primary" className={classes.button}>
                                    Tweet
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </CardContent>
        </Card>
    );
}

SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
};


function CustomizedInputs(props) {
    const {classes} = props;

    return (
        <div className={classes.root}>
            <FormControl className={classes.margin}>
                <InputLabel
                    htmlFor="custom-css-standard-input"
                    classes={{
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                    }}
                >
                    Custom CSS
                </InputLabel>
                <Input
                    id="custom-css-standard-input"
                    classes={{
                        underline: classes.cssUnderline,
                    }}
                />
            </FormControl>
            <TextField
                className={classes.margin}
                InputLabelProps={{
                    classes: {
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                    },
                }}
                InputProps={{
                    classes: {
                        root: classes.cssOutlinedInput,
                        focused: classes.cssFocused,
                        notchedOutline: classes.notchedOutline,
                    },
                }}
                label="Custom CSS"
                variant="outlined"
                id="custom-css-outlined-input"
            />

            <MuiThemeProvider theme={theme}>
                <TextField
                    className={classes.margin}
                    label="MuiThemeProvider"
                    id="mui-theme-provider-standard-input"
                />

                <TextField
                    className={classes.margin}
                    label="MuiThemeProvider"
                    variant="outlined"
                    id="mui-theme-provider-outlined-input"
                />
            </MuiThemeProvider>
            <FormControl className={classes.margin}>
                <InputLabel shrink htmlFor="bootstrap-input" className={classes.bootstrapFormLabel}>
                    Bootstrap
                </InputLabel>
                <InputBase
                    id="bootstrap-input"
                    defaultValue="react-bootstrap"
                    classes={{
                        root: classes.bootstrapRoot,
                        input: classes.bootstrapInput,
                    }}
                />
            </FormControl>
            <InputBase className={classes.margin} defaultValue="Naked input"/>
        </div>
    );
}

CustomizedInputs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
