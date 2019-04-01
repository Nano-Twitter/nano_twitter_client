import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import indigo from '@material-ui/core/colors/indigo';

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import {inject, observer} from "mobx-react";


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
    cardContent: {
        marginBottom: 0,
        paddingBottom: 0
    }
});

class SimpleCard extends Component {

    changeTweet = (e) => {
        this.props.rootStore.tweetStore.changeTweet(e.target.value);
    };

    submit = (e) => {
        this.props.rootStore.tweetStore.submit();
    };

    render() {

        const {classes} = this.props;

        return (

            <Card className={classes.card}>
                <CardContent>

                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="flex-start"
                        spacing={8}
                    >
                        <Grid item xs={1}>
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
                                        onChange={this.changeTweet}
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
                                        value={this.props.rootStore.tweetStore.tweet}
                                        label="Say something..."
                                        variant="outlined"
                                        id="custom-css-outlined-input"
                                        margin="normal"
                                        fullWidth
                                        multiline
                                        rows='4'
                                    />
                                </Grid>

                                <Grid item
                                >
                                    <Button variant="contained"
                                            color="primary"
                                            className={classes.button}
                                            onClick={this.submit}
                                    >
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
}

export default withStyles(styles)(inject('rootStore')(observer(SimpleCard)));
