import {h, Component} from 'preact';
import {SecretEntry} from "../models/index";

export interface SecretsFrameProps {
    doUpdateSecretList: () => void,
    secretEntries: SecretEntry[]
}

export default class SecretsFrame extends Component<SecretsFrameProps, any> {
    componentDidMount() {
        this.props.doUpdateSecretList();
    }

    render(props) {
        return (
            <div>Bla</div>
        )
    }
}