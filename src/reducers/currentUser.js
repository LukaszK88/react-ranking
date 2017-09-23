import { CURRENT_USER} from '../actions';
import {UPDATE_USER} from '../actions/types';
const initialState = {
    isLoggedIn:false,
    admin:false,
    clubAdmin:null,
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
            }else if (action.payload.data){
                //admin
                if(action.payload.data.user_role_id === 3) {
                    return {
                        isLoggedIn:true,
                        admin: true,
                        clubAdmin:null,
                        user: action.payload.data
                    }
                }
                //club admin
                if(action.payload.data.club_admin_id) {
                    return {
                        isLoggedIn:true,
                        admin: false,
                        clubAdmin:action.payload.data.club_admin_id,
                        user: action.payload.data
                    }
                }
                //normal user
                return {
                    isLoggedIn: true,
                    admin: false,
                    clubAdmin:null,
                    user: action.payload.data
                }
            }

            return {
                initialState
            };

        default:
            return state;
    }

}