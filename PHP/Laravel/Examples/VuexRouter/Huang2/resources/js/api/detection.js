import {HUANG_CONFIG} from "../config";

export default {
    /**
     * 获取检测结果
     * @returns {*}
     */
    getResult: function () {
        return axios.get(HUANG_CONFIG.API_URL + '/detect');
    }
}