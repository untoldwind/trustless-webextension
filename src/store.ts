import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk'
import reducers from './reducers';
import {State} from './reducers';

const initial = {
  initializing: true,
  locked : true,
  identities: [],
  allTags: [],
  secretEntries: []
};

export const store = createStore<State>(reducers, initial, applyMiddleware(ReduxThunk));

