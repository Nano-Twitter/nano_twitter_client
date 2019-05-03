import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import { Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
const styles = theme => ({
    main: {
      width: 'auto',
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
        width: 1100,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
      paddingTop: theme.spacing.unit * 2
    },
    card: {
      maxWidth: 590,
    },
    avatar: {
      backgroundColor: blue[500],
      width: 40,
      height: 40,
    },
    cardMain: {
      paddingLeft:20,
      paddingTop: 20,
      height: 120
    },
    cardContent: {
      marginTop: -15,
      paddingTop: 10,
      paddingLeft: 12
    }
  
  });

class Comment extends Component {
  
  render() {

    const comment = this.props.comment;

    const {classes} = this.props;

    return (
      <Grid container
            direction="row"
            className={classes.cardMain}
      >
        <Grid item xs={2} md={2} lg={2}>
          <Avatar alt={comment.username} className={this.props.classes.avatar}>
              {comment.username.toUpperCase()[0]}
          </Avatar>
        </Grid>
        <Grid item xs={10} md={10} lg={10}>
        <Grid container
                spacing={0}
                justify="space-between"
                alignItems="baseline">
              <Grid item xs={12} md={12} lg={12}>
                  <Typography variant="body2">
                      {comment.username} {" "}
                      {/* <Typography variant="caption" inline>
                            · {new Date(comment.created_at).toLocaleDateString()}
                      </Typography> */}
                  </Typography>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Typography component="p">
                    {comment.content}
                </Typography>
              </Grid>
          </Grid>
        </Grid>
      </Grid>
    );

  }

}

export default withStyles(styles)(inject('rootStore')(observer(Comment)));