import React from 'react';
import * as ReduxRouter from 'connected-react-router';
import { connect } from 'react-redux';
import $s from 'sn-front.controls/src/class-names-mapping';
import withQueryParams from 'sn-front.controls/src/withQueryParams';
import { getListById } from 'sn-front.doc-list/src/doc-lists/selectors';
import DocListHeader from 'sn-front.doc-list/src/header';
import Pagination from 'sn-front.doc-list/src/Pagination';
import EmptyFiltersPlaceholder from 'sn-front.doc-list/src/placeholders/EmptyFiltersPlaceholder';
import { localeGet } from 'sn-front.redux-utils/src/localization/reducers';
import { compose, pipe } from 'sn-front.redux-utils/src/funcs';
import { getUser } from 'sn-front.user/src/selectors';
import { TRASH_BIN } from 'sn-front.folder-tree/src/folders/names';
import { getBulkActionsConfig } from '../../../bulk-actions/config/trash';
import { documentsListId } from '../../../app-config';
import { clearSelectionIfFolderChanges } from '../../../components/hocs/clearSelectionIfFolderChanges';
import { globalViewMode, isViewModeList } from '../../../reducers/global-view-mode';
import { listParamsToTrashUrl, paramsToProps } from '../mappers';
import { getListId } from '../selectors';
import DocListView from './doc-list/DocListView';
import Placeholder from './doc-list/Placeholder';


const hotKeysMap = {
  prevPage: 'd d',
  nextPage: 'd f'
};

const hotkeysList = [
  {
    keys: 'd d',
    caption: 'PREV_PAGE',
  },
  {
    keys: 'd f',
    caption: 'NEXT_PAGE'
  }
];
const updateUrl = ({ query: { sortBy, sortDir, filter }, push }) => params => push(
  listParamsToTrashUrl({ sortBy, sortDir, filter, page: 1, ...params })
);
const headerProps = ({ sortBy, sortDir, filter }) => ({ sortBy, sortDir, filter });
// eslint-disable-next-line no-unused-vars
const isNotFilterSet = ({ query: { filter } }) => !filter || filter === 'all';

const renderPlaceholder = props => () => (
  isNotFilterSet(props)
    ? <Placeholder />
    : <EmptyFiltersPlaceholder />
);


const Trash = ({ bulkActionsConfig, ...props }) => (
  <React.Fragment>
    <div className={$s('control-panel sn-page__control-panel')}>
      <div className={$s('control-panel__content')}>
        <div className={$s('g-breadcrumb g-breadcrumb--simple')}>
          <ul className={$s('breadcrumb g-breadcrumb__list')}>
            <li className={$s('active')}>{props.$l('TRASH_BIN')}</li>
          </ul>
        </div>
      </div>
    </div>
    <div className={$s('docs-holder')}>
      <DocListHeader.Component
        {...headerProps(props.query)}
        viewMode={props.globalViewMode}
        id={documentsListId}
        onChange={updateUrl(props)}
        listId={props.listId}
        bulkActionsConfig={bulkActionsConfig}
        isSelectable
      />
      <DocListView
        id={props.listId}
        placeholder={renderPlaceholder(props)}
        isViewModeList={props.isViewModeList}
        isSelectable
      />
      <div className={$s('docs-holder__footer')}>
        <Pagination
          id={TRASH_BIN}
          listId={props.listId}
          total={props.list.totalDocuments}
          page={props.query.page}
          onChange={updateUrl(props)}
          hotkeysList={hotkeysList}
          hotKeysMap={hotKeysMap}
        />
      </div>
    </div>
  </React.Fragment>
);


const handlers = {
  push: ReduxRouter.push,
};

const state2Props = (state, own) => pipe(
  getListId(state, own),
  listId => ({
    listId,
    list: getListById(state, { id: listId }),
    user: getUser(state),
    isViewModeList: isViewModeList(state),
    globalViewMode: globalViewMode(state),
    $l: localeGet('FOLDER', 'DOCUMENT_GROUPS', 'TRASH')(state),
    bulkActionsConfig: getBulkActionsConfig(state, own),
  }),
);

const enhance = compose(
  withQueryParams(query => ({ query: paramsToProps(query) })),
  connect(state2Props, handlers),
  clearSelectionIfFolderChanges,
);

export default enhance(Trash);
