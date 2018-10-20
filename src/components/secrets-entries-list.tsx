import * as React from "react";
import { State } from "../reducers";
import { returntypeof } from "../util/returntypeof";
import { BoundActions, actionBinder } from "../actions/bindables";
import { connect } from "react-redux";
import { SecretEntry } from "../models";
import { Jumbotron, ListGroup, ListGroupItem } from "reactstrap";

const mapStateToProps = (state: State) => ({
  entries: state.secretEntries,
});

const stateProps = returntypeof(mapStateToProps);

export type Props = BoundActions & typeof stateProps;

class SecretEntriesListImpl extends React.Component<Props, {}> {
  onSecretEntryFill(entry: SecretEntry): (Event) => void {
    return () => {
      this.props.doFillLoginForm(entry);
    }
  }

  render() {
    if (this.props.entries.length === 0) {
      return (
        <Jumbotron>
          <h1>No matches</h1>
        </Jumbotron>
      )
    }
    return (
      <ListGroup>
        {this.props.entries.map(entry => (
          <ListGroupItem active={false} onClick={this.onSecretEntryFill(entry)}>
            {entry.name}
          </ListGroupItem>
        ))}
      </ListGroup>
    )
  }
}

export const SecretEntriesList = connect(mapStateToProps, actionBinder)(SecretEntriesListImpl);
