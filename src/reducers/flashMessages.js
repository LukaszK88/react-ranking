import { ADD_FLASH_MESSAGE, REMOVE_FLASH_MESSAGE } from '../actions/types';
import _ from 'lodash';

export default function (state=null,action) {
    switch (action.type){
        case REMOVE_FLASH_MESSAGE:
            return null;
        case ADD_FLASH_MESSAGE:
            if(action.payload.text.hasOwnProperty('email')){
                let errorBag = [];
                _.forEach(action.payload.text.email,(error) =>{
                    errorBag.push(error);
                });
                return {
                    ...state,
                    ['type']: action.payload.type,
                    ['text']: errorBag.join('<br/>')
                };
            }else {
                return {
                    ...state,
                    ['type']: action.payload.type,
                    ['text']: action.payload.text
                };
            }
        default:
            return state;
    }

}