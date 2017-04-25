import {h, Component} from 'preact';
import PasswordField from './password-field';
import SelectField from './select-field';
import {SubmitButton} from './button';
import {Row, Col} from './grid';
import {bind} from 'decko';
import linkState from 'linkstate';
import {Identity} from '../models';

export interface UnlockFrameProps {
    identities: Identity[],
    doUpdateIdentities: () => void,
    doUnlock: (Identity, string) => void
}

interface UnlockFrameState {
    passphrase?: string,
    identityEmail?: string
}

export default class UnlockFrame extends Component<UnlockFrameProps, UnlockFrameState> {
    getInitialState() {
        if (this.props.identities.length > 0) {
            return {
                identityEmail: this.props.identities[0].email
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
                identityEmail: this.props.identities[0].email
            })
        }
    }

    @bind
    submit(event: Event) {
        event.preventDefault();
        event.stopPropagation();

        const selectedIdentity = this.props.identities.filter(identity => identity.email === this.state.identityEmail);

        if (selectedIdentity.length === 0) {
            return
        }

        this.props.doUnlock(selectedIdentity.pop(), this.state.passphrase);
    }

    render(props) {
        return (
            <form onSubmit={this.submit}>
                <SelectField name="identity" label="Identity"
                             value={this.state.identityEmail}
                             onChange={linkState(this, 'identityEmail')}
                             options={this.props.identities.map(identity => ({
                                 value: identity.email,
                                 label: `${identity.name} <${identity.email}>`
                             }))}/>
                <PasswordField name="passphrase" label="Passphrase" autofocus={true}
                               onInput={linkState(this, 'passphrase')}/>
                <Row horizonalAlign="center">
                    <Col  cols={4}>
                        <SubmitButton type="danger" label="Unlock"/>
                    </Col>
                </Row>
            </form>
        )
    }
}
