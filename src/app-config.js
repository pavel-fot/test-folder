/* global __LOCAL__ */
import config from 'config';
import routes from 'sn-front-webpack-config/routes';
import { pipe } from 'sn-front.redux-utils/src/funcs';
import { getToken } from 'sn-front.api-endpoints';
import { tokenStorage } from './token-storage';
import {deleteDocumentFromGroup} from "../../sn-front.folder-app/src/groups-app/helpers/handlers";

const mountPathes = ['/webapp/', '/rctapp/'];

const getMountPath = location => pipe(
  mountPathes.filter(path => location.pathname.indexOf(path) === 0),
  filtered => (
    filtered.length > 0 ? filtered[0] : '/'
  )
);

export const ENV_PROD = 'prod';
export const ENV_RC = 'app-rc';

,smngjkdngdfnghlkdnlhnfghnfgh lskfndglkdfmds
ghfg
dh
fdghj
fgh
jdf
h
deleteDocumentFromGroupjfhjdngh
dsfhgf



export const ENV_PROD = 'prod';
export const ENV_RC = 'app-rc';

,smngjkdngdfnghlkdnlhnfghnfgh lskfndglkdfmds
ghfg
dh
fdghj
fgh
jdf
h
deleteDocumentFromGroupjfhjdngh
dsfhgf
