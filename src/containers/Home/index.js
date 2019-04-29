import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PersonalProfile from '../../components/PersonalProfile'
import Trend from '../../components/TrendsForYou'
import TweetBlock from '../../components/TweetBlock'
import TimeLine from '../../components/TimeLine'
import WhoToFollow from '../../components/WhoToFollow'
import {observer, inject} from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import NameCardLarge from '../../components/tweet/NameCardLarge';

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

});

class Home extends Component {

    render() {

        return (
            <main className={this.props.classes.main}>
                <Grid container spacing={24}>

                    <Grid item xs={12} md={6} lg={3}>
                        <PersonalProfile/>
                        <Trend/>
                    </Grid>

                    <Grid item xs={12} md={6} lg={6}>
                        <TweetBlock/>
                        <TimeLine/>
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        {/* <WhoToFollow/> */}
                        <NameCardLarge/>
                    </Grid>

                </Grid>
            </main>
        );
    }

}

export default withStyles(styles)(inject('rootStore')(observer(Home)));
