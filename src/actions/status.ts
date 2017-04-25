import {Status} from "../models";
import {Dispatch} from "redux";
import {State} from "../reducers";
import {createCommand, sendNativeMessage} from "./browser-messaging";

export type UPDATE_STATUS = 'UPDATE_STATUS';
export const UPDATE_STATUS: UPDATE_STATUS = 'UPDATE_STATUS';

export type UpdateStatusAction = {
    type: UPDATE_STATUS,
    status: Status
}

export function updateStatus(status: Status): UpdateStatusAction {
    return {
        type: UPDATE_STATUS,
        status: status
    }
}

export function doUpdateStatus() {
    return (dispatch: Dispatch<State>) => {
        sendNativeMessage(createCommand('status')).then((response: Status) => {
            dispatch(updateStatus(response));
        });
    };
}