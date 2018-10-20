import * as React from "react";
import { State } from "../reducers";
import { returntypeof } from "../util/returntypeof";
import { BoundActions, actionBinder } from "../actions/bindables";
import { connect } from "react-redux";
import Filter = chrome.sessions.Filter;

const mapStateToProps = (state: State) => (state);

const stateProps = returntypeof(mapStateToProps);

export type Props = BoundActions & typeof stateProps;

class SecretsFrameImpl extends React.Component<Props, any> {
  componentDidMount() {
    this.props.doUpdateSecretList(FilterModeMatchingUrl);
  }

  @bind
  onTabSelected(event: Event, index: number) {
    switch (index) {
      case 0:
        this.props.doUpdateSecretList(FilterModeMatchingUrl);
        return;
      case 1:
        this.props.doUpdateSecretList(FilterModeAll);
        return;
    }
  }

  render() {
    let index = 0;

    switch (this.props.filterMode) {
      case FilterModeMatchingUrl:
        index = 0;
        break;
      case FilterModeAll:
        index = 1;
        break;
    }
    return (
      <Tabs activeIndex={index} onTabSeleced={this.onTabSelected}>
        <Tab title="Matching">
          <SecretEntriesList entries={this.props.secretEntries} doFillLoginForm={this.props.doFillLoginForm} />
        </Tab>
        <Tab title="All">
          <SecretEntriesList entries={this.props.secretEntries} doFillLoginForm={this.props.doFillLoginForm} />
        </Tab>
      </Tabs>
    )
  }
}

export const SecretsFrame = connect(mapStateToProps, actionBinder)(SecretsFrameImpl);
