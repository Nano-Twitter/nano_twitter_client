import {observable, action, decorate} from 'mobx';
import api from '../../api';

class RecomStore {
    recom = [];
    current_user = JSON.parse(localStorage.getItem('user'));

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    loadRecom = () => {
        const params = {
            params: {
                user_id: JSON.parse(localStorage.getItem('user'))._id.$oid,
                num: 5,
            }
        };
        return api.whoToFollow(params).then((response) => {
            this.recom = response.data.data;
            for (let user of this.recom) {
                if (this.current_user.following_ids.includes(user._id.$oid)) {
                    this.rootStore.followStore.setRelation(user._id.$oid, true)
                } else {
                    this.rootStore.followStore.setRelation(user._id.$oid, false)
                }
            }
        })
    };

    getRecom = () => {
        return this.recom.slice();
    };
}

decorate(RecomStore, {
    recom: observable,
    loadRecom: action,
    // getRecom: action,
});

export default RecomStore;
export {RecomStore};
