import React, { useState, useContext } from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

import ConfigContext, { ConfigConsumerProps } from '../config-provider';
import { tuple } from '../_util/type';

/**
 * ButtonTypes -> ['default', 'primary', ...]
 * typeof ButtonTypes -> string[]
 * (typeof ButtonTypes)[number] -> 'default' | 'primary' | ....
 * 为什么不直接用 string
 */
const ButtonTypes = tuple('primary', 'dashed', 'whole');
export type ButtonType = (typeof ButtonTypes)[number];

const ButtonHTMLTypes = tuple('submit', 'button', 'reset');
export type ButtonHTMLType = (typeof ButtonHTMLTypes)[number];

const ButtonSizes = tuple('large', 'default', 'small');
export type ButtonSize = (typeof ButtonSizes)[number];

export interface BaseButtonProps {
  prefixCls?: string;
  className?: string;
  children?: React.ReactNode;
  type?: ButtonType;
  onClick?: React.MouseEventHandler<HTMLElement>;
  size?: ButtonSize;
  block?: boolean;
  loading?: boolean;
}

export type NativeButtonProps = {
  htmlType?: ButtonHTMLType;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps;

// 等扩展
export type ButtonProps = NativeButtonProps;

const Button: React.FC<ButtonProps> = props => {
  const [prevLoading, setPrevLoading] = useState(false);

  const { getPrefixCls }: ConfigConsumerProps = useContext(ConfigContext);

  const {
    prefixCls: customizePrefixCls,
    className,
    children,
    type,
    size,
    block,
    loading = false,
    onClick,
    ...rest
  } = props;

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = e => {
    if (onClick) {
      (onClick as React.MouseEventHandler<HTMLButtonElement>)(e);
    }
  };

  const prefixCls = getPrefixCls('btn', customizePrefixCls);

  const classes = classNames(prefixCls, className, {
    [`${prefixCls}-${type}`]: type,
    [`${prefixCls}-${size}`]: size,
    [`${prefixCls}-block`]: block,
    [`${prefixCls}-loading`]: loading,
  });

  if (loading !== prevLoading) {
    setPrevLoading(loading);
  }

  // React 不识别DOM 元素上的htmlType
  const { htmlType, ...otherProps } = rest as NativeButtonProps;

  return (
    <button
      {...(otherProps as NativeButtonProps)}
      className={classes}
      type={htmlType}
      onClick={handleClick}
    >
      {/* todo add svg loading status */}
      {loading && 'loading...   '}
      {children}
    </button>
  );
};

Button.defaultProps = {
  htmlType: 'button',
  loading: false,
};

Button.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.oneOf(ButtonTypes),
  onClick: PropTypes.func,
  size: PropTypes.oneOf(ButtonSizes),
  block: PropTypes.bool,
};

export default Button;
