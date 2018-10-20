import { ActionCreator } from "../util/action-creator";
import { Status, SecretList, Identity } from "../models";
import { FilterMode } from "../models/filter-mode";

export const ActionCreators = {
  updateSecretList: new ActionCreator<'UPDATE_SECRETLIST', { list: SecretList, filter: FilterMode }>('UPDATE_SECRETLIST'),
  updateIdentities: new ActionCreator<'UPDATE_IDENTITIES', Identity[]>('UPDATE_IDENTITIES'),
  updateStatus: new ActionCreator<'UPDATE_STATUS', Status>('UPDATE_STATUS'),
  instrumentTab: new ActionCreator<'INSTRUMENT_TAB', { tabId: number, hasLoginForm: boolean, instrumentedURL?: string }>('INSTRUMENT_TAB'),
}

export type Action = typeof ActionCreators[keyof typeof ActionCreators];
