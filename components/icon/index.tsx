import * as React from 'react';
import * as PropTypes from 'prop-types';

// require('./iconfont.js');
import './iconfont';
// import classNames from 'classnames';

export interface IconProps {}

const Icon = () => {
  return (
    <svg className="icon" aria-hidden="true">
      <use xlinkHref="#icon-loading" />
    </svg>
  );
};

Icon.defaultProps = {};

Icon.propTypes = {
  name: PropTypes.string,
};

export default Icon;
