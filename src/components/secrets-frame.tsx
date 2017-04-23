import {h, Component} from 'preact';
import {SecretEntry} from "../models";
import {List, ListItem} from './list';
import Jumbotron from './jumbotron';
import {Tabs, Tab} from './tabs';
import {bind} from 'decko';
import {FilterMode, FilterModeAll, FilterModeMatchingUrl} from "../reducers/index";
import Filter = chrome.sessions.Filter;

export interface SecretEntriesListProps {
    entries: SecretEntry[]
    doFillLoginForm: (entry: SecretEntry) => void
}

export class SecretEntriesList extends Component<SecretEntriesListProps, any> {
    onSecretEntryFill(entry: SecretEntry): (Event) => void {
        return () => {
            this.props.doFillLoginForm(entry);
        }
    }

    render() {
        if (this.props.entries.length === 0) {
            return (
                <Jumbotron>
                    <h1>No matches</h1>
                </Jumbotron>
            )
        }
        return (
            <List>
                {this.props.entries.map(entry => (
                    <ListItem active={false} onClick={this.onSecretEntryFill(entry)}>
                        {entry.name}
                    </ListItem>
                ))}
            </List>
        )
    }
}

export interface SecretsFrameProps {
    doUpdateSecretList: (filterMode: FilterMode) => void
    doFillLoginForm: (entry: SecretEntry) => void
    secretEntries: SecretEntry[]
    filterMode: FilterMode
}

export default class SecretsFrame extends Component<SecretsFrameProps, any> {
    componentDidMount() {
        this.props.doUpdateSecretList(FilterModeMatchingUrl);
    }

    @bind
    onTabSelected(event: Event, index: number) {
        switch (index) {
            case 0:
                this.props.doUpdateSecretList(FilterModeMatchingUrl);
                return;
            case 1:
                this.props.doUpdateSecretList(FilterModeAll);
                return;
        }
    }

    render() {
        let index = 0;

        switch (this.props.filterMode) {
            case FilterModeMatchingUrl:
                index = 0;
                break;
            case FilterModeAll:
                index = 1;
                break;
        }
        return (
            <Tabs activeIndex={index} onTabSeleced={this.onTabSelected}>
                <Tab title="Matching">
                    <SecretEntriesList entries={this.props.secretEntries} doFillLoginForm={this.props.doFillLoginForm}/>
                </Tab>
                <Tab title="All">
                    <SecretEntriesList entries={this.props.secretEntries} doFillLoginForm={this.props.doFillLoginForm}/>
                </Tab>
            </Tabs>
        )
    }
}