import {observable, action, decorate} from 'mobx';
import api from '../../api';

class RecomStore {
    recom = [];

    getRecom = () => {
        const params = {
            params: {
                user_id: JSON.parse(localStorage.getItem('user'))._id.$oid,
                num: 3,
            }
        };
        return api.whoToFollow(params).then((response) => {
            this.recom = response.data.data;
            console.log(response);
        })
    }
}

decorate(RecomStore, {
    recom: observable,
    getRecom: action,
});

const recomStore = new RecomStore();

export default recomStore;
export {RecomStore};
