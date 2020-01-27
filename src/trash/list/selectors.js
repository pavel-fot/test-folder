import { createSelector } from 'reselect';
import { getListById, isListReady } from 'sn-front.doc-list/src/doc-lists/selectors';
import { pipe } from 'sn-front.redux-utils/src/funcs';
import { getTrashFolderId } from '../selectors';
import { generateListId, paramsToProps } from './mappers';

export const getTrashListById = getListById;
export const isTrashListReady = isListReady;

const queryFromOwn = (_, { query }) => query;

export const getListId = createSelector(
  queryFromOwn,
  getTrashFolderId,
  (query, folderId) => pipe(
    query,
    paramsToProps,
    props => generateListId({ ...props, folderId }),
  ),
);
