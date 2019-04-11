import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {withStyles} from '@material-ui/core/styles';
import Tweet from './tweet/Tweet'

const styles = theme => ({
    main: {
        width: 'auto',
        paddingTop: theme.spacing.unit * 2,
    },
});


class TimeLine extends Component {
    componentDidMount() {
        this.props.rootStore.timelineStore.loadTimeline()
    }

    componentDidUpdate() {
        
    }

    render() {
        const timeline = this.props.rootStore.timelineStore.getTimeline();

        // const listTweets = [];
        return (

            <main className={this.props.classes.main}>
                {
                    timeline.map(tweet => {
                        return (
                            <Tweet
                                key={tweet._id.$oid}
                                post={tweet}
                            />
                        )
                    })
                }
            </main>

        );
    }
}

export default withStyles(styles)(inject('rootStore')(observer(TimeLine)));