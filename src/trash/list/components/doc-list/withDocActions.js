import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { localeGet } from 'sn-front.redux-utils/src/localization/reducers';
import { restoreDocument } from '../../../../bulk-actions/thunks/restore';
import { ensureRestoreTo } from '../../../../bulk-actions/thunks/restoreTo';
import { ensureDeletePermanently } from '../../../../bulk-actions/thunks/deletePermanently';


export const actionsConfig = [
  {
    titleKey: 'RESTORE',
    action: restoreDocument,
  },
  {
    titleKey: 'RESTORE_TO',
    action: document => dispatch => dispatch(ensureRestoreTo)([document]),
  },
  {
    titleKey: 'DELETE',
    action: document => dispatch => dispatch(ensureDeletePermanently([document])),
  },
];


const getProps = createStructuredSelector({
  $l: localeGet('TRASH'),
});
const getHandlers = null; // get dispatch
const mergeProps = ({ $l }, { dispatch }, own) => ({
  ...own,
  actions: actionsConfig.map(({ titleKey, action }) => ({
    title: $l(titleKey),
    action: bindActionCreators(action, dispatch),
  })),
});

export const withDocMenuActions = Component => connect(
  null, (dispatch, { docMenuActions }) => ({
    boundedDocMenuActions: bindActionCreators(docMenuActions, dispatch)
  })
)(Component);

export const withDocActions = Component => connect(
  getProps,
  getHandlers,
  mergeProps,
)(Component);
