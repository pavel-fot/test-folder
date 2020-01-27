import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import SpriteIcon from 'sn-front.controls/src/SpriteIcon';
import iconsSprite from 'sn-front-static/build/images/pages/doc-manager/sprite/sprite.svg';
import { localeGet } from 'sn-front.redux-utils/src/localization/reducers';
import $s from 'sn-front.controls/src/class-names-mapping';


const Placeholder = ({ $l }) => (
  <div className={$s('no-docs-info')}>
    <div className={$s('no-docs-info__body')}>
      <div className={$s('no-docs-info__content')}>
        <div className={$s('content-placeholder content-placeholder--centered')}>
          <div className={$s('content-placeholder__icon no-docs-info__img')}>
            <SpriteIcon
              iconId="icon-trash-color"
              sprite={iconsSprite}
              className={$s('svg-inline-icon--full-size')}
            />
          </div>
          <div className={$s('content-placeholder__title')}>
            <h3>{$l('LIST_PLACEHOLDER_TITLE')}</h3>
          </div>
          <div className={$s('content-placeholder__text')}>
            <p>
              {$l('LIST_PLACEHOLDER_DESCRIPTION_1')}
              <br />
              {$l('LIST_PLACEHOLDER_DESCRIPTION_2')}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const getProps = createStructuredSelector({
  $l: localeGet('TRASH'),
});

export default connect(getProps, null)(Placeholder);
