import {createAction, Action} from 'redux-actions';
import {SecretList} from '../models';
import {Dispatch} from 'redux';
import {State} from '../reducers';
import {sendMessage, createCommand} from './messaging';

export const UPDATE_SECRETLIST = 'UPDATE_SECRETLIST';

export const updateSecretList = createAction<SecretList, SecretList>(UPDATE_SECRETLIST, list => list);

export function doUpdateSecretList() {
    return (dispatch: Dispatch<State>) => {
        sendMessage(createCommand('list'), (response : SecretList) => {
            dispatch(updateSecretList(response));
        });
    };
}