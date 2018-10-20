import { Identity } from "../models";
import { Dispatch } from "redux";
import { State } from "../reducers";
import { createCommand, sendNativeMessage } from "./browser-messaging";
import { ActionCreators } from "./action-creators";


export function doUpdateIdentities(dispatch: Dispatch<State>): () => void {
  return () => {
    sendNativeMessage(createCommand('identities')).then((response: Identity[]) => {
      dispatch(ActionCreators.updateIdentities.create(response));
    });
  }
}