import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import {Button} from '@material-ui/core'

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


class NameCardSmall extends Component {
    render(){
        return (
            <div>
              <Avatar src={this.props.avatarAddress}></Avatar>
              <div>
                <div>
                  <span>{this.props.userName}</span>
                  <span>{this.props.account}</span>
                  <Button>follow</Button>
                  <Button>unfollow</Button>
                  </div>

              </div>
            </div>
        );
    }
}

export default withStyles(styles)(inject('rootStore')(observer(NameCardSmall)));