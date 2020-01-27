import QS from 'query-string';
import routes from 'sn-front-webpack-config/routes';
import Docs from 'sn-front.doc-list/src/documents';
import DocListHeader from 'sn-front.doc-list/src/header';
import { TRASH_BIN } from 'sn-front.folder-tree/src/folders/names';
import { compose, createPipe } from 'sn-front.redux-utils/src/funcs';
import { camelcaseKeys } from 'sn-front.redux-utils/src/mappers';
import { prepareQuery } from '../../mappers/doc-list';

export const paramsToProps = ({ page, sortBy, sortDir, filter }) => ({
  page: Number(page) || 1,
  sortBy: sortBy || DocListHeader.DEFAULTS.sortBy,
  sortDir: sortDir || DocListHeader.DEFAULTS.sortDir,
  filter: filter || DocListHeader.DEFAULTS.filter,
});

export const generateListId = ({ folderId, ...props }) => JSON.stringify({
  ...props,
  folderId,
  folderName: TRASH_BIN,
});

export const addListId = props => ({
  ...props,
  id: generateListId(props),
});

export const mapDocToAction = (user, folderId) => compose(
  Docs.update,
  Docs.docToState()(user, folderId),
);

export const listParamsToRequestParams = createPipe(
  paramsToProps,
  prepareQuery,
);

export const mapResponse = createPipe(
  camelcaseKeys,
  ({ totalDocuments, ...response }) => ({
    ...response,
    totalDocuments: totalDocuments || 0, // sometimes the api doesn't include totalDocuments field
  })
);

export const listParamsToTrashUrl = ({ viewMode, ...listParams }) => (
  `/${routes.trash}?${QS.stringify(listParams)}`
);
