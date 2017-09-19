import { ADD_FLASH_MESSAGE, REMOVE_FLASH_MESSAGE } from '../actions/types';

export default function (state=null,action) {
    switch (action.type){
        case REMOVE_FLASH_MESSAGE:
            return null;
        case ADD_FLASH_MESSAGE:
            return {
                ...state,
                ['type']:action.payload.type,
                ['text']:action.payload.text
            };
        default:
            return state;
    }

}