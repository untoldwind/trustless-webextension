import { Status } from "../models";
import { Dispatch } from "redux";
import { State } from "../reducers";
import { createCommand, sendNativeMessage } from "./browser-messaging";
import { ActionCreators } from "./action-creators";

export function doUpdateStatus(dispatch: Dispatch<State>): () => void {
  return () => {
    sendNativeMessage(createCommand('status')).then((response: Status) => {
      dispatch(ActionCreators.updateStatus.create(response));
    });
  };
}