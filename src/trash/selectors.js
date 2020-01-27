import QS from 'query-string';
import { createSelector } from 'reselect';
import { domain as selectDocLists } from 'sn-front.doc-list/src/doc-lists/selectors';
import { getRootFolderId } from 'sn-front.folder-tree/src/folders/selectors';
import { TRASH_BIN } from 'sn-front.folder-tree/src/folders/names';
import { pipe } from 'sn-front.redux-utils/src/funcs';
import { generateListId, paramsToProps } from './list/mappers';


export const getTrashFolderId = getRootFolderId(TRASH_BIN);


const querySelector = createSelector(
  state => state.router,
  ({ location }) => QS.parse(location),
);

export const selectIsNoTrashDocs = createSelector(
  querySelector,
  getTrashFolderId,
  selectDocLists,
  (query, trashFolderId, docLists) => pipe(
    query,
    paramsToProps,
    props => generateListId({ folderId: trashFolderId, ...props }),
    listId => pipe(
      docLists[listId],
      ({ totalDocuments } = {}) => !totalDocuments,
    ),
  ),
);
