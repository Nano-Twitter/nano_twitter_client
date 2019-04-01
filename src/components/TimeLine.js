import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import Tweet from './tweet/Tweet'

const styles = theme => ({
  main: {
    width: 'auto',
    paddingTop: theme.spacing.unit * 2,
  },
});


class TimeLine extends Component {
    componentDidMount() {
      this.props.rootStore.timelineStore.loadTimeline();
    }
    componentDidUpdate() {

    }
    render(){
      const timeline = this.props.rootStore.timelineStore.timeline;
      const listTweets = timeline.map((tweet, index) => 
        <Tweet key={index} post={tweet}/>
      );
      // const listTweets = [];
        return (
            <main className={this.props.classes.main}>
              {listTweets}
            </main>
            
        );
    }
}

export default withStyles(styles)(inject('rootStore')(observer(TimeLine)));