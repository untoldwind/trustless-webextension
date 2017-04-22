/// <reference path="../firefox.d.ts"/>

export function getCurrentUrl(callback: (url?: string) => void) {
    if(BROWSER === 'firefox') {
        browser.tabs.query({active: true, currentWindow: true}, (tabs: browser.tabs.Tab[]) => {
            if (tabs.length === 1) {
                callback(tabs[0].url);
            } else {
                callback();
            }
        });
    }
    if(BROWSER === 'chrome') {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs: chrome.tabs.Tab[]) => {
            if (tabs.length === 1) {
                callback(tabs[0].url);
            } else {
                callback();
            }
        });
    }
}
