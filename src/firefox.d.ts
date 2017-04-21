declare namespace browser.runtime {
    interface Port {
        postMessage: (message: Object) => void;
        disconnect: () => void;
        onDisconnect: PortDisconnectEvent;
        onMessage: PortMessageEvent;
        name: string;
    }

    interface PortDisconnectEvent extends browser.events.Event<(port: Port) => void> {
    }

    interface PortMessageEvent extends browser.events.Event<(message: Object, port: Port) => void> {
    }

    interface MessageSender {}

    interface ExtensionMessageEvent extends browser.events.Event<(message: any, sender: MessageSender, sendResponse: (response: any) => void) => void> {}

    interface ExtensionConnectEvent extends browser.events.Event<(port: Port) => void> {}

    export function connectNative(application: string): Port;

    export function sendMessage(message: any, responseCallback?: (response: any) => void): void;

    export function sendNativeMessage(application: string, message: Object, responseCallback?: (response: any) => void): void;

    var onConnect: ExtensionConnectEvent;

    var onMessage: ExtensionMessageEvent;
}

declare namespace browser.browserAction {
    interface BrowserClickedEvent extends browser.events.Event<(tab: browser.tabs.Tab) => void> {
    }

    var onClicked: BrowserClickedEvent;
}

declare namespace browser.events {
    interface Event<T extends Function> {
        addListener(callback: T): void;
    }
}

declare namespace browser.tabs {
    interface Tab {
        id?: number;
        title?: string;
        url?: string;
        active: boolean;
    }

    interface QueryInfo {
        status?: string;
        active?: boolean;
        url?: string | string[];
        currentWindow?: boolean;
        windowId?: number;
    }

    interface InjectDetails {
        allFrames?: boolean;
        code?: string;
        runAt?: string;
        file?: string;
        frameId?: number;
        matchAboutBlank?: boolean;
    }

    interface ConnectInfo {
        name?: string;
        frameId?: number;
    }


    export function executeScript(details: InjectDetails, callback?: (result: any[]) => void): void;

    export function executeScript(tabId: number, details: InjectDetails, callback?: (result: any[]) => void): void;

    export function query(queryInfo: QueryInfo, callback: (result: Tab[]) => void): void;

    export function getCurrent(callback: (tab?: Tab) => void): void;

    export function sendMessage(tabId: number, message: any, responseCallback?: (response: any) => void): void;

    export function connect(tabId: number, connectInfo?: ConnectInfo): runtime.Port;
}

declare namespace browser.windows {
    interface Window {
        tabs?: browser.tabs.Tab[];
        id: number;
    }

    var WINDOW_ID_CURRENT: number;

    export function getCurrent(callback: (window: Window) => void): void;
}