import * as React from "react";
import { State } from "../reducers";
import { returntypeof } from "../util/returntypeof";
import { BoundActions, actionBinder } from "../actions/bindables";
import { connect } from "react-redux";
import { Grid, Row } from "react-bootstrap";
import { SecretsFrame } from "./secrets-frame";
import { UnlockFrame } from "./unlock-frame";

const mapStateToProps = (state: State) => ({
  initializing: state.initializing,
  locked: state.locked,
});

const stateProps = returntypeof(mapStateToProps);

export type Props = BoundActions & typeof stateProps;

class PopupFrameImpl extends React.Component<Props, {}> {
  componentDidMount() {
    this.props.doUpdateStatus();
  }

  render() {
    const { initializing, locked } = this.props;

    if (initializing) {
      return (
        <Grid />
      )
    }
    if (locked) {
      return (
        <Grid>
          <Row>
            <UnlockFrame />
          </Row>
        </Grid>
      )
    }
    return (
      <Grid>
        <Row>
          <SecretsFrame />
        </Row>
      </Grid>
    )
  }
}

export const PopupFrame = connect(mapStateToProps, actionBinder)(PopupFrameImpl);