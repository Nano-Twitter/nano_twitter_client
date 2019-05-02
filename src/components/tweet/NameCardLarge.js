import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import blue from '@material-ui/core/colors/blue';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { Button } from '@material-ui/core';


const styles = theme => ({
  main: {
    width: 'auto',
    paddingTop: theme.spacing.unit * 2
  },
  margin: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  card: {
    // maxWidth: 345,
  },
  media: {
    height: 80,
    backgroundColor: blue[500],
  },
  bigAvatar: {
    marginTop: -53,
    width: 75,
    height: 75,
    border: '3px solid #ffffff',
  },
  profile: {
    paddingTop: 5,
    paddingBottom: 5,
    height: 100
  },
  link: {
    color: blue[400]
  },
  names: {
    paddingLeft: 5,
    paddingTop: 5
  },
  username: {
    fontSize: 18
  },
  atname: {
    fontSize: 14
  }
});

class NameCardLarge extends Component {
  render() {
    return (
      <Card className={this.props.classes.card}>
        <CardActionArea>
          <CardMedia
            className={this.props.classes.media}
            image=""
            title="Contemplative Reptile"
          />
          <CardContent>

            <Grid container spacing={10}>
              <Grid item xs={8} md={8} lg={8}>
                <Avatar alt={this.props.username} src="https://material-ui.com/static/images/avatar/1.jpg" className={this.props.classes.bigAvatar} />
              </Grid>
              <Grid item xs={4} md={4} lg={4}>
                {this.props.id ? (this.props.rootStore.followStore.getFollowRelation().get(this.props.id) ?
                  (<Button variant="outlined"
                    size="small"
                    color="secondary"
                    aria-label="Add"
                    className={this.props.margin} onClick={() => {
                      this.props.rootStore.followStore.unfollow(this.props.id);
                      this.forceUpdate();
                    }} size="small" variant="outlined" color="secondary">unfollow</Button>) :
                  (<Button variant="outlined"
                    size="small"
                    color="primary"
                    aria-label="Add"
                    className={this.props.margin} onClick={() => {
                      this.props.rootStore.followStore.follow(this.props.id);
                      this.forceUpdate();
                    }} size="small" variant="outlined" color="primary">follow</Button>)) : ''}
              </Grid>
              <Grid item xs={12} md={12} lg={12} className={this.props.classes.names}>
                <Typography variant="title" className={this.props.classes.username} >
                  {this.props.username}
                </Typography>
                <Typography gutterBottom variant="caption" className={this.props.classes.atname}>
                  {'@'}{this.props.nickName || 'nickNameHahah'}
                </Typography>
              </Grid>

            </Grid>

            <Grid container spacing={12} className={this.props.classes.profile}>
              <Typography color="textPrimary">
                A short introduction of this person, if there is one.
                    <Link>#ProductManager #Microsoft #TechAndArt</Link>
              </Typography>
            </Grid>

          </CardContent>
        </CardActionArea>
      </Card>

    );
  }
}

export default withStyles(styles)(inject('rootStore')(observer(NameCardLarge)));