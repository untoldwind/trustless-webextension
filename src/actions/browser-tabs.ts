/// <reference path="../firefox.d.ts"/>

import {CHECK_MESSAGE_TYPE, FILL_MESSAGE_TYPE, CheckResponse, FillResponse} from '../models/messages';
import tabId = chrome.devtools.inspectedWindow.tabId;

function queryActiveTab(): Promise<number> {
    if (BROWSER === 'firefox') {
        return browser.tabs.query({active: true, currentWindow: true}).then(tabs => {
            if (tabs.length === 1) {
                return tabs[0].id;
            } else {
                throw new Error("No active tab");
            }
        })
    }
    if (BROWSER === 'chrome') {
        return new Promise<number>((resolve, reject) => {
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs: chrome.tabs.Tab[]) {
                if (arguments.length === 0) {
                    reject(chrome.runtime.lastError);
                } else if (tabs.length === 1) {
                    resolve(tabs[0].id);
                } else {
                    reject(new Error("No active tab"));
                }
            });
        })
    }
}

function executePaseAnalyzer(tabId: number): Promise<number> {
    if (BROWSER === 'firefox') {
        return browser.tabs.executeScript(tabId, {
            file: 'page-analyzer.js'
        }).then(() => tabId);
    }
    if (BROWSER === 'chrome') {
        return new Promise<number>((resolve, reject) => {
            chrome.tabs.executeScript(tabId, {
                file: 'page-analyzer.js'
            }, function () {
                if (arguments.length === 0) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve(tabId);
                }
            });
        });
    }
}

export interface InstrumentResult {
    hasLoginForm: boolean
    tabId: number
    url: string
}

function sendCheckMessage(tabId: number): Promise<InstrumentResult> {
    if (BROWSER === 'firefox') {
        return browser.tabs.sendMessage(tabId, {
            type: CHECK_MESSAGE_TYPE
        }).then((response: CheckResponse) => ({
            hasLoginForm: response.hasLoginForm,
            tabId: tabId,
            url: response.url
        }));
    }
    if (BROWSER === 'chrome') {
        return new Promise<InstrumentResult>((resolve, reject) => {
            chrome.tabs.sendMessage(tabId, {
                type: CHECK_MESSAGE_TYPE
            }, function (response: CheckResponse) {
                if (arguments.length === 0) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve({
                        hasLoginForm: response.hasLoginForm,
                        tabId: tabId,
                        url: response.url
                    });
                }
            });
        });
    }
}

export function instrumentCurrentTab(): Promise<InstrumentResult> {
    return queryActiveTab().then(executePaseAnalyzer).then(sendCheckMessage);
}

export function fillLoginForm(tabId: number, username: string, password: string): Promise<boolean> {
    if (BROWSER === 'firefox') {
        return browser.tabs.sendMessage(tabId, {
            type: FILL_MESSAGE_TYPE,
            username: username,
            password: password
        }).then((response: FillResponse) => response.filled);
    }
    if (BROWSER === 'chrome') {
        return new Promise<boolean>((resolve, reject) => {
            chrome.tabs.sendMessage(tabId, {
                type: FILL_MESSAGE_TYPE,
                username: username,
                password: password
            }, function (response: FillResponse) {
                if (arguments.length === 0) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve(response.filled);
                }
            });
        });
    }
}