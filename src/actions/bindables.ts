import { bindBindableActions } from "../util/minithunk";
import { Dispatch } from "redux";
import { State } from "../reducers";
import { doUpdateStatus } from "./status";
import { doLock, doUnlock } from "./lock";
import { Identity, SecretEntry } from "../models";
import { doUpdateIdentities } from "./identities";
import { doFillLoginForm } from "./fill-form";
import { doUpdateSecretList } from "./list";
import { FilterMode } from "../models/filter-mode";

export type BoundActions = {
  doUpdateStatus: () => void,
  doLock: () => void,
  doUnlock: (identitiy: Identity, passphrase: string) => void,
  doUpdateIdentities: () => void,
  doUpdateSecretList: (filterMode: FilterMode) => void,
  doFillLoginForm: (entry: SecretEntry, tabId?: number) => void
}

export function actionBinder(dispatch: Dispatch<State>): BoundActions {
  return bindBindableActions<State, BoundActions>(dispatch, {
    doUpdateStatus,
    doLock,
    doUnlock,
    doUpdateIdentities,
    doUpdateSecretList,
    doFillLoginForm,
  })
}