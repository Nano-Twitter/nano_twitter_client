import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  main: {
    width: 'auto',
    paddingTop: theme.spacing.unit * 2
  },
});


class TimeLine extends Component {
    render(){
        return (
            <main className={this.props.classes.main}>
            TimeLine
            </main>
            
        );
    }
}

export default withStyles(styles)(inject('rootStore')(observer(TimeLine)));