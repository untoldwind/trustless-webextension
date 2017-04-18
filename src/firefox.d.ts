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

    export function connectNative(application: string): Port;

    export function sendNativeMessage(application: string, message: Object, responseCallback?: (response: any) => void): void;
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
    }
}
