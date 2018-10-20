import { SecretList } from "../models";
import { Dispatch } from "redux";
import { State } from "../reducers";
import { createCommand, sendNativeMessage } from "./browser-messaging";
import { instrumentCurrentTab } from "./browser-tabs";
import { ActionCreators } from "./action-creators";
import { FilterMode, FilterModes } from "../models/filter-mode";

export function doUpdateSecretList(dispatch: Dispatch<State>): (filterMode: FilterMode) => void {
  return (filterMode: FilterMode) => {
    instrumentCurrentTab().then(result => {
      dispatch(ActionCreators.instrumentTab.create({ tabId: result.tabId, hasLoginForm: result.hasLoginForm, instrumentedURL: result.url }));
      let filter: any = { type: 'login' };
      if (result.url && filterMode === FilterModes.MatchingUrl) {
        filter = { url: result.url, type: 'login' }
      }
      sendNativeMessage(createCommand('list', filter)).then((response: SecretList) => {
        dispatch(ActionCreators.updateSecretList.create({ list: response, filter: filterMode }));
      });
    });
  };
}