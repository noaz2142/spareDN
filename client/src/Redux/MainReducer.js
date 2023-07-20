import { createStore } from 'redux'

function mainreducer(state = [], action) {
    switch (action.type) {
        case 'CREATE_USER':
            return state.concat(action.payload);
        default:
            return state
    }
}

const store = createStore(mainreducer,{ user: {} });
export default store;
