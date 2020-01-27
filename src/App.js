
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
