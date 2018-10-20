import { Status, Identity } from '../models';
import { Dispatch } from 'redux';
import { State } from '../reducers';
import { sendNativeMessage, createCommand } from './browser-messaging';
import { ActionCreators } from "./action-creators";

export function doLock(dispatch: Dispatch<State>): () => void {
  return () => {
    sendNativeMessage(createCommand('lock')).then((response: Status) => {
      dispatch(ActionCreators.updateStatus.create(response));
    })
  };
}

export function doUnlock(dispatch: Dispatch<State>): (identitiy: Identity, passphrase: string) => void {
  return (identitiy: Identity, passphrase: string) => {
    const command = createCommand('unlock', {
      ...identitiy,
      passphrase: passphrase,
    });

    sendNativeMessage(command).then((response: Status) => {
      dispatch(ActionCreators.updateStatus.create(response));
    })
  }
}