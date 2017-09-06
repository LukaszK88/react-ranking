import { FETCH_FIGHTERS, UPDATE_RANKING} from '../actions/types';
import _ from 'lodash';

export default function (state=null,action) {
    switch (action.type){
        case FETCH_FIGHTERS:
            return action.payload.data;
        default:
            return state;
    }

}