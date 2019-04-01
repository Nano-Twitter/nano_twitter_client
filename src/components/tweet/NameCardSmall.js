import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {withStyles} from '@material-ui/core/styles';
import {Avatar} from '@material-ui/core';
import {Button} from '@material-ui/core'
import api from '../../api'

const styles = theme => ({
    main: {
        "border-bottom": 'solid 1px rgb(230, 236, 240)',
        "padding-bottom": "8px",
        "font-size": "12px",
        "margin": "0 10px 0 10px"
    },
    avatar: {
        float: 'left',
        width: '60px',
        height: '60px',
        "margin": "0 10px 0 0"

    },
    nameBox: {
        "margin": "5px 5px 5px 5px"
    },
    userName: {
        "font-size": "14px",
        color: "black"
    },
    account: {
        "font-size": "12px",
        color: "#657786"
    }
});

class NameCardSmall extends Component {
    follow(id) {
        api.follow(id).then(() => {
            //refresh user
        })
    }

    unfollow(id) {
        api.unfollow(id).then(() => {
            //refresh user
        })
    }

    render() {
        return (
            <div className={this.props.classes.main}>
                {/*<Avatar className={this.props.classes.avatar} src={this.props.avatarAddress}/>*/}
                <div>
                    <div>
                        <div className={this.props.classes.nameBox}>
                            <strong className={this.props.classes.userName}>@{this.props.userName || "test"}</strong>
                            {/*<span className={this.props.classes.userName}>@{this.props.account || "amazing"}</span>*/}
                        </div>
                        {this.props.followed ?
                            (<Button onClick={(e) => {
                                this.follow(this.props.id)
                            }} size="small" variant="outlined" color="primary">follow</Button>) :
                            (<Button onClick={(e) => {
                                this.unfollow(this.props.id)
                            }} size="small" variant="outlined" color="secondary">unfollow</Button>)
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(inject('rootStore')(observer(NameCardSmall)));