import {h, Component} from 'preact';

export class Row extends Component<any, any> {
    render(props) {
        return (
            <div class="row">
                {props.children}
            </div>
        )
    }
}

export interface ColProps {
    cols?: number
}

export class Col extends Component<ColProps, any> {
    render(props) {
        const cols = props.cols || 1;

        return (
            <div class={`col s${cols}`}>
                {props.children}
            </div>
        )
    }
}
