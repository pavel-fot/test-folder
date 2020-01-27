import React from 'react';
import PropTypes from 'prop-types';
import RadioForm from 'sn-front.controls/src/RadioForm';
import Radio from 'react-bootstrap/lib/Radio';
import { withLockedRadio } from 'sn-front.controls/src/RadioForm/LockedRadio';
import Layout from 'sn-front.controls/src/Layout';


const CompletionForm = ({ id, $l, onClickLocked, access: { access, required } }) => {
  const LockedRadio = withLockedRadio({
    onClick: () => (access ? null : onClickLocked(required)),
    disabled: !access,
    tooltip: $l('REQUIRE_SUBSCRIPTIONS_TOOLTIP')
  });

  const defaultChecked = access ?
    'document_and_attachments' :
    'document_attachment_only_for_signer';

  return (
    <Layout.CollapseSection>
      <Layout.CollapseTitle>
        {$l('ON_COMPLETION')}
      </Layout.CollapseTitle>
      <RadioForm id={id} default={defaultChecked}>
        <LockedRadio value="document_and_attachments">
          {$l('EMAIL_ALL_PARTIES')}
        </LockedRadio>
        <LockedRadio value="document_only">
          {$l('EMAIL_ALL_PARTIES_ONLY_DOCUMENT')}
        </LockedRadio>
        <Radio value="document_attachment_only_for_signer">
          {$l('EMAIL_DOCUMENT_AND_ATTACHMENTS_TO_SIGNERS')}
        </Radio>
        <LockedRadio value="none">
          {$l('DO_NOT_EMAIL_THE_DOCUMENT_OR_ATTACHMENTS')}
        </LockedRadio>
      </RadioForm>
    </Layout.CollapseSection>
  );
};

CompletionForm.propTypes = {
  id: PropTypes.string.isRequired,
  $l: PropTypes.func.isRequired,
  onClickLocked: PropTypes.func,
  access: PropTypes.shape({
    access: PropTypes.bool,
    required: PropTypes.string,
  }).isRequired
};

export default CompletionForm;
