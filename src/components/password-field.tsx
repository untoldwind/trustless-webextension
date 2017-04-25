import {h, Component} from 'preact';

export interface PasswordFieldProps {
    name: string,
    label: string,
    autofocus?: boolean,
    onInput?: (Event) => void
}

export default class PasswordField extends Component<PasswordFieldProps, any> {
    inputElement: HTMLInputElement;

    componentDidMount() {
        if (this.props.autofocus && this.inputElement) {
            this.inputElement.focus();
        }
    }

    render() {
        return (
            <div class="form-group">
                <label for={this.props.name}>{this.props.label}</label>
                <input class="form-control"
                       type="password"
                       ref={element => {
                           this.inputElement = element as HTMLInputElement;
                       }}
                       id={this.props.name}
                       onInput={this.props.onInput}
                       autofocus={this.props.autofocus}/>
            </div>
        )
    }
}
