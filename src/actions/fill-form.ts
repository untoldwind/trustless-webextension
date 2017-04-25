import {Secret, SecretEntry} from "../models";
import {Dispatch} from "redux";
import {State} from "../reducers";
import {createCommand, sendNativeMessage} from "./browser-messaging";
import {fillLoginForm} from "./browser-tabs";

export function doFillLoginForm(entry: SecretEntry) {
    return (dispatch: Dispatch<State>, getState: () => State) => {
        const tabId = getState().tabId;

        if (typeof tabId === 'undefined') {
            return;
        }

        sendNativeMessage(createCommand('get', {id: entry.id})).then((response: Secret) => {
            console.log(response);
            fillLoginForm(tabId, response.current.properties.username, response.current.properties.password).then((success) => {
                console.log(success);
            });
        });
    }
}