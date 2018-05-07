
import axios from 'axios';
const apiBaseUrl = '/api/v1';

export async function createStore(store, user, business) {
    let body = Object.assign({}, store);
    body.categories = body.categories.map(cat => cat['_id']);
    body.owner = user['_id'];
    body.business = business['_id'];
    try {
        let result = await axios.post(`${apiBaseUrl}/seller/stores`, body);
        if (result && result.data && result.data) {
            return result.data;
        }
    } catch(ex) {
        console.dir(ex);
        throw ex;
    }
}

export async function updateStore(store) {
    let body = Object.assign({}, store);
    body.categories = body.categories.map(cat => cat['_id']);
    
    try {
        let result = await axios.put(`${apiBaseUrl}/seller/stores/${store.owner}`, body);
        if (result && result.data && result.data) {
            return result.data;
        }
    } catch(ex) {
        console.dir(ex);
        throw ex;
    }
}

export async function getBusinessByUserId(userId) {
    try {
        let result = await axios.get(`${apiBaseUrl}/seller/stores/${userId}`);
        if (result && result.data) {
            return result.data;
        }
    } catch (ex) {
        console.dir(ex);
        throw ex;
    }
}