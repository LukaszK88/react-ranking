import { CURRENT_USER} from '../actions';
import {UPDATE_USER} from '../actions/types';
const initialState = {
    isLoggedIn:false,
    admin:false,
    editor:false,
    user:{}
};


export default function (state = initialState, action) {
    switch (action.type){
        case UPDATE_USER:
            return {
                ...state,['user']:action.payload
            };
        case CURRENT_USER:
            if(!action.payload.data){
                window.localStorage.removeItem('token');
                return {
                    initialState
                };
            }else if (action.payload.data.hasOwnProperty('user_role_id')){
                if(action.payload.data.user_role_id === 3) {
                    return {
                        isLoggedIn:true,
                        admin: true,
                        user: action.payload.data
                    }
                }else {
                    return {
                        isLoggedIn: true,
                        admin: false,
                        user: action.payload.data
                    }
                }
            }

            return {
                initialState
            };

        default:
            return state;
    }

}