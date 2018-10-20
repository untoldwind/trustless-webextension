import { bindBindableActions } from "../util/minithunk";
import { Dispatch } from "redux";
import { State } from "../reducers";
import { doUpdateStatus } from "./status";
import { doLock, doUnlock } from "./lock";
import { Identity, SecretEntry } from "../models";
import { doUpdateIdentities } from "./identities";
import { doFillLoginForm } from "./fill-form";

export type BoundActions = {
  doUpdateStatus: () => void,
  doLock: () => void,
  doUnlock: (identitiy: Identity, passphrase: string) => void,
  doUpdateIdentities: () => void,
  doFillLoginForm: (entry: SecretEntry, tabId?: number) => void
}

export function actionBinder(dispatch: Dispatch<State>): BoundActions {
  return bindBindableActions<State, BoundActions>(dispatch, {
    doUpdateStatus,
    doLock,
    doUnlock,
    doUpdateIdentities,
    doFillLoginForm,
  })
}