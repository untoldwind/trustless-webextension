import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import PopupFrame from './components/popup-frame';
import { store } from './store';

render((
  <Provider store={store}>
    <PopupFrame />
  </Provider>
), document.body);

