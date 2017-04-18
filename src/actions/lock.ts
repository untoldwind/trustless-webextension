import {Status, Identity} from '../models';
import {Dispatch} from 'redux';
import {State} from '../reducers';
import {sendMessage, createCommand} from './messaging';
import {updateStatus} from './status';

export function doLock() {
    return (dispatch: Dispatch<State>) => {
        sendMessage(createCommand('lock'), (response: Status) => {
            dispatch(updateStatus(response));
        })
    };
}

export function doUnlock(identitiy: Identity, passphrase:string) {
    const command = createCommand('unlock', {
        ...identitiy,
        passphrase: passphrase
    });

    return (dispatch: Dispatch<State>) => {
        sendMessage(command, (response: Status) => {
            dispatch(updateStatus(response));
        })
    };
}