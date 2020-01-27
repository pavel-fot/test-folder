import React from 'react';
import Layout from 'sn-front.controls/src/Layout';
import { createStructuredSelector, createSelector } from 'reselect';
import { getDocById } from 'sn-front.doc-list/src/documents/selectors';
import { connect } from 'react-redux';
import withQueryParams from 'sn-front.controls/src/withQueryParams';
import routes from 'sn-front-webpack-config/routes';
import { compose } from 'sn-front.redux-utils/src/funcs';
import { withLifeCycle } from 'sn-front.controls/src/WithLifeCycle';
import { isFreeform } from 'sn-front.user/src/privileges/documents';
import SmartTitle from 'sn-front.controls/src/SmartTitle';
import $s from 'sn-front.controls/src/class-names-mapping';
import { localeGet } from 'sn-front.redux-utils/src/localization/reducers';
import { getUser } from 'sn-front.user/src/selectors';
import { ON_INVITE_COMPLETION, INVITE_TO_SIGN } from 'sn-front.user/src/privileges/featureNames';
import { getFeatureAccess, featureAccessObj } from 'sn-front.user/src/privileges/featureAccess';
import { reset as resetRedirectUri } from 'sn-front.controls/src/RedirectAfterSigning/actions';

import FreeformInvite from './FreeformInvite';
import Invite from './Invite';
import { params2Props, queryParams2Props } from './mappers';
import PreviewWrapper from './PreviewWrapper';
import ErrorWrapper from './ErrorWrapper';
import { reset, PAGE_ACTION_CONVERT } from './app-config';
import {
  loadDocument,
  isLoadingDocument as isLoading,
  isConvertingDocument as isConverting,
  convertDocument
} from './thunks';
import { setInviteParams } from './Invite/actions';


const InviteApp = ({
  $l, document, documentId, user, isLoadingDocument, isConvertingDocument, endedTrial, featureAccess
}) => {
  const onCompletionAccess = featureAccess[ON_INVITE_COMPLETION];

  return !!document && (
    <Layout className={$s('sn-page__section--flex')}>
      <SmartTitle titleTemplate="%s | SignNow">
        {$l('PAGE_TITLE')}
      </SmartTitle>
      <Layout.Article>
        <ErrorWrapper document={document} user={user} endedTrial={endedTrial} />
        <Layout.ContentBox size="lg" className={$s('itosign-form')}>
          {
            !isLoadingDocument && (
              isFreeform(document) &&
              <FreeformInvite
                id={documentId}
                documentId={documentId}
                isConverting={isConvertingDocument}
                endedTrial={endedTrial}
                onCompletionAccess={onCompletionAccess}
              />
              || <Invite
                id={document.id}
                endedTrial={endedTrial}
                onCompletionAccess={onCompletionAccess}
              />
            )
          }
        </Layout.ContentBox>
      </Layout.Article>
      <Layout.Aside>
        <PreviewWrapper
          document={document}
          id={documentId}
          backUrl={isFreeform(document) ? 'freeform' : 'field'}
          isConverting={isConvertingDocument}
          endedTrial={endedTrial}
        />
      </Layout.Aside>
    </Layout>
  );
};


const inviteSubscription = getFeatureAccess(INVITE_TO_SIGN);

const endedTrial = createSelector(
  inviteSubscription,
  subscription => !subscription.access
);

const getProps = createStructuredSelector({
  document: getDocById,
  user: getUser,
  $l: localeGet('INVITE'),
  isLoadingDocument: isLoading,
  isConvertingDocument: isConverting,
  endedTrial,
  featureAccess: featureAccessObj,
});

const handlers = (dispatch, { documentId }) => ({
  resetRedirectUriForm: () => dispatch(resetRedirectUri()),
  resetFreeform: () => dispatch(reset()),
  loadDoc: () => dispatch(loadDocument(documentId)),
  convertDoc: params => dispatch(convertDocument(documentId, params)),
  saveQueryParamsToStore: params => dispatch(setInviteParams(params))
});

const onDidMount = ({ loadDoc, convertDoc, saveQueryParamsToStore }) => {
  const params = queryParams2Props(global.location.search);
  saveQueryParamsToStore(params);
  if (params && params.action === PAGE_ACTION_CONVERT) {
    convertDoc(params);
  } else {
    loadDoc();
  }
};
const onUnmount = ({ resetFreeform, resetRedirectUriForm }) => {
  resetFreeform();
  resetRedirectUriForm();
};

const enhance = compose(
  withQueryParams(params2Props, `/${routes.inviteToSign}/:documentId`),
  connect(getProps, handlers),
  withLifeCycle({ onDidMount, onUnmount }),
);

export default enhance(InviteApp);
