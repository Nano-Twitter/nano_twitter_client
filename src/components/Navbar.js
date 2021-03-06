import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
// import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles, createStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
// import EditIcon from '@material-ui/icons/Edit'
// import MailIcon from '@material-ui/icons/Mail';
// import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { observer, inject } from 'mobx-react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';
import _ from 'lodash'

const styles = theme => createStyles({
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.light,
    },
});

const menuOption = [
    {
        id: 1,
        name: 'home',
        link: '/'
    },
    {
        id: 2,
        name: 'register',
        link: '/register'
    }
]

class PrimarySearchAppBar extends React.Component {
    state = {
        anchorEl: null,
        mobileMoreAnchorEl: null,
        menuAnchorEl: null,
    };

    handleProfileMenuOpen = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    closeAllMenues = () => {
        this.setState({ anchorEl: null });
        this.handleMobileMenuClose();
    };

    handleMobileMenuOpen = (event) => {
        this.setState({ mobileMoreAnchorEl: event.currentTarget });
    };

    handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null });
    };

    handleMenuOpen = (event) => {
        this.setState({ menuAnchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
        this.setState({ menuAnchorEl: null });
    };

    logout = () => {
        this.props.rootStore.loginStore.logout();
    };

    search = (event) => {
        if (event.key === 'Enter') {
            if(!this.props.history.location.pathname.startsWith('/searchResult')){
                this.props.history.push(`/searchResult`)
            }else{
                this.props.rootStore.searchStore.search()
            }
        }
    }

    render() {
        const { anchorEl, mobileMoreAnchorEl, menuAnchorEl } = this.state;
        const { classes } = this.props;
        const isProfileMenuOpen = Boolean(anchorEl);
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
        const isMenuOpen = Boolean(menuAnchorEl)

        const renderProfileMenu = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isProfileMenuOpen}
                onClose={this.closeAllMenues}
            >
                <MenuItem ><Link to={`/profile/${this.props.rootStore.profileStore.id}`}>Profile</Link></MenuItem>
                <MenuItem onClick={this.logout}>Logout</MenuItem>
            </Menu>
        );

        const renderMenu = (
            <Menu
                anchorEl={menuAnchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                {menuOption.map((menu) =>
                    <MenuItem component={Link} key={menu.id.toString()} to={menu.link}>{menu.name}</MenuItem>
                )}

            </Menu>
        )

        const renderMobileMenu = (
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMobileMenuOpen}
                onClose={this.closeAllMenues}
            >
                <MenuItem onClick={this.handleMobileMenuClose}>
                    {/* <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <MailIcon />
                        </Badge>
                    </IconButton>
                    <p>Messages</p> */}
                </MenuItem>
                <MenuItem onClick={this.handleMobileMenuClose}>
                    {/* <IconButton color="inherit">
                        <Badge badgeContent={11} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <p>Notifications</p> */}
                </MenuItem>
                <MenuItem onClick={this.handleProfileMenuOpen}>
                    <IconButton color="inherit">
                        <AccountCircle />
                    </IconButton>
                    <p>Profile</p>
                </MenuItem>
            </Menu>
        );

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton onClick={this.handleMenuOpen} className={classes.menuButton} color="inherit"
                            aria-label="Open drawer">
                            <MenuIcon />
                        </IconButton>
                        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                            Nano-Twitter
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                value={this.props.rootStore.searchStore.searchTerm}
                                onChange={(e) => {  this.props.rootStore.searchStore.changeSearchTerm(e.target.value)}}
                                onKeyDown={this.search}
                            />
                        </div>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            {/* <IconButton color="inherit">
                                <EditIcon />
                            </IconButton> */}
                            {/* <IconButton color="inherit">
                                <Badge badgeContent={1} color="secondary">
                                    <MailIcon />
                                </Badge>
                            </IconButton> */}
                            {/* <IconButton color="inherit">
                                <Badge badgeContent={1} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton> */}
                            <IconButton
                                aria-owns={isProfileMenuOpen ? 'material-appbar' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleProfileMenuOpen}
                                color="inherit"
                            >
                                <Avatar className={this.props.classes.avatar} >
                                    {this.props.rootStore.profileStore.username.toUpperCase()[0]}
                                </Avatar>
                            </IconButton>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                                <MoreIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                {renderMenu}
                {renderProfileMenu}
                {renderMobileMenu}
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(inject('rootStore')(observer(PrimarySearchAppBar))));