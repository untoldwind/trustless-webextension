import {h, Component, cloneElement} from 'preact';
import * as classNames from 'classnames';

export interface NavLinkProps {
    title: string
    active: boolean
    onSelected?: (event:Event) => void
}

export class NavLink extends Component<NavLinkProps, any> {
    render() {
        return (
            <li class="nav-item">
                <a class={classNames("nav-link", {active: this.props.active})}
                   onClick={this.props.onSelected}>{this.props.title}</a>
            </li>
        );
    }
}

export interface TabsProps {
    activeIndex: number
    onTabSeleced?: (event:Event, index: number) => void
}

export class Tabs extends Component<TabsProps, any> {
    onSelected(index: number) : (event:Event) => void {
        return (event:Event) => this.props.onTabSeleced && this.props.onTabSeleced(event, index)
    }

    render() {
        const titles = this.props.children.map(child => child.attributes.title);

        return (
            <div>
                <ul class="nav nav-tabs" role="tablist">
                    {titles.map((title, index) => (
                        <NavLink title={title}
                                 active={index === this.props.activeIndex}
                                 onSelected={this.onSelected(index)}/>
                    ))}
                </ul>

                <div class="tab-content">
                    {this.props.children.map((child, index) => cloneElement(child, {
                        active: index === this.props.activeIndex
                    }))}
                </div>
            </div>
        )
    }
}

export interface TabProps {
    title: string
    active?: boolean
}

export class Tab extends Component<TabProps, any> {
    render() {
        return (
            <div class={classNames("tab-pane", "fade", {show: this.props.active}, {active: this.props.active})}>
                {this.props.children}
            </div>
        )
    }
}