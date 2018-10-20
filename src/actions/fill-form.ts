import { Secret, SecretEntry } from "../models";
import { Dispatch } from "redux";
import { State } from "../reducers";
import { createCommand, sendNativeMessage } from "./browser-messaging";
import { fillLoginForm } from "./browser-tabs";

export function doFillLoginForm(dispatch: Dispatch<State>): (entry: SecretEntry, tabId?: number) => void {
  return (entry: SecretEntry, tabId?: number) => {
    if (typeof tabId === 'undefined') {
      return;
    }

    sendNativeMessage(createCommand('get', { id: entry.id })).then((response: Secret) => {
      console.log(response);
      fillLoginForm(tabId, response.current.properties.username, response.current.properties.password).then((success) => {
        console.log(success);
      });
    });
  }
}