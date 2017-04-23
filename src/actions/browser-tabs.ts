/// <reference path="../firefox.d.ts"/>

import {CHECK_MESSAGE_TYPE, FILL_MESSAGE_TYPE, CheckResponse, FillResponse} from '../models/messages';

export function instrumentCurrentTab(callback: (hasLoginForm: boolean, tabId?: number, url?: string) => void) {
    if (BROWSER === 'firefox') {
        browser.tabs.query({active: true, currentWindow: true}, (tabs: browser.tabs.Tab[]) => {
            if (tabs.length === 1) {
                const tabId = tabs[0].id;
                browser.tabs.executeScript(tabId, {
                    file: 'page-analyzer.js'
                }, () => {
                    browser.tabs.sendMessage(tabId, {
                        type: CHECK_MESSAGE_TYPE
                    }, (response: CheckResponse) => {
                        callback(response.hasLoginForm, tabId, response.url);
                    });
                });
            } else {
                callback(false);
            }
        });
    }
    if (BROWSER === 'chrome') {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs: chrome.tabs.Tab[]) => {
            if (tabs.length === 1) {
                const tabId = tabs[0].id;
                chrome.tabs.executeScript(tabId, {
                    file: 'page-analyzer.js'
                }, () => {
                    chrome.tabs.sendMessage(tabId, {
                        type: CHECK_MESSAGE_TYPE
                    }, (response: CheckResponse) => {
                        callback(response.hasLoginForm, tabId, response.url);
                    });
                });
            } else {
                callback(false);
            }
        });
    }
}

export function fillLoginForm(tabId: number, username: string, password: string, callback: (boolean) => void) {
    if (BROWSER === 'firefox') {
        browser.tabs.sendMessage(tabId, {
            type: FILL_MESSAGE_TYPE,
            username: username,
            password: password
        }, (response: FillResponse) => {
            callback(response.filled);
        });
    }
    if (BROWSER === 'chrome') {
        chrome.tabs.sendMessage(tabId, {
            type: FILL_MESSAGE_TYPE,
            username: username,
            password: password
        }, (response: FillResponse) => {
            callback(response.filled);
        });
    }
}