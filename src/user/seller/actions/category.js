
import axios from 'axios';

const apiBaseUrl = '/api/v1';

export async function getCategoryList(params) {
    try {
        let result = await axios.get(`${apiBaseUrl}/shared/categories`, {params: params});
        if (result && result.data && result.data.categories) {
            return result.data.categories;
        }
    } catch(ex) {
        console.dir(ex);
        throw ex;
    }
}