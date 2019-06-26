import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import {detections} from "./modules/detections";

export default new Vuex.Store({
    modules: {
        detections
    }
});