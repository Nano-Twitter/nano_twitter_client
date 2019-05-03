import {observable, action, decorate} from 'mobx';
import api from '../../api';
import profileStore from '../profileStore';

class FollowStore {

    current_user = JSON.parse(localStorage.getItem('user'));
    follow_relation = {};
    like_relation = {};

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    loadFollowRelation() {
        profileStore.loadProfile().then(
            () => {
                this.follow_relation = {...profileStore.following_list};
                console.log(this.follow_relation)
            }
        );
    }

    getFollowRelation() {
        return this.follow_relation;
    }


    setFollowRelation(user_id, status) {
        // this.follow_relation.set(user_id, status)
        this.follow_relation[user_id] = status

    }

    loadLikeRelation() {

    }

    getLikeRelation() {
        return this.like_relation;
    }

    setLikeRelation(user_id, status) {
        // this.like_relation.set(user_id, status)
        this.like_relation[user_id] = status
    }

    follow = (id) => {
        const params = {
            user_id: this.current_user._id.$oid,
        };
        return api.follow(id, params)
            .then(
                () => {
                    // this.follow_relation[id] = true;
                    profileStore.loadProfile()
                        .then(
                            () => {
                                this.follow_relation = {...profileStore.following_list};
                                console.log(this.follow_relation)
                            }
                        );
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
                    this.follow_relation[id] = false;

                    profileStore.loadProfile()
                        .then(
                            () => {
                                console.log({...profileStore.following_list});
                                this.follow_relation = {...profileStore.following_list};
                            }
                        );
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
