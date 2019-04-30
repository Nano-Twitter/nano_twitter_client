import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { observer, inject } from 'mobx-react';
import Tweet from '../../components/tweet/Tweet'

const styles = theme => ({
    main: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up(1200 + theme.spacing.unit * 3 * 2)]: {
            width: 1200,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        paddingTop: theme.spacing.unit * 2
    },
    paper: {
        padding: theme.spacing.unit * 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        color: theme.palette.text.secondary,
    },
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    container: {
        marginLeft: '50%',
        'max-width':590,
        'transform': 'translateX(-50%)',
    },
});

class Search extends Component {
    componentDidMount() {
        this.props.rootStore.searchStore.search()
    }
    render() {

        return (
            <div className={this.props.classes.container}>
                {this.props.rootStore.searchStore.results.map(tweet => {
                    return (
                        <Tweet
                            key={tweet._id.$oid}
                            post={tweet}
                            className={this.props.classes.tweet}
                        />
                    )
                })}
            </div>
        );
    }

}

export default withStyles(styles)(inject('rootStore')(observer(Search)));
