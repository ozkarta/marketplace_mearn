
import axios from 'axios';

const apiBaseUrl = '/api/v1';

export async function createBusinessProfile(businessProfile) {
    try {
        let result = await axios.post(`${apiBaseUrl}/seller/businesses/account`, businessProfile);
        if (result && result.data) {
            return result.data;
        }
    } catch(ex) {
        console.dir(ex);
        throw ex;
    }
}