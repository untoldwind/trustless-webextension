import { h, render } from 'preact';
import {Provider} from 'preact-redux';
import PopupFrame from './components/popup-frame';
import {store} from './store';

import 'materialize-css/bin/materialize.css';
import 'materialize-css';

render((
  <Provider store={store}>
    <PopupFrame/>
  </Provider>
), document.body);

