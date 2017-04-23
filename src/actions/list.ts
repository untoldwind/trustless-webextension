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
    return (dispatch: Dispatch<State>, getState: () => State) => {
        instrumentCurrentTab((hasLoginForm: boolean, tabId?: number, url?: string) => {
            dispatch(instrumentTab(tabId, hasLoginForm, url));
            let filter = {};
            if (url && filterMode === FilterModeMatchingUrl) {
                filter = {url: url}
            }
            sendNativeMessage(createCommand('list', filter), (response: SecretList) => {
                dispatch(updateSecretList(response, filterMode));
            });
        });
    };
}