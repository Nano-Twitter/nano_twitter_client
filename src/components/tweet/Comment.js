import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const styles = theme => ({
    card: {
        maxWidth: 590,
        marginBottom: 5,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    avatar: {
        backgroundColor: blue[200],
    },

  });

class Comment extends Component {
  
  render() {

    const comment = this.props.comment;

    const {classes} = this.props;

    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={
                    <Avatar aria-label="Recipe" className={classes.avatar}>
                        {comment.username.toUpperCase()[0]}
                    </Avatar>
                }
                title={comment.username}
                // subheader="September 14, 2016"
            />
            <CardContent>
                <Typography component="p">
                    {comment.content}
                </Typography>
            </CardContent>
        </Card>

    );

  }

}

export default withStyles(styles)(inject('rootStore')(observer(Comment)));