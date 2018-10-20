import * as React from "react";
import { State } from "../reducers";
import { returntypeof } from "../util/returntypeof";
import { BoundActions, actionBinder } from "../actions/bindables";
import { connect } from "react-redux";
import { bind } from "decko";
import { FormGroup, FormControl, Button } from "react-bootstrap";

const mapStateToProps = (state: State) => ({
  identities: state.identities,
});

const stateProps = returntypeof(mapStateToProps);

export type Props = BoundActions & typeof stateProps;

interface UnlockFrameState {
  passphrase?: string,
  identityEmail?: string
}

 class UnlockFrameImpl extends React.Component<Props, UnlockFrameState> {
  getInitialState() {
    if (this.props.identities.length > 0) {
      return {
        identityEmail: this.props.identities[0].email,
      }
    }
    return {}
  }

  componentDidMount() {
    this.props.doUpdateIdentities();
  }

  componentDidUpdate() {
    if (this.props.identities.length > 0) {
      this.setState({
        identityEmail: this.props.identities[0].email,
      })
    }
  }

  @bind
  submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();

    const selectedIdentity = this.props.identities.filter(identity => identity.email === this.state.identityEmail);

    if (selectedIdentity.length === 0) {
      return
    }

    this.props.doUnlock(selectedIdentity.pop(), this.state.passphrase);
  }

  @bind
  onChangeIdentity(event: React.FormEvent<FormControl & HTMLSelectElement>) {
    this.setState({
      identityEmail: event.currentTarget.value,
    })
  }

  @bind
  onChangePassphrase(event: React.FormEvent<FormControl & HTMLInputElement>) {
    this.setState({
      passphrase: event.currentTarget.value,
    })
  }

  render() {
    return (
      <form onSubmit={this.submit}>
        <FormGroup>
          <FormControl componentClass="select" onChange={this.onChangeIdentity} value={this.state.identityEmail}>
            {this.props.identities.map(identity => (
              <option value={identity.email}>{identity.name}</option>
            ))}
          </FormControl>
        </FormGroup>
        <FormGroup>
          <FormControl type="password" autoFocus={true} onInput={this.onChangePassphrase}/>
          </FormGroup>
        <Button type="submit">Unlock</Button>
      </form>
    )
  }
}

export const UnlockFrame = connect(mapStateToProps, actionBinder)(UnlockFrameImpl);

