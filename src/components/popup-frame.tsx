import * as React from "react";
import { State } from "../reducers";
import { returntypeof } from "../util/returntypeof";
import { BoundActions, actionBinder } from "../actions/bindables";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
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
        <Container />
      )
    }
    if (locked) {
      return (
        <Container>
          <Row>
            <Col>
              <UnlockFrame />
            </Col>
          </Row>
        </Container>
      )
    }
    return (
      <Container>
        <Row>
          <Col>
            <SecretsFrame />
          </Col>
        </Row>
      </Container>
    )
  }
}

export const PopupFrame = connect(mapStateToProps, actionBinder)(PopupFrameImpl);