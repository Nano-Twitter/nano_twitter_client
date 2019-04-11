import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {withStyles} from '@material-ui/core/styles';
import NameCardSmall from './tweet/NameCardSmall';

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

});

class WhoToFollow extends Component {
    componentDidMount() {
        this.props.rootStore.recomStore.loadRecom();
    }

    render() {
        const recom = this.props.rootStore.recomStore.getRecom();
        return (
            <main className={this.props.classes.main}>
                {recom.map(user => {
                    return (
                        <NameCardSmall
                            key={user._id.$oid}
                            id={user._id.$oid}
                            userName={user.name}
                            followed={false}
                        />
                    )
                })
                }
            </main>
        );
    }
}

export default withStyles(styles)(inject('rootStore')(observer(WhoToFollow)));