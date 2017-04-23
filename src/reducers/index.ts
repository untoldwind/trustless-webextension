import {
    OtherAction,
    UPDATE_IDENTITIES,
    UPDATE_SECRETLIST,
    UPDATE_STATUS,
    INSTRUMENT_TAB,
    UpdateStatusAction,
    UpdateIdentitiesAction,
    UpdateSecretListAction,
    InstrumentTabAction
} from "../actions";
import {Identity, SecretEntry} from "../models";

type Action =
    UpdateStatusAction |
    UpdateIdentitiesAction |
    UpdateSecretListAction |
    InstrumentTabAction |
    OtherAction;

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
        case INSTRUMENT_TAB:
            return {
                ...state,
                instrumentedURL: action.instrumentedURL,
                hasLoginForm: action.hasLoginForm,
                tabId: action.tabId
            };
        default:
            return state;
    }
}
