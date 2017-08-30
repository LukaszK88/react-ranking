import { CURRENT_USER} from '../actions';

const initialState = {
    admin:false,
    editor:false,
    user:{}
};


export default function (state = null, action) {
    switch (action.type){
        case CURRENT_USER:
            console.log(action.payload.data);
            if(!action.payload.data){
                window.localStorage.removeItem('token');
                action.payload.data = null;
            }
            if(action.payload.data.hasOwnProperty('user_role_id')){
                if(action.payload.data.user_role_id === 3) {
                    console.log('3');
                    return {
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