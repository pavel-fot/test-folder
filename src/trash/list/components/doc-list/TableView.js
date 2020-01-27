import React from 'react';
import $s from 'sn-front.controls/src/class-names-mapping';
import DocumentMenuActions from 'sn-front.controls/src/doc-menu-actions/DocumentMenuActions';
import { VISIBLE } from 'sn-front.controls/src/doc-menu-actions/status-handlers';
import SpriteIcon from 'sn-front.controls/src/SpriteIcon';
import DefaultTableView from 'sn-front.doc-list/src/TableView';
import * as Columns from 'sn-front.doc-list/src/TableView/table-header-column';
import iconsSprite from 'sn-front-static/build/images/pages/doc-manager/sprite/sprite.svg';
import TableViewWrapper from 'sn-front.doc-list/src/TableView/TableViewWrapper';
import { actionsConfig } from './withDocActions';

/* Title */

const Title = ({ document }) => (
  <React.Fragment>
    <td className={$s('doc-table__tbl-cell-trash')}>
      <SpriteIcon
        className={$s('svg-inline-icon svg-inline-icon--nospacing')}
        sprite={iconsSprite}
        iconId="icon-trash"
      />
    </td>
    <td>
      <div className={$s('doc-info')}>
        <div className={$s('doc-info__title')}>
          {document.documentName}
          {document.template && (
            <SpriteIcon
              className={$s('svg-inline-icon doc-info__title-icon')}
              sprite={iconsSprite}
              iconId="template-filled-blue"
            />
          )}
        </div>
      </div>
    </td>
  </React.Fragment>
);

/* Wrapper */

// Need to include a pair of <th> to compensate for some <tbody> space; one for the selectable
// checkbox (since we're overriding the {head} prop) and the other one for the trash bin icon
const EmptySpace = () => (
  <React.Fragment>
    <th /><th />
  </React.Fragment>
);
const DocListWrapper = props => (
  <TableViewWrapper
    {...props}
    head={<EmptySpace />}
  />
);

/* Actions */

const actions = actionsConfig.map(({ titleKey, action }) => ({
  key: titleKey,
  handlers: {
    [VISIBLE]: action,
  },
}));

const getMenuId = documentId => `trash-${documentId}`;

const Actions = props => (
  <DocumentMenuActions
    {...props}
    localeApp="TRASH"
    id={getMenuId(props.document.id)}
    actions={actions}
  />
);

/* Columns */

const documentsColumns = [
  Columns.DOCUMENT_NAME,
  Columns.LAST_MODIFIED,
  Columns.ACTIONS
];


/* TableView */

export const TableView = props => (
  <DefaultTableView
    {...props}
    columns={documentsColumns}
    documentMenu={Actions}
    Title={Title}
    DocListWrapper={DocListWrapper}
  />
);
