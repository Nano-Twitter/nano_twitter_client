import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {withStyles} from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
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
import Comment from './Comment'
import TextField from "@material-ui/core/TextField";
import Input from '@material-ui/core/Input';
import Loop from '@material-ui/icons/Loop'
import {withRouter} from 'react-router';

const styles = theme => ({
    main: {
        width: 'auto',
        paddingTop: theme.spacing.unit * 2
    },
    card: {
        maxWidth: 590,
    },
    media: {
        height: 0,
        borderRadius: 10,
        border: null,
        paddingTop: '56.25%', // 16:9
        marginLeft: 15,
    },
    actions: {
        display: 'flex',
        padding: 0,
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
        backgroundColor: theme.palette.primary.light,
        width: 50,
        height: 50,
        fontSize: 25
    },
    cardMain: {
        padding: 15,
    },
    cardHeader: {
        padding: 15,
        paddingTop: 0,
        paddingBottom: 0,
    },
    cardContent: {
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
    },
    icon: {
        margin: theme.spacing.unit,
        color: theme.palette.primary.light,
        fontSize: 16,
    },
    grid: {
        padding: 0,
    },
    userName:{
        cursor:'pointer'
    }

});


class Tweet extends Component {

    state = {
        expanded: false,
        commentOpen: false,
        retweetOpen: false,
    };

    handleClickUserName=(id)=>{
        let target=`/profile/${id}`
        if(!this.props.history.location.pathname.startsWith(target)){
            this.props.history.push(target)
        }else{
            // do nothing
        }
    }

    changeTweet = (e) => {
        this.props.rootStore.tweetStore.changeTweet(e.target.value);
    };

    changeComment = (e) => {
        this.props.rootStore.tweetStore.changeComment(e.target.value);
    };

    addCommment = (e) => {
        this.props.rootStore.tweetStore.addComment()
        .then(()=> {
            this.handleCloseComment();
        });
    };

    handleClickOpenComment = () => {
        this.setState({commentOpen: true});
        this.props.rootStore.tweetStore.changeTweetId(this.props.post._id.$oid);
    };

    handleClickLike = () => {
        console.log(this.props.post._id.$oid)
        this.setState({commentOpen: true});
        this.props.rootStore.tweetStore.like(this.props.post._id.$oid);
    };

    handleClickOpenRetweet = () => {
        this.setState({retweetOpen: true});
        this.props.rootStore.tweetStore.changeParentId(this.props.post._id.$oid);
    };

    handleCloseComment = () => {
        this.setState({commentOpen: false});
    };

    handleCloseRetweet = () => {
        this.setState({retweetOpen: false});
    };

    handleSendRetweet = () => {
        this.setState({retweetOpen: false});
        this.props.rootStore.tweetStore.submit();
    };

    handleExpandClick = () => {
        this.props.rootStore.tweetStore.getComments(this.props.post._id.$oid);
        this.componentDidMount()
        this.setState(state => ({expanded: !state.expanded}));
    };

    isRetweet = (post) => {
        if (post.parent_id) {
            return (
                <Grid container alignItems="flex-start">
                    <Grid item className={this.props.grid}>
                        <Loop className={this.props.icon} style={{fontSize: 13.3}}/>
                    </Grid>
                    <Grid item className={this.props.grid}>
                        <Typography component="p">
                            Retweet
                        </Typography>
                    </Grid>
                </Grid>
            );
        }
    };

