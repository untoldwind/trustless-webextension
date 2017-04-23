/// <reference path="../firefox.d.ts"/>

export interface Command<Args, Res> {
    command: string,
    args?: Args
}

export interface Response<Res> {
    command: string,
    response: Res,
    error?: string
}

export function createCommand<Args, Res>(command: string, args?: Args): Command<Args, Res> {
    return {
        command: command,
        args: args
    }
}

export function sendNativeMessage<Args, Res>(command: Command<Args, Res>, handler: (Res) => void) {
    if(BROWSER === 'firefox') {
        browser.runtime.sendNativeMessage('trustless', command, (response: Response<Res>) => {
            handler(response.response)
        });
    }
    if(BROWSER === 'chrome') {
        chrome.runtime.sendNativeMessage('io.github.trustless', command, (response: Response<Res>) => {
            handler(response.response)
        });
    }
}
