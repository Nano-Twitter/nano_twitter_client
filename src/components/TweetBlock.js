import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';

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
  
  });

  const fakePosts = [
    {
      title: 'Featured tweet',
      user: 'hahaha1',
      content:
        'This is a wider card with supporting text below as a natural lead-in to additional content.',
    },
    {
      title: 'Tweet title',
      user: 'hahaha2',
      content:
        'This is a wider card with supporting text below as a natural lead-in to additional content.',
    },
  ];

class TweetBlock extends Component {
    render(){
        return (
            <main className={this.props.classes.main}>
            TweetBlock
            </main>
            
        );
    }
}

export default withStyles(styles)(inject('rootStore')(observer(TweetBlock)));