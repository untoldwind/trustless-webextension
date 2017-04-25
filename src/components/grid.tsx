import {h, Component} from 'preact';
import * as classNames from 'classnames';

export type VerticalAlignment = 'start' | 'center' | 'end';
export type HorizontalAlignment = 'start' | 'center' | 'end' | 'around' | 'between';

export interface RowProps {
    horizonalAlign? : HorizontalAlignment
    verticalAlign? : VerticalAlignment
}

export class Row extends Component<RowProps, any> {
    render() {
        const alignItems = this.props.verticalAlign ? `align-items-${this.props.verticalAlign}` : undefined;
        const justifyContent = this.props.horizonalAlign ? `justify-content-${this.props.horizonalAlign}` : undefined;

        return (
            <div class={classNames("row", alignItems, justifyContent)}>
                {this.props.children}
            </div>
        )
    }
}

export interface ColProps {
    cols?: number
    verticalAlign? : VerticalAlignment
}

export class Col extends Component<ColProps, any> {
    render() {
        const cols = this.props.cols ? `col-${this.props.cols}` : 'col';
        const alignSelf = this.props.verticalAlign ? `align-self-${this.props.verticalAlign}` : undefined;

        return (
            <div class={classNames(cols, alignSelf)}>
                {this.props.children}
            </div>
        )
    }
}
