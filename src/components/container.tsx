import {h, Component, FunctionalComponent} from 'preact';

export interface ContainerProps {
    fluid?: boolean
}

export default class Container extends Component<ContainerProps, any> {
    render() {
        const className = this.props.fluid ? 'container-fluid' : 'container';
        return (
            <div class={className}>
                {this.props.children}
            </div>
        )
    }
}
