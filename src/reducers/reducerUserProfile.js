import { FETCH_USER,FETCH_ACHIEVEMENTS,ADD_ACHIEVEMENT } from '../actions/types';
import _ from 'lodash';



export default function (state=null,action) {
    switch (action.type){
        // case ADD_ACHIEVEMENT:
        //     console.log(action.payload.data);
        //     return {...state};
        case FETCH_ACHIEVEMENTS:
            // return {...state,['achievements']:{
            //             ...state,['data']:{
            //                 ...state,['data']:_.mapKeys(action.payload.data.data.data, 'id' ),
            //                             ['achievement']:action.payload.data.data.achievement
            //     }}};
            return {...state,['achievements']:action.payload.data};
        case FETCH_USER:
            return {...state,['user']:action.payload.data};
        default:
            return state;
    }

    //_.mapKeys(action.payload.data.data, 'id')

}