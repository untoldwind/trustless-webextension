import {h, Component} from 'preact';
import {SecretEntry} from "../models";
import {List, ListItem} from './list';

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
            <List>
                {this.props.secretEntries.map(entry => (
                    <ListItem active={false}>
                        {entry.name}
                    </ListItem>
                ))}
            </List>
        )
    }
}