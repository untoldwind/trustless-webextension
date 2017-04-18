import {UPDATE_STATUS, UPDATE_IDENTITIES, UPDATE_SECRETLIST} from '../actions';
import {handleActions, Action} from 'redux-actions';
import {Identity, SecretList, SecretEntry, Status} from '../models';

export interface State {
    initializing: boolean,
    locked: boolean,
    identities: Identity[],
    allTags: string[],
    secretEntries: SecretEntry[]
}

const reducers = handleActions<State>({
    [UPDATE_STATUS]: (state: State, action: Action<Status>) => {
        console.log("Updating");
        console.log(action.payload);
        return {
            ...state,
            initializing: false,
            locked: action.payload.locked
        };
    },
    [UPDATE_IDENTITIES]: (state: State, action: Action<Identity>) => {
        console.log("Updating1");
        console.log(action.payload);
        return {
            ...state,
            identities: action.payload
        };
    },
    [UPDATE_SECRETLIST]: (state: State, action: Action<SecretList>) => {
        console.log("Updating2");
        console.log(action.payload);
        return {
            ...state,
            allTags: action.payload.all_tags,
            secretEntries: action.payload.entries
        }
    }
}, {
    initializing: true,
    locked: true,
    identities: [],
    allTags: [],
    secretEntries: []
});

export default reducers;
