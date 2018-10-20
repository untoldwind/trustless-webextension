import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk'
import { reducers, INITIAL_STATE } from './reducers';
import { State } from './reducers';

export const store = createStore<State>(reducers, INITIAL_STATE, applyMiddleware(ReduxThunk));

