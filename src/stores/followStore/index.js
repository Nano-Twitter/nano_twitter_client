import {observable, action, decorate} from 'mobx';
import api from '../../api';

class FollowStore {
    current_user = JSON.parse(localStorage.getItem('user'));
    follow_relation = new Map();

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    getRelation() {
        return this.follow_relation;
    }

    setRelation(user_id, status) {
        this.follow_relation.set(user_id, status)
    }

    follow = (id) => {
        const params = {
            user_id: this.current_user._id.$oid,
        };
        return api.follow(id, params)
            .then(
                () => {
                    this.follow_relation.set(id, true);
                }
            )
            .catch((error) => {
                console.log(error);
            })
    };

    unfollow = (id) => {
        const params = {
            params: {
                user_id: this.current_user._id.$oid
            }
        };
        return api.unfollow(id, params)
            .then(
                () => {
                    this.follow_relation.set(id, false);
                }
            )
            .catch((error) => {
                console.log(error);
            })
    }
}

decorate(FollowStore, {
    follow_relation: observable,
    getRelation: action,
    setRelation: action,
    follow: action,
    unfollow: action,
});

// const followStore = new FollowStore();

export default FollowStore;
export {FollowStore};
