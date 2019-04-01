import {observable, action, decorate} from 'mobx';
import api from '../../api';

class RecomStore {
    recom = [];
    current_user = JSON.parse(localStorage.getItem('user'));
    follow_relation = {};

    loadRecom = () => {
        const params = {
            params: {
                user_id: JSON.parse(localStorage.getItem('user'))._id.$oid,
                num: 5,
            }
        };
        return api.whoToFollow(params).then((response) => {
            this.recom = response.data.data;
            this.recom.forEach(function (user) {
                if (this.current_user.following_ids.include(user._id.$oid)) {
                    this.follow_relation.set(user._id.$oid, true);
                } else {
                    this.follow_relation.set(user._id.$oid, false);
                }
            })
        })
    };

    getRecom = () => {
        return this.recom.slice();
    }

    getRelation = () => {
        return this.follow_relation;
    }

    follow = (id) => {
        const params = {
            params: {
                user_id: this.current_user._id.$oid
            }
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
    }

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
    }
}

decorate(RecomStore, {
    recom: observable,
    loadRecom: action,
});

const recomStore = new RecomStore();

export default recomStore;
export {RecomStore};
