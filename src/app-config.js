/* global __LOCAL__ */
import config from 'config';
import routes from 'sn-front-webpack-config/routes';
import { pipe } from 'sn-front.redux-utils/src/funcs';
import { getToken } from 'sn-front.api-endpoints';
import { tokenStorage } from './token-storage';

const mountPathes = ['/webapp/', '/rctapp/'];

const getMountPath = location => pipe(
  mountPathes.filter(path => location.pathname.indexOf(path) === 0),
  filtered => (
    filtered.length > 0 ? filtered[0] : '/'
  )
);

export const ENV_PROD = 'prod';
export const ENV_RC = 'app-rc';

export const DEFAULT_LANG = 'en';

export const defaultFolderName = 'Documents';
export const documentsListId = 'Documents';
export const clonesListId = 'Clones';
export const mainFolderListId = 'main';

/**
 * mountPath - pathname prefix. Default value: "/". Example: "/rctapp/".
 */
// export const mountPath = process.env.MOUNT_PATH;
export const afterLogoutMountPath = '/rctapp';
export const mountPath = (__LOCAL__ ? '/' : getMountPath(global.location));
export const LOADING_FOLDERS = 'APP::LOAD-FOLDERS';
export const CONVERT_SLATE_TASK = 'APP::CONVERT-SLATE-TASK';
export const LOAD_DOCUMENT_TASK = 'APP::LOAD-INVITE-DOCUMENT';
export const LOADING_DOCS = 'APP::LOAD-DOCS';
export const APP_TAG = 'SN-FRTN::FOLDR-APP';
export const PROFILE_MODAL_ID = 'profile-modal-id';
export const GDPR_MODAL_ID = 'gdpr-modal-id';
export const GDPR_START_MODAL_ID = 'gdpr-start-modal-id';
export const ALERT_MODAL_ID = 'alert-modal';
export const SHORT_PASSWORD_MODAL_ID = 'change-short-password';
export const FEEDBACK_MODAL_ID = 'feedback-modal';
export const BULK_PRE_CHECK_MODAL_ID = 'bulk-pre-check-invite-modal';
export const GDPR_REGIONS = {
  EU: 'eu',
  USA: 'usa'
};
export const SEARCH_RESULTS_ID = 'search-results';
export const DOCUMENT_GROUPS_FOLDER_ID = 'document-groups-folder';
export const CLONES_ID = 'clones-id';
export const DOCUMENT_GROUP_TEMPLATES_FOLDER_ID = 'document-group-templates-folder';
export const SLATES_FOLDER_ID = 'ID:SLATES';
export const CLONES_FOLDER_ID = 'ID:CLONES';
export const API_DASHBOARD_FOLDER_ID = 'ID:API_DASHBOARD';
export const US_LEGAL_FOLDER_ID = 'ID:US_LEGAL';
export const SLATE_LIST_ID = 'AirSlateTemplatesList';
export const PASS_CHANGED_KEY = 'SNAPPIER_PASSWORD_CHANGE_SUCCESS';
export const LOGOUT_SESSION_FLAG = 'SNAPPIER_LOGIN_TO_CONTINUE';
export const SUBSCRIPTION_MODAL_TYPES = {
  BASIC: 'basic',
  PREMIUM: 'premium',
  PDF_FILLER: 'pdffillerPayment'
};
export const PAGE_LIMIT = 20;
export const REQUEST_RETRY_TIMEOUT = 3000;

export const IS_SHORT_PASSWORD_SESSION_STORAGE_KEY = 'is_password_too_short';
export const FEEDBACK_MODAL_SESSION_STORAGE_FLAG_KEY = 'should_show_feedback_modal';
export const STORAGE_LOGOUT_KEY = 'STORAGE_LOGOUT';

export const PDFFILLER_PAYMENT_SUCCESS = 'payment-success';
export const PDFFILLER_PAYMENT_FAILED = 'payment-failed';

export const SNSEATS_EXPIRED_PRICING_URL =
  `${config.redirectBaseUrl}/${routes.seats}?redirect_uri=~2Fpurchase~2Fbusiness_free_trial_expired~2Fpricing`;

export const SNSEATS_LOGIN_URL =
  `${config.redirectBaseUrl}/${routes.seats}?redirect_uri=~2Flogin`;

export const signingSessionLocales = [
  'cs',
  'da',
  'de',
  'el',
  'en',
  'es',
  'fi',
  'fr',
  'hr',
  'hu',
  'id',
  'it',
  'ja',
  'ko',
  'nb',
  'nl',
  'pl',
  'pt',
  'ru',
  'sv',
  'th',
  'tr',
  'zh_CN',
  'zh_TW',
];

export const isInAngular = () => global.top !== global;

export const BASE_URL_PATH = isInAngular() ? config.redirectBaseUrl : config.redirectAltUrl;
export const CLOUD_STORAGE_COOKIE = 'cloud-storage-connect';

export const UPDATE_DOCLIST_LIMIT_MS = 3000;

export { config, getToken, tokenStorage };
