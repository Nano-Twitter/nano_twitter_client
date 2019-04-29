import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    main: {
      width: 'auto',
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      paddingTop: theme.spacing.unit * 2
    },
  
  });


class NameCardLarge extends Component {
    render(){
        return (
            <main className={this.props.classes.main}>
            NameCardLarge
            </main>
            
        );
    }
}

export default withStyles(styles)(inject('rootStore')(observer(NameCardLarge)));