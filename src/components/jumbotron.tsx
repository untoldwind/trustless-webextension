import {h, Component} from 'preact';

export interface JumbotronProps {
    fluid?: boolean
}

export default class Jumbotron extends Component<JumbotronProps, any> {
    render() {
        const className = this.props.fluid ? 'jumbotron-fluid' : 'jumbotron';
        return (
            <div class={className}>
                {this.props.children}
            </div>
        )
    }
}