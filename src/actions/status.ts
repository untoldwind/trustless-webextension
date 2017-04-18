import {createAction, Action} from 'redux-actions';
import {Status} from '../models';
import {Dispatch} from 'redux';
import {State} from '../reducers';
import {sendMessage, createCommand} from './messaging';

export const UPDATE_STATUS = 'UPDATE_STATUS';

export const updateStatus = createAction<Status, Status>(UPDATE_STATUS, status => status);

export function doUpdateStatus() {
    return (dispatch: Dispatch<State>) => {
        sendMessage(createCommand('status'), (response : Status) => {
            dispatch(updateStatus(response));
        });
    };
}