export {UPDATE_STATUS, UpdateStatusAction, doUpdateStatus} from './status';
export {UPDATE_IDENTITIES, UpdateIdentitiesAction, doUpdateIdentities} from './identities';
export {UPDATE_SECRETLIST, UpdateSecretListAction, doUpdateSecretList} from './list';
export {INSTRUMENT_TAB, InstrumentTabAction} from './instrument';
export {doLock, doUnlock} from './lock';
export {doFillLoginForm} from './fill-form';

export type OtherAction = { type: '' };
export const OtherAction  : OtherAction = { type: '' };
