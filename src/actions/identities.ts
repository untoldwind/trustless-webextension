import {createAction} from 'redux-actions';
import {Identity} from '../models';
import {Dispatch} from 'redux';
import {State} from '../reducers';
import {sendMessage, createCommand} from './messaging';

export const UPDATE_IDENTITIES = 'UPDATE_IDENTITIES';

const updateIdentities = createAction<Identity[], Identity[]>(UPDATE_IDENTITIES, identities => identities);

export function doUpdateIdentities() {
    return (dispatch: Dispatch<State>) => {
        sendMessage(createCommand('identities'), (response: Identity[]) => {
            dispatch(updateIdentities(response));
        });
    };
}