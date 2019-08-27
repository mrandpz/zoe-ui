import * as React from 'react';
import * as PropTypes from 'prop-types';

// require('./iconfont.js');
import './iconfont';
import classNames from 'classnames';

export interface IconProps {
  type: string;
  className: string;
}

const Icon = (props: IconProps) => {
  const { type, className, ...rest } = props;
  const classnames = classNames('icon', className);
  return (
    <svg className={classnames} aria-hidden="true" {...rest}>
      <use xlinkHref={`#icon-${type}`} />
    </svg>
  );
};

Icon.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
};

export default Icon;
