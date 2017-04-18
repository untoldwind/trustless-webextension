import {h, Component} from 'preact';

export interface SelectFieldOption {
    value: string,
    label: string
}

export interface SelectFieldProps {
    name: string,
    value: string,
    label: string,
    options: SelectFieldOption[],
    onChange?: (Event) => void
}

export default class SelectField extends Component<SelectFieldProps, any> {
    render() {
        return (
            <div class="form-group">
                <label for={this.props.name}>{this.props.label}</label>
                <select id={this.props.name} class="form-control" value={this.props.value}
                        onChange={this.props.onChange}>
                    {this.props.options.map(opt => <option value={opt.value}>{opt.label}</option>)}
                </select>
            </div>
        )
    }
}
