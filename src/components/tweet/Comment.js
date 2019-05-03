import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
// import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import FavoriteIcon from '@material-ui/icons/Favorite';
import TextsmsIcon from '@material-ui/icons/Textsms';
import RotateRight from '@material-ui/icons/RotateRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TweetBlock from '../TweetBlock'

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
      "shit"
    );
  }

}

export default withStyles(styles)(inject('rootStore')(observer(Comment)));