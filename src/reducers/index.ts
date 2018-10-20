import { Action, ActionCreators } from "../actions/action-creators";
import { Identity, SecretEntry } from "../models";

export interface State {
  initializing: boolean,
  locked: boolean,
  identities: Identity[],
  filterMode: FilterMode,
  allTags: string[],
  secretEntries: SecretEntry[]
  tabId?: number
  instrumentedURL?: string
  hasLoginForm?: boolean
}

export type FilterMode = 'MatchingUrl' | 'All';
export const FilterModeMatchingUrl: FilterMode = 'MatchingUrl';
export const FilterModeAll: FilterMode = 'All';

export const INITIAL_STATE: State = {
  initializing: true,
  locked: true,
  identities: [],
  filterMode: FilterModeMatchingUrl,
  allTags: [],
  secretEntries: []
};

export default function(state: State = INITIAL_STATE, action: Action): State {
  switch (action.type) {
    case ActionCreators.updateStatus.type:
      return {
        ...state,
        initializing: false,
        locked: action.payload.locked,
      };
    case ActionCreators.updateIdentities.type:
      return {
        ...state,
        identities: action.payload,
      };
    case ActionCreators.updateSecretList.type:
      return {
        ...state,
        filterMode: action.payload.filter,
        allTags: action.payload.list.all_tags,
        secretEntries: action.payload.list.entries,
      };
    case ActionCreators.instrumentTab.type:
      return {
        ...state,
        instrumentedURL: action.payload.instrumentedURL,
        hasLoginForm: action.payload.hasLoginForm,
        tabId: action.payload.tabId,
      };
    default:
      return state;
  }
}
