import * as React from "react";
import { State } from "../reducers";
import { returntypeof } from "../util/returntypeof";
import { BoundActions, actionBinder } from "../actions/bindables";
import { connect } from "react-redux";
import Filter = chrome.sessions.Filter;
import { FilterModes, FilterMode } from "../models/filter-mode";
import { Nav, NavItem, TabPane, NavLink, TabContent, Container, Row, Col } from "reactstrap";
import { SecretEntriesList } from "./secrets-entries-list";
import { bind } from "decko";
import classnames from 'classnames';

const mapStateToProps = (state: State) => ({
  secretEntries: state.secretEntries,
  filterMode: state.filterMode,
});

const stateProps = returntypeof(mapStateToProps);

export type Props = BoundActions & typeof stateProps;

class SecretsFrameImpl extends React.Component<Props, any> {
  componentDidMount() {
    this.props.doUpdateSecretList(FilterModes.MatchingUrl);
  }

  @bind
  onTabSelected(filterMode: FilterMode): () => void {
    return () => {
      this.props.doUpdateSecretList(filterMode);
    }
  }

  render() {
    const activeKey = this.props.filterMode === FilterModes.MatchingUrl ? 1 : 2;
    return (
      <div>
        <Row>
          <Col>
            <Nav tabs>
              <NavItem>
                <NavLink className={classnames({ active: this.props.filterMode === FilterModes.MatchingUrl })} onClick={this.onTabSelected(FilterModes.MatchingUrl)}>Matching</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={classnames({ active: this.props.filterMode === FilterModes.All })} onClick={this.onTabSelected(FilterModes.All)}>All</NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
        <Row>
          <Col>
            <SecretEntriesList />
          </Col>
        </Row>
      </div>
    )
  }
}

export const SecretsFrame = connect(mapStateToProps, actionBinder)(SecretsFrameImpl);
