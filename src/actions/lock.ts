import {Status, Identity} from '../models';
import {Dispatch} from 'redux';
import {State} from '../reducers';
import {sendNativeMessage, createCommand} from './browser-messaging';
import {updateStatus} from './status';

export function doLock() {
    return (dispatch: Dispatch<State>) => {
        sendNativeMessage(createCommand('lock'), (response: Status) => {
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
        sendNativeMessage(command, (response: Status) => {
            dispatch(updateStatus(response));
        })
    };
}