import axios from 'axios';
import {
    BASE_URL,
    TEST_CONTROLLER,
    POINT_GET_GEO_JSON,
    PARAM_COUNT_GET_GEO_JSON
} from '../QueriesConstants';

export default async function getGeoJson(count) {
    let url = `${BASE_URL}/${TEST_CONTROLLER}/${POINT_GET_GEO_JSON}?${PARAM_COUNT_GET_GEO_JSON}=${count}`
    console.log(url);
    let result;

    try {
        await axios
            .get(url, {cancelToken: axios.CancelToken.source().token})
            .then((response) => (result = response.data));
    } catch (error) {
        alert(`Ошибка: ${error}`);
        result = null;
    }
    console.log("result", result);
    return result;
}