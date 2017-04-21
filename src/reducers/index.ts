import {OtherAction, UPDATE_IDENTITIES, UPDATE_SECRETLIST, UPDATE_STATUS} from "../actions";
import {Identity, SecretEntry} from "../models";
import {UpdateStatusAction} from "../actions/status";
import {UpdateIdentitiesAction} from "../actions/identities";
import {UpdateSecretListAction} from "../actions/list";

type Action =
    UpdateStatusAction |
    UpdateIdentitiesAction |
    UpdateSecretListAction |
    OtherAction;

export interface State {
    initializing: boolean,
    locked: boolean,
    identities: Identity[],
    filterMode: FilterMode,
    allTags: string[],
    secretEntries: SecretEntry[]
}

export type FilterMode = 'MatchingUrl' | 'All';
export const FilterModeMatchingUrl: FilterMode = 'MatchingUrl';
export const FilterModeAll: FilterMode = 'All';

export const INITIAL_STATE = {
    initializing: true,
    locked: true,
    identities: [],
    filterMode: FilterModeMatchingUrl,
    allTags: [],
    secretEntries: []
};

export default function (state: State = INITIAL_STATE, action: Action = OtherAction): State {
    switch (action.type) {
        case UPDATE_STATUS:
            return {
                ...state,
                initializing: false,
                locked: action.status.locked
            };
        case UPDATE_IDENTITIES:
            return {
                ...state,
                identities: action.identities
            };
        case UPDATE_SECRETLIST:
            return {
                ...state,
                filterMode: action.filterMode,
                allTags: action.list.all_tags,
                secretEntries: action.list.entries
            };
        default:
            return state;
    }
}
