import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { pipe } from 'sn-front.redux-utils/src/funcs';
import { localeGet } from 'sn-front.redux-utils/src/localization/reducers';
import { locales } from 'sn-front.doc-list/src/CardView/store';
import { CardView } from './CardView';
import * as docActions from '../../../../document-menu/handlers';
import { TableView } from './TableView';

const DocListView = ({ isViewModeList, ...props }) => pipe(
  isViewModeList ? CardView : TableView,
  Component => (
    <Component
      {...props}
      docMenuActions={docActions}
      inviteMenu={null}
      isSelectable
    />
  ),
);

const getProps = createStructuredSelector({
  $l: localeGet(...locales),
});

const enhance = connect(getProps, null);

export default enhance(DocListView);
