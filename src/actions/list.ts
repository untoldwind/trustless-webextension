import {SecretList} from "../models";
import {Dispatch} from "redux";
import {State} from "../reducers";
import {createCommand, sendMessage} from "./messaging";

export type UPDATE_SECRETLIST = 'UPDATE_SECRETLIST';
export const UPDATE_SECRETLIST: UPDATE_SECRETLIST = 'UPDATE_SECRETLIST';

export type UpdateSecretListAction = {
    type: UPDATE_SECRETLIST,
    list: SecretList
}

export function updateSecretList(list: SecretList) {
    return {
        type: UPDATE_SECRETLIST,
        list: list
    }
}

export function doUpdateSecretList() {
    return (dispatch: Dispatch<State>) => {
        sendMessage(createCommand('list'), (response: SecretList) => {
            dispatch(updateSecretList(response));
        });
    };
}