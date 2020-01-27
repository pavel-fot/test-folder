import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import $s from 'sn-front.controls/src/class-names-mapping';
import { localeGet } from 'sn-front.redux-utils/src/localization/reducers';
import { handleWith, prevent } from 'sn-front.controls/src/handlers';
import routes from 'sn-front-webpack-config/routes';
import * as ReduxRouter from 'connected-react-router';

const ErrorMessage = ({ message, document, goBack, $l }) => (
  <div className={$s('panel panel--error')}>
    {$l(message)}&nbsp;
    <a
      href="/"
      onClick={handleWith(prevent, () => goBack(`/${routes.folder}/${document.folder}`))}
    >
      {$l('GO_BACK_HOME')}
    </a>.
  </div>
);

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  document: PropTypes.object,
};

const mapState2Props = createStructuredSelector({
  $l: localeGet('INVITE'),
});

const handlers = {
  goBack: ReduxRouter.goBack,
};

export default connect(mapState2Props, handlers)(ErrorMessage);
