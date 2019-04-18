import {observable, action, decorate} from 'mobx';
import api from '../../api';

class FollowStore {
    current_user = JSON.parse(localStorage.getItem('user'));
    follow_relation = new Map();
    like_relation = new Map();

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    getFollowRelation() {
        return this.follow_relation;
    }


    setFollowRelation(user_id, status) {
        this.follow_relation.set(user_id, status)
    }

    getLikeRelation() {
        return this.like_relation;
    }

    setLikeRelation(user_id, status) {
        this.like_relation.set(user_id, status)
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
    getFollowRelation: action,
    setFollowRelation: action,
    getLikeRelation: action,
    setLikeRelation: action,
    follow: action,
    unfollow: action,
});

export default FollowStore;
export {FollowStore};
