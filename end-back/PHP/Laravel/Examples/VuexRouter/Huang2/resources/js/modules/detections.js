import DefectionAPI from '../api/detection';

export const detections = {
    state: {
        totalOK: 0,
        totalNG: 0,
        pass: "WAITING..."
    },

    getters: {
        getTotalOK: (state) => {
            return state.totalOK;
        },
        getTotalNG: (state) => {
            return state.totalNG;
        },
        getPass: (state) => {
            return state.pass;
        }
    },

    mutations: {
        increaseTotalOK(state) {
            state.totalOK++;
        },
        increaseTotalNG(state) {
            state.totalNG++;
        },
        setPass(state, pass) {
            state.pass = pass;
        }
    },

    actions: {
        loadResult({commit}) {
            DefectionAPI.getResult()
                .then(function (response) {
                    console.log(response.data);
                    commit('setPass', response.data.resultStr);
                    if (response.data.resultStr === 'PASS') {
                        commit('increaseTotalOK');
                    } else {
                        commit('increaseTotalNG');
                    }
                })
        }
    }
};