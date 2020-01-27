import React from 'react';
import PropTypes from 'prop-types';
import InputForm from 'sn-front.controls/src/InputForm';
import PreviewDocument from 'sn-front.controls/src/PreviewDocument';
import $s from 'sn-front.controls/src/class-names-mapping';
import Input from 'sn-front.controls/src/Input';
import HelpTooltip from './HelpTooltip';

const EditDocumentName = ({ $l, id, nameError, documentName, updateName, disabled }) => (
  <InputForm
    hasError={!!nameError}
    label={
      <React.Fragment>
        {$l('DOCUMENT_LABEL')}
        <HelpTooltip hasError={!!nameError} tooltip={$l('DOCUMENT_EXPLANATION')} placement="top" />
      </React.Fragment>
    }
  >
    <div className={$s('info-box well itosign-form__doc-preview')}>
      <PreviewDocument id={id} className={$s('info-box__img-holder preview__content--compact')} />
      <Input
        id="doc-preview-invite"
        wrapperClassName={$s('info-box__input-group form-group')}
        label={$l('FILE_NAME_LABEL')}
        placeholder={$l('FILE_NAME_PLACEHOLDER')}
        value={documentName}
        onChange={updateName}
        errorMessage={nameError}
        disabled={disabled}
        forceError
      />
    </div>
  </InputForm>
);

EditDocumentName.propTypes = {
  $l: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  updateName: PropTypes.func.isRequired,
  documentName: PropTypes.string,
  nameError: PropTypes.string,
  disabled: PropTypes.bool,
};

EditDocumentName.defaultProps = {
  disabled: false,
};

export default EditDocumentName;
