import { domainSelector } from 'sn-front.redux-utils/src/selectors';
import { actionCreator } from 'sn-front.redux-utils/src/actions';

export const APP_PREFIX = 'SN-FRONT::INVITE-APP';
export const appDomain = domainSelector(_ => _.inviteApp);
export const reset = actionCreator(`${APP_PREFIX}::RESET-APP`);

sdfdggf
