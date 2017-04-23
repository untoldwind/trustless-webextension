export type INSTRUMENT_TAB = 'INSTRUMENT_TAB';
export const INSTRUMENT_TAB: INSTRUMENT_TAB = 'INSTRUMENT_TAB';

export type InstrumentTabAction = {
    type: INSTRUMENT_TAB,
    instrumentedURL?: string
    hasLoginForm: boolean
    tabId: number
}

export function instrumentTab(tabId:number, hasLoginForm: boolean, instrumentedURL?: string): InstrumentTabAction {
    return {
        type: INSTRUMENT_TAB,
        instrumentedURL: instrumentedURL,
        hasLoginForm: hasLoginForm,
        tabId: tabId
    }
}
