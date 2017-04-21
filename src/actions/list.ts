import {SecretList} from '../models';
import {Dispatch} from 'redux';
import {FilterMode, FilterModeMatchingUrl, State} from '../reducers';
import {createCommand, sendMessage} from './messaging';
import {getCurrentUrl} from './tabs';

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
        getCurrentUrl((url?: string) => {
            let filter = {};
            if (url && filterMode === FilterModeMatchingUrl) {
                filter = {url: url}
            }
            sendMessage(createCommand('list', filter), (response: SecretList) => {
                dispatch(updateSecretList(response, filterMode));
            });
        });
    };
}