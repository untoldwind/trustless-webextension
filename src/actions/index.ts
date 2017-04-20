export {UPDATE_STATUS, UpdateStatusAction, doUpdateStatus} from './status';
export {UPDATE_IDENTITIES, UpdateIdentitiesAction, doUpdateIdentities} from './identities';
export {UPDATE_SECRETLIST, UpdateSecretListAction, doUpdateSecretList} from './list';
export {doLock, doUnlock} from './lock';

export type OtherAction = { type: '' };
export const OtherAction  : OtherAction = { type: '' };
