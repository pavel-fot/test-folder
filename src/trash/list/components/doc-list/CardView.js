import React from 'react';
import { classes } from 'sn-front.controls/src/classes';
import { CardViewRowPure } from 'sn-front.doc-list/src/CardView/CardViewRow';
import Wrapper from 'sn-front.doc-list/src/CardView/CardViewWrapper';
import DocumentList from 'sn-front.doc-list/src/DocumentList';
import DocumentPreview from 'sn-front.doc-list/src/DocumentPreview';
import { withSelectedState } from 'sn-front.doc-list/src/hocs/withSelectedState';
import $s from 'sn-front.controls/src/class-names-mapping';
import Button from 'sn-front.controls/src/Button';
import { withDocActions, withDocMenuActions } from './withDocActions';

const previewClassNames = classes('doc-preview--deleted', {
  'doc-preview--template': ({ document }) => document.template,
});

const TrashDocumentPreview = props => (
  <DocumentPreview {...props} className={previewClassNames(props)} />
);
const CardViewRow = withSelectedState(
  props => <CardViewRowPure {...props} PreviewComponent={TrashDocumentPreview} />
);

const ActionBtn = props => (
  <div className={$s('g-doc__action-cell')}>
    <Button {...props} />
  </div>
);

const Actions = withDocActions(({ document, actions }) => (
  <React.Fragment>
    {actions.map(({ title, action }) => (
      <ActionBtn key={title} onClick={() => action(document)}>{title}</ActionBtn>
    ))}
  </React.Fragment>
));

export const CardView = withDocMenuActions(props => (
  <DocumentList {...props} wrapper={Wrapper}>
    {itemProps => (
      <CardViewRow
        {...itemProps}
        actions={props.boundedDocMenuActions}
        showBreadcrumbs={false}
      >
        <Actions document={itemProps.document} {...props} />
      </CardViewRow>
    )}
  </DocumentList>
));
