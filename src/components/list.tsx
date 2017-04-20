import {h, Component} from 'preact';

export class List extends Component<any, any> {
    render() {
        return (
            <div class="list-group">
                {this.props.children}
            </div>
        )
    }
}

export interface ListItemProps {
    active:boolean,
    onClick?: (Event) => void
}

export class ListItem extends Component<ListItemProps, any> {
    render() {
        return (
            <a href="#" class="list-group-item list-group-item-action" onClick={this.props.onClick}>
                {this.props.children}
            </a>
        )
    }
}