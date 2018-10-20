import * as React from "react";
import UnlockFrame from './unlock-frame';
import SecretsFrame from './secrets-frame';
import * as actions from '../actions';
import {bindActions} from '../util';
import { State } from "../reducers";
import { returntypeof } from "../util/returntypeof"

const mapStateToProps = (state: State) => (state);
  
const stateProps = returntypeof(mapStateToProps);


@connect(state => state, bindActions(actions))
export default class PopupFrame extends React.Component<any, any> {
    componentDidMount() {
        this.props.doUpdateStatus();
    }

    render(props) {
        if (props.initializing) {
            return (
                <Container fluid={true}/>
            )
        }
        if (props.locked) {
            return (
                <Container fluid={true}>
                    <UnlockFrame identities={props.identities}
                                 doUpdateIdentities={props.doUpdateIdentities}
                                 doUnlock={props.doUnlock}/>
                </Container>
            )
        }
        return (
            <Container fluid={true}>
                <SecretsFrame secretEntries={props.secretEntries}
                              filterMode={props.filterMode}
                              doUpdateSecretList={props.doUpdateSecretList}
                              doFillLoginForm={props.doFillLoginForm}/>
            </Container>
        )
    }
}
