import {observable, action, decorate} from 'mobx';
import api from '../../api';

class RecomStore {
    recom = [];

    loadRecom = () => {
        const params = {
            params: {
                user_id: JSON.parse(localStorage.getItem('user'))._id.$oid,
                num: 3,
            }
        };
        return api.whoToFollow(params).then((response) => {
            this.recom = response.data.data;
            // this.recom.push(...response.data.data);

            // this.recom.push(response.data.data);

            console.log(response.data.data);
        })
    };

    getRecom = () => {
        console.log(this.recom.slice());
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
