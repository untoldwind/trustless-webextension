import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux"
import { PopupFrame } from './components/popup-frame';
import { store } from './store';

render((
  <Provider store={store}>
    <PopupFrame />
  </Provider>
), document.body);

