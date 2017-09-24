import { FETCH_USERS_ADMIN } from '../actions/types';

const initialState = {
    unauthorised:{},
    blocked:{}
};

export default function (state=initialState,action) {

    switch (action.type){
        case FETCH_USERS_ADMIN:
            return {...state,['unauthorised']:action.payload.data.unauthorised,
                                ['blocked']:action.payload.data.blocked
            };
        default:
            return state;
    }

}