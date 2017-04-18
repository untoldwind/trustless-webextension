/// <reference path="./firefox.d.ts"/>

// export const port = browser.runtime.connectNative('trustless');

export function refreshStatus() {
    browser.runtime.sendNativeMessage('trustless', {command:'ping'}, response => {
        console.log("Ping res");
        console.log(response);
    });
    browser.runtime.sendNativeMessage('trustless', {command:'status'}, response => {
        console.log("Status res");
        console.log(response);
    });
}

export function refreshIdentities() {
}