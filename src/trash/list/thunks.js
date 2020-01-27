import { getFolderDetails } from 'sn-front.api-endpoints/src/folder';
import { withLoading } from 'sn-front.progress-indicator/src/actions';
import { createPipe, pipe, provideToEvery } from 'sn-front.redux-utils/src/funcs';
import { ensureAndReturn } from 'sn-front.redux-utils/src/thunks';
import { getUser } from 'sn-front.user/src/selectors';
import { update } from 'sn-front.doc-list/src/doc-lists/actions';
import { readParams } from '../../mappers/common';
import { withDocumentsPageRangeCheck } from '../../thunks/check-page';
import { getTrashFolderId } from '../selectors';
import {
  mapResponse,
  mapDocToAction,
  listParamsToRequestParams,
  addListId, paramsToProps,
} from './mappers';
import { isTrashListReady } from './selectors';

const retrieveId = ({ id }) => id;

const saveDocuments = (user, folderId, { documents }) => dispatch => (
  documents.map(mapDocToAction(user, folderId)).forEach(dispatch)
);

const saveList = ({ id }, response) => dispatch => pipe(
  { ...response, id, documents: response.documents.map(retrieveId) },
  update,
  action => dispatch(action),
);

const saveToStore = (user, folderId, listParams) => dispatch => createPipe(
  mapResponse,
  response => (
    dispatch(saveDocuments(user, folderId, response)),
    dispatch(saveList(listParams, response)),
    response
  ),
);

const loadTrashDocuments = (_, routingParams) => (dispatch, getState) => pipe(
  getState(),
  provideToEvery(getUser, getTrashFolderId),
  ([user, folderId]) => pipe(
    routingParams,
    readParams,
    paramsToProps,
    listParams => getFolderDetails(folderId, listParamsToRequestParams(listParams))
      .then(dispatch(
        saveToStore(user, folderId, addListId({ ...listParams, folderId }))
      )),
  ),
);

export const ensureTrashList = (routingParams, prevent) => dispatch => dispatch(
  withDocumentsPageRangeCheck(
    ensureAndReturn(
      isTrashListReady,
      Boolean,
      withLoading(loadTrashDocuments),
    )
  )(routingParams, prevent)
);
