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
    args: args,
  }
}

export function sendNativeMessage<Args, Res>(command: Command<Args, Res>): Promise<Res> {
  if (BROWSER === 'firefox') {
    return browser.runtime.sendNativeMessage('trustless', command).then(response => response.response);
  }
  if (BROWSER === 'chrome') {
    return new Promise<Res>((resolve, reject) => {
      chrome.runtime.sendNativeMessage('io.github.trustless', command, function(response: Response<Res>) {
        if (arguments.length === 0) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(response.response);
        }
      });
    });

  }
}
