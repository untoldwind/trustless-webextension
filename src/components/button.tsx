import {h, Component} from "preact";


export type ButtonType = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'link';

export interface ButtonProps {
    type: ButtonType
    label:string
}

export class Button extends Component<ButtonProps, any> {
    render() {
        return (
            <button class={`btn btn-${this.props.type}`}>{this.props.label}</button>
        )
    }
}

export class SubmitButton extends Component<ButtonProps, any> {
    render() {
        return (
            <button class={`btn btn-${this.props.type}`} type="submit">{this.props.label}</button>
        )
    }
}
