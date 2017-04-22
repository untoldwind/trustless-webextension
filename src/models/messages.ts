export type CHECK_MESSAGE_TYPE = 'CHECK_MESSAGE_TYPE';
export const CHECK_MESSAGE_TYPE: CHECK_MESSAGE_TYPE = 'CHECK_MESSAGE_TYPE';

export type CheckMessage = {
    type: CHECK_MESSAGE_TYPE
}

export type CheckResponse = {
    found: boolean
}

export type FILL_MESSAGE_TYPE = 'FILL_MESSAGE_TYPE';
export const FILL_MESSAGE_TYPE: FILL_MESSAGE_TYPE = 'FILL_MESSAGE_TYPE';

export type FillMessage = {
    type: FILL_MESSAGE_TYPE,
    username: string,
    password: string
}

export type FillResponse = {
    filled: boolean
}

export type Messages = CheckMessage | FillMessage;
