
import axios from 'axios';

const apiBaseUrl = '/api/v1';

export async function createBusinessProfile(businessProfile, user) {
    let body = Object.assign(businessProfile, {owner: user});
    try {
        let result = await axios.post(`${apiBaseUrl}/seller/businesses/account`, body);
        if (result && result.data) {
            return result.data;
        }
    } catch(ex) {
        console.dir(ex);
        throw ex;
    }
}

export async function updateBusinessProfile(businessProfile) {
    let body = Object.assign(businessProfile);
    try {
        let result = await axios.put(`${apiBaseUrl}/seller/businesses/account`, body);
        if (result && result.data) {
            return result.data;
        }
    } catch(ex) {
        console.dir(ex);
        throw ex;
    }
}

export async function getBusinessByUserId(userId) {
    try {
        let result = await axios.get(`${apiBaseUrl}/seller/businesses/account/${userId}`);
        if (result && result.data) {
            return result.data;
        }
    } catch (ex) {
        console.dir(ex);
        throw ex;
    }
}