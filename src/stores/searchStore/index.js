import { observable, action, decorate } from 'mobx';
import api from '../../api';

class SearchStore {
    results = [];
    searchTerm = ''
    constructor() {
    }
    changeSearchTerm = (value) => {
        console.log('being changed',value)
        this.searchTerm = value
    }

    search = () => {
        api.search({ content: this.searchTerm}).then((response) => {
            this.results = response.data.data;
        })
    }
}

decorate(SearchStore, {
    results: observable,
    searchTerm: observable
});

export default SearchStore;
export { SearchStore };
