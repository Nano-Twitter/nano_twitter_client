import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
// import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import FavoriteIcon from '@material-ui/icons/Favorite';
import TextsmsIcon from '@material-ui/icons/Textsms';
import RotateRight from '@material-ui/icons/RotateRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TweetBlock from '../TweetBlock'

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
    card: {
      maxWidth: 590,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
      borderRadius: 10,
      border: '1px solid',
      borderColor: blue[100],
      marginLeft: 10,
      marginTop: -5
    },
    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: blue[500],
      width: 50,
      height: 50,
    },
    cardMain: {
      padding:10,
      paddingTop: 15
    },
    cardHeader: {
      padding: 10,
      paddingLeft: 15,
    },
    cardContent: {
      marginTop: -15,
      paddingTop: 10,
      paddingLeft: 12
    }
  
  });

class Tweet extends Component {

    state = { 
      expanded: false,
      commentOpen: false,
      retweetOpen:false,
    };

    handleClickOpenComment = () => {
      this.setState({ commentOpen: true });

    };

    handleClickOpenRetweet = () => {
      this.setState({ retweetOpen: true });
      this.props.rootStore.tweetStore.changeParentId(this.props.post._id.oid);
    };
  
    handleCloseComment = () => {
      this.setState({ commentOpen: false });
    };

    handleCloseRetweet = () => {
      this.setState({ retweetOpen: false });
    };

    handleExpandClick = () => {
      this.setState(state => ({ expanded: !state.expanded }));
    };

    render(){
      
      const post = this.props.comment;
      const { classes } = this.props;

      return (

        <main className={classes.main}>
          
          <Card className={classes.card}>
            <Grid container spacing={8}  className={classes.cardMain}>
              <Grid item xs={1} md={1} lg={1}>
                <Avatar alt={post.user_attr.name} src="https://material-ui.com/static/images/avatar/1.jpg" className={this.props.classes.avatar} />
              </Grid>
              <Grid item xs={11} md={11} lg={11}>
                <Grid container spacing={0}  className={classes.cardHeader}>
                  <Grid item xs={10} md={10} lg={10}>
                    <Typography variant="body2">
                      {'@'}{post.user_attr.name} {" "}
                      <Typography variant="caption" inline>
                        {post.user_attr.name} · {post.created_at}
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs={2} md={2} lg={2}>
                    
                  </Grid>
                </Grid>
                <CardContent className={classes.cardContent}>
                  <Typography component="p">
                    {post.content}
                  </Typography>
                </CardContent>
                <CardMedia
                  className={classes.media}
                  image="https://www.fluentin3months.com/wp-content/uploads/2018/04/beautiful-spanish.jpg"
                  title="Paella dish"
                />
                <CardActions className={classes.actions}>
                  <Grid container spacing={8}>
                    <Grid item xs={3} md={3} lg={3}>
                      <IconButton aria-label="Retweet" onClick={this.handleClickOpenRetweet}>
                        <RotateRight />
                      </IconButton>
                    </Grid>
                    <Grid item xs={3} md={3} lg={3}>
                      <IconButton aria-label="Comment" onClick={this.handleClickOpenComment}>
                        <TextsmsIcon /><Typography variant="caption">{post.comments_count}</Typography>
                      </IconButton> 
                    </Grid>
                    <Grid item xs={3} md={3} lg={3}>
                      <IconButton aria-label="Add to favorites">
                        <FavoriteIcon /><Typography variant="caption">{post.likes_count}</Typography>
                      </IconButton>
                    </Grid>
                    <Grid item xs={3} md={3} lg={3}>
                      <IconButton
                        className={classnames(classes.expand, {
                          [classes.expandOpen]: this.state.expanded,
                        })}
                        onClick={this.handleExpandClick}
                        aria-expanded={this.state.expanded}
                        aria-label="Show more"
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardActions>
              </Grid>
              
            </Grid>
  
          </Card>


          <Dialog
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          open={this.state.commentOpen}
          onClose={this.handleCloseComment}
          aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Comments"}</DialogTitle>
            <DialogContent>
              <TweetBlock />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseComment} color="primary">
                Disagree
              </Button>
              <Button onClick={this.handleCloseComment} color="primary" autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
          open={this.state.retweetOpen}
          onClose={this.handleCloseRetweet}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Retweet Dialog"}</DialogTitle>
            <DialogContent>
              <TweetBlock />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseRetweet} color="primary">
                Disagree
              </Button>
              <Button onClick={this.handleCloseRetweet} color="primary" autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </main>
      );
    }
}

export default withStyles(styles)(inject('rootStore')(observer(Tweet)));