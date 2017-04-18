import {h, Component} from 'preact';

export interface PasswordFieldProps {
    name: string,
    label: string,
    onInput?: (Event) => void
}

export default class PasswordField extends Component<PasswordFieldProps, any> {
    render() {
        return (
            <div class="form-group">
                <label for={this.props.name}>{this.props.label}</label>
                <input class="form-control" type="password" id={this.props.name} onInput={this.props.onInput}/>
            </div>
        )
    }
}
