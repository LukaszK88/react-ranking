import { CURRENT_USER} from '../actions';

const initialState = {
    isLoggedIn:false,
    admin:false,
    editor:false,
    user:{}
};


export default function (state = initialState, action) {
    switch (action.type){
        case CURRENT_USER:
            if(!action.payload.data){
                window.localStorage.removeItem('token');
            }else if (action.payload.data.hasOwnProperty('user_role_id')){
                if(action.payload.data.user_role_id === 3) {
                    return {
                        isLoggedIn:true,
                        admin: true,
                        user: action.payload.data
                    }
                }
            }

            return action.payload.data;

        default:
            return state;
    }

}