import {ADD_FLASH_MESSAGE,REMOVE_FLASH_MESSAGE} from './types';

export function addFlashMessage(type,text) {

    return {
        type:ADD_FLASH_MESSAGE,
        payload:{
            type:type,
            text:text
        }
    }
}

export function removeFlashMessage() {

    return {
        type:REMOVE_FLASH_MESSAGE
    }
}