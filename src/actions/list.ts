import { SecretList } from "../models";
import { Dispatch } from "redux";
import { FilterMode, FilterModeMatchingUrl, State } from "../reducers";
import { createCommand, sendNativeMessage } from "./browser-messaging";
import { instrumentCurrentTab } from "./browser-tabs";
import { ActionCreators } from "./action-creators";

export function doUpdateSecretList(filterMode: FilterMode) {
  return (dispatch: Dispatch<State>) => {
    instrumentCurrentTab().then(result => {
      dispatch(ActionCreators.instrumentTab.create({ tabId: result.tabId, hasLoginForm: result.hasLoginForm, instrumentedURL: result.url }));
      let filter: any = { type: 'login' };
      if (result.url && filterMode === FilterModeMatchingUrl) {
        filter = { url: result.url, type: 'login' }
      }
      sendNativeMessage(createCommand('list', filter)).then((response: SecretList) => {
        dispatch(ActionCreators.updateSecretList.create({ list: response, filter: filterMode }));
      });
    });
  };
}