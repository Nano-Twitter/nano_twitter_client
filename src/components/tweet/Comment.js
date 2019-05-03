import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import { Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
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
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
      borderRadius: 10,
      border: '1px solid',
      borderColor: blue[100],
      marginLeft: 10,
      marginTop: -5
    },
    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: blue[500],
      width: 50,
      height: 50,
    },
    cardMain: {
      padding:10,
      paddingTop: 15
    },
    cardHeader: {
      padding: 10,
      paddingLeft: 15,
    },
    cardContent: {
      marginTop: -15,
      paddingTop: 10,
      paddingLeft: 12
    }
  
  });

class Comment extends Component {
  
  render() {

    const post = {
      user_attr:{
        name: "happylamb"
      },
      created_at: "2019-04-30T05:10:32.415+00:00",
    }

    const {classes} = this.props;

    return (
      <Grid container
            direction="row"
            className={classes.cardMain}
      >
        <Grid item xs={2} md={2} lg={2}>
          <Avatar alt={post.user_attr.name} className={this.props.classes.avatar}>
              {post.user_attr.name.toUpperCase()[0]}
          </Avatar>
        </Grid>
        <Grid item xs={10} md={10} lg={10}>
        <Grid container
                spacing={0}
                justify="space-between"
                alignItems="baseline"
                className={classes.cardHeader}>
              <Grid item >
                  <Typography variant="body2">
                      {post.user_attr.name} {" "}
                      <Typography variant="caption" inline>
                            · {new Date(post.created_at).toLocaleDateString()}
                      </Typography>
                  </Typography>
              </Grid>
              <Grid item>
                <Typography component="p">
                    {post.content}
                </Typography>
              </Grid>
          </Grid>
        </Grid>
      </Grid>

      // <Divider />
    );

  }

}

export default withStyles(styles)(inject('rootStore')(observer(Comment)));