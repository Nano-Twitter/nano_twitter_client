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


class TrendsForYou extends Component {
    render(){
        return (
            <main className={this.props.classes.main}>
            TrendsForYou
            </main>
            
        );
    }
}

export default withStyles(styles)(inject('rootStore')(observer(TrendsForYou)));