    followStatus = (post) => {

        if (post.user_id.$oid !== JSON.parse(localStorage.getItem('user'))._id.$oid) {

            console.log(this.props.rootStore.followStore.follow_relation[post.user_id.$oid]);

            if (this.props.rootStore.followStore.follow_relation[post.user_id.$oid]) {
                return (
                    <Button onClick={() => {
                        this.props.rootStore.followStore.unfollow(post.user_id.$oid);
                        // this.forceUpdate();
                    }} size="small" variant="outlined" color="secondary">unfollow</Button>
                )
            } else {
                return (
                    <Button onClick={() => {
                        this.props.rootStore.followStore.follow(post.user_id.$oid);
                        // this.forceUpdate();
                    }} size="small" variant="outlined" color="primary">follow</Button>
                )
            }
        }
    };
    render() {

        const post = this.props.post;
        const {classes} = this.props;

        return (
            <main className={classes.main}>
                <Card className={classes.card}>
                    <Grid container
                          direction="row"
                          className={classes.cardMain}
                    >
                        <Grid item>
                            <Avatar alt={post.user_attr.name} className={this.props.classes.avatar} className={this.props.classes.userName} onClick={()=>{this.handleClickUserName(post.user_attr.id)}}>
                                {post.user_attr.name.toUpperCase()[0]}
                            </Avatar>
                        </Grid>
                        <Grid item xs={10}>
                            <Grid container
                                  spacing={0}
                                  justify="space-between"
                                  alignItems="baseline"
                                  className={classes.cardHeader}>
                                <Grid item >
                                    <Typography className={this.props.classes.userName} onClick={()=>{this.handleClickUserName(post.user_attr.id)}} variant="body2">
                                        {post.user_attr.name} {" "}
                                        <Typography variant="caption" inline>
                                             · {new Date(post.created_at).toLocaleDateString()}
                                        </Typography>
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    {this.isRetweet(post)}
                                </Grid>
                            </Grid>
                            <CardContent className={classes.cardContent}>
                                <Typography component="p">
                                    {post.content}
                                </Typography>
                            </CardContent>
                            {post.image_url?<CardMedia
                                className={classes.media}
                                image={post.image_url}
                                title="Paella dish"
                            />:''}
                            
                            <CardActions className={classes.actions}>
                                <Grid container spacing={8}>
                                    <Grid item xs={3} md={3} lg={3}>
                                        <IconButton aria-label="Retweet" onClick={this.handleClickOpenRetweet}>
                                            {/* <RotateRight/> */}
                                            <Loop/>
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs={3} md={3} lg={3}>
                                        <IconButton aria-label="Comment" onClick={this.handleClickOpenComment}>
                                            <TextsmsIcon/><Typography
                                            variant="caption">{(this.props.rootStore.tweetStore.comments[post._id.$oid] || []).length || post.comments_count}</Typography>
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs={3} md={3} lg={3}>
                                        <IconButton aria-label="Like" onClick={this.handleClickLike}>
                                            <FavoriteIcon/><Typography variant="caption">{post.likes_count}</Typography>
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
                                            <ExpandMoreIcon/>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </Grid>

                    </Grid>
                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                        {<CardContent>
                            {
                                (this.props.rootStore.tweetStore.comments[post._id.$oid] || []).map((comment) => {
                                    return (
                                        <Comment
                                            key={comment._id.$oid}
                                            comment={comment}
                                        />
                                    )
                                })
                            }
                        </CardContent>}
                    </Collapse>
                </Card>


                <Dialog
                    open={this.state.commentOpen}
                    onClose={this.handleCloseComment}
                    aria-labelledby="form-dialog-title"
                    fullWidth
                    maxWidth={'xs'}
                >
                    <DialogTitle id="alert-dialog-title">{"Comment"}</DialogTitle>
                    <DialogContent>
                        <TextField
                            onChange={this.changeComment}
                            className={classes.margin}
                            InputLabelProps={{
                                classes: {
                                    root: classes.cssLabel,
                                    focused: classes.cssFocused,
                                },
                            }}
                            InputProps={{
                                classes: {
                                    root: classes.cssOutlinedInput,
                                    focused: classes.cssFocused,
                                    notchedOutline: classes.notchedOutline,
                                },
                            }}
                            value={this.props.rootStore.tweetStore.tweet}
                            autoFocus
                            label="Comment something..."
                            variant="outlined"
                            id="custom-css-outlined-input"
                            margin="normal"
                            fullWidth
                            multiline
                            rows='4'
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseComment} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={this.addCommment} color="primary" autoFocus>
                            Comment
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={this.state.retweetOpen}
                    onClose={this.handleCloseRetweet}
                    aria-labelledby="form-dialog-title"
                    fullWidth
                    maxWidth={'xs'}
                >
                    <DialogTitle id="alert-dialog-title">{"Retweet"}</DialogTitle>
                    <DialogContent>
                        <TextField
                            onChange={this.changeTweet}
                            className={classes.margin}
                            InputLabelProps={{
                                classes: {
                                    root: classes.cssLabel,
                                    focused: classes.cssFocused,
                                },
                            }}
                            InputProps={{
                                classes: {
                                    root: classes.cssOutlinedInput,
                                    focused: classes.cssFocused,
                                    notchedOutline: classes.notchedOutline,
                                },
                            }}
                            value={this.props.rootStore.tweetStore.tweet}
                            autoFocus
                            label="Say something..."
                            variant="outlined"
                            id="custom-css-outlined-input"
                            margin="normal"
                            fullWidth
                            multiline
                            rows='4'
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseRetweet} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSendRetweet} color="primary" autoFocus>
                            Retweet
                        </Button>
                    </DialogActions>
                </Dialog>
            </main>
        );
    }
}

// isRetweet.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

export default withRouter(withStyles(styles)(inject('rootStore')(observer(Tweet))));