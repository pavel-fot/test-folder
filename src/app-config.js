import { domainSelector } from 'sn-front.redux-utils/src/selectors';
import { actionCreator } from 'sn-front.redux-utils/src/actions';

export const APP_PREFIX = 'SN-FRONT::INVITE-APP';
export const appDomain = domainSelector(_ => _.inviteApp);
export const reset = actionCreator(`${APP_PREFIX}::RESET-APP`);

export const FOLDER_BACK_ID = 'FOLDER_BACK_ID';

export const PAGE_ACTION_CONVERT = 'convert';
