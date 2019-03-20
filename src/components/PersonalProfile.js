import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import indigo from '@material-ui/core/colors/indigo';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    main: {
      width: 'auto',
      marginLeft: theme.spacing.unit * 1,
      marginRight: theme.spacing.unit * 1,
      paddingTop: theme.spacing.unit * 2
    },
    card: {
      maxWidth: 345,
    },
    media: {
      height: 110,
      backgroundColor: indigo[500],
    },
    bigAvatar: {
      marginTop: -53,
      width: 75,
      height: 75,
      border: '3px solid #ffffff',
    },
    infobox: {
      marginTop: 10
    },
    link: {
      color: indigo[400]
    }
  });

const fakeProfile = {
    name: 'Harry Mairson',
    nickname: '@HMair',
    tweets: '3',
    following: '12',
    followers: '20'
}

class PersonalProfile extends Component {
    render(){
        return (
          <Card className={this.props.classes.card}>
            <CardActionArea>
              <CardMedia
                className={this.props.classes.media}
                image=""
                title="Contemplative Reptile"
              />
              <CardContent>

                <Grid container spacing={2}>
                  <Grid item xs={4} md={4} lg={4}>
                    <Avatar alt={fakeProfile.name} src="https://material-ui.com/static/images/avatar/1.jpg" className={this.props.classes.bigAvatar} />
                  </Grid>
                  <Grid item xs={8} md={8} lg={8}>
                    <Typography variant="title">
                      {fakeProfile.name}
                    </Typography>
                    <Typography gutterBottom variant="caption">
                      {fakeProfile.nickname}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={5} className={this.props.classes.infobox}>
                  <Grid item xs={4} md={4} lg={4}>
                    <Typography gutterBottom variant="caption" >
                      Tweets
                    </Typography>
                    <Typography variant="title" className={this.props.classes.link} >
                      {fakeProfile.tweets}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} md={4} lg={4}>
                    <Typography gutterBottom variant="caption" >
                      Followers
                    </Typography>
                    <Typography variant="title" className={this.props.classes.link} >
                      {fakeProfile.followers}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} md={4} lg={4}>
                    <Typography gutterBottom variant="caption" >
                      Following
                    </Typography>
                    <Typography variant="title" className={this.props.classes.link}>
                      {fakeProfile.following}
                    </Typography>
                  </Grid>
                  
                </Grid>
                
              </CardContent>
            </CardActionArea>
          </Card>
        );
    }
}

export default withStyles(styles)(inject('rootStore')(observer(PersonalProfile)));