import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import indigo from '@material-ui/core/colors/indigo';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Tweet from '../../components/tweet/Tweet'

const styles = theme => ({
    main: {
        width: 'auto',
        paddingTop: theme.spacing.unit * 2
    },
    card: {
        height: 300,
        width: '100%',
    },
    media: {
        height: 110,
        color: theme.palette.text.secondary,
    },
    bigAvatar: {
        marginTop: -53,
        width: 150,
        height: 150,
        border: '3px solid #ffffff',
    },
    infobox: {
        marginTop: 10
    },
    link: {
        color: indigo[400]
    },
    root: {

    },
    appBar: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    tabBar: {
        marginLeft: '50%',
        'transform': 'translateX(-50%)',
        width: '50%',
    },
    containers: {
        marginLeft: '50%',
        'transform': 'translateX(-50%)',
        width: '50%',
    },
    tabContainer: {
        float: 'left',
        width: '100%',
        position: 'relative',
        bottom: '25px',
    },
    appBarRoot: {
        'box-shadow': '0px 2px 0px -1px rgba(0,0,0,0.2), 0px 4px 0px 0px rgba(0,0,0,0.14), 0px 1px 0px 0px rgba(0,0,0,0.12)'
    }
});

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

class Profile extends Component {

    componentDidMount() {
        this.search(this.props.match.params.id);
    }

    state = {
        cardValue: 0
    }
    handleChange = (event, cardValue) => {
        this.setState({ cardValue });
    };
    search = (userId) => {
        this.props.rootStore.userStore.loadProfile(userId)
        this.props.rootStore.userStore.getTweet(userId, { start: 0, count: 20 })
        this.props.rootStore.userStore.getFollowers(userId, { start: 0, count: 20 })
        this.props.rootStore.userStore.getFollowings(userId, { start: 0, count: 20 })
    }
    render() {
        const { classes } = this.props;
        const { cardValue } = this.state;
        let timeline = this.props.rootStore.userStore.tweetList
        return (
            <div className={classes.root}>
                <Card className={this.props.classes.card}>
                    <CardActionArea>
                        <CardMedia
                            className={this.props.classes.media}
                            image=""
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Grid container spacing={0}>
                                <Grid item xs={4} md={4} lg={4}>
                                    <Avatar alt={this.props.rootStore.userStore.username} src="https://material-ui.com/static/images/avatar/1.jpg" className={this.props.classes.bigAvatar} />
                                    <Typography variant="title">
                                        {this.props.rootStore.userStore.username}
                                    </Typography>
                                    <Typography gutterBottom variant="caption">
                                        {'@'} {this.props.rootStore.userStore.nickname}
                                    </Typography>
                                </Grid>
                            </Grid>

                        </CardContent>
                    </CardActionArea>
                </Card>
                <div className={classes.tabContainer}>
                    <AppBar classes={{ root: classes.appBarRoot }} position="static" position="sticky" className={classes.appBar}>
                        <Tabs value={cardValue} onChange={this.handleChange} className={classes.tabBar}>
                            <Tab label={<Grid item xs={4} md={4} lg={4}>
                                <Typography gutterBottom variant="caption" >
                                    Tweets
     </Typography>
                                <Typography variant="title" className={this.props.classes.link} >
                                    {this.props.rootStore.userStore.tweets}
                                </Typography>
                            </Grid>} />
                            <Tab label={<Grid item xs={4} md={4} lg={4}>
                                <Typography gutterBottom variant="caption" >
                                    Followers
     </Typography>
                                <Typography variant="title" className={this.props.classes.link} >
                                    {this.props.rootStore.userStore.follower}
                                </Typography>
                            </Grid>} />
                            <Tab label={<Grid item xs={4} md={4} lg={4}>
                                <Typography gutterBottom variant="caption" >
                                    Following
     </Typography>
                                <Typography variant="title" className={this.props.classes.link}>
                                    {this.props.rootStore.userStore.following}
                                </Typography>
                            </Grid>} />
                        </Tabs>
                    </AppBar>
                    <div className={classes.containers}>
                        {cardValue === 0 &&
                            <TabContainer>
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
                            </TabContainer>}
                        {cardValue === 1 && <TabContainer>

                        </TabContainer>}
                        {cardValue === 2 && <TabContainer>

                        </TabContainer>}</div>
                </div>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(inject('rootStore')(observer(Profile))));