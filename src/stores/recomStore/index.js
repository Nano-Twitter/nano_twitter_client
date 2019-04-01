import {observable, action, decorate} from 'mobx';
import api from '../../api';

class RecomStore {
    recom = [];

    loadRecom = () => {
        const params = {
            params: {
                user_id: JSON.parse(localStorage.getItem('user'))._id.$oid,
                num: 5,
            }
        };
        return api.whoToFollow(params).then((response) => {
            this.recom = response.data.data;
        })
    };

    getRecom = () => {
        return this.recom.slice();
    }

}

decorate(RecomStore, {
    recom: observable,
    loadRecom: action,
});

const recomStore = new RecomStore();

export default recomStore;
export {RecomStore};
