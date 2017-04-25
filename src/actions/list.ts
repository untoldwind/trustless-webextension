import {SecretList} from "../models";
import {Dispatch} from "redux";
import {FilterMode, FilterModeMatchingUrl, State} from "../reducers";
import {createCommand, sendNativeMessage} from "./browser-messaging";
import {instrumentCurrentTab} from "./browser-tabs";
import {instrumentTab} from "./instrument";
export type UPDATE_SECRETLIST = 'UPDATE_SECRETLIST';
export const UPDATE_SECRETLIST: UPDATE_SECRETLIST = 'UPDATE_SECRETLIST';

export type UpdateSecretListAction = {
    type: UPDATE_SECRETLIST,
    list: SecretList,
    filterMode: FilterMode
}

export function updateSecretList(list: SecretList, filterMode: FilterMode) {
    return {
        type: UPDATE_SECRETLIST,
        list: list,
        filterMode: filterMode
    }
}

export function doUpdateSecretList(filterMode: FilterMode) {
    return (dispatch: Dispatch<State>) => {
        instrumentCurrentTab().then(result => {
            dispatch(instrumentTab(result.tabId, result.hasLoginForm, result.url));
            let filter: any = {type: 'login'};
            if (result.url && filterMode === FilterModeMatchingUrl) {
                filter = {url: result.url, type: 'login'}
            }
            sendNativeMessage(createCommand('list', filter)).then((response: SecretList) => {
                dispatch(updateSecretList(response, filterMode));
            });
        });
    };
}