import { FETCH_FIGHTERS} from '../actions';


export default function (state=null,action) {
    switch (action.type){
        case FETCH_FIGHTERS:
            return action.payload.data;

        default:
            return state;
    }

}