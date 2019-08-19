import React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import { tuple } from '../_util/type';

/**
 * ButtonTypes -> ['default', 'primary', ...]
 * typeof ButtonTypes -> string[]
 * (typeof ButtonTypes)[number] -> 'default' | 'primary' | ....
 */
const ButtonTypes = tuple('default', 'primary', 'ghost', 'dashed', 'danger', 'link');
export type ButtonType = (typeof ButtonTypes)[number];

const ButtonHTMLTypes = tuple('submit', 'button', 'reset');
export type ButtonHTMLType = (typeof ButtonHTMLTypes)[number];

export interface BaseButtonProps {
  /**
   * @default
   */
  prefixCls?: string;
  className?: string;
  children?: React.ReactNode;
  type?: ButtonType;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export type NativeButtonProps = {
  htmlType?: ButtonHTMLType;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps;

export type ButtonProps = NativeButtonProps;

const Button: React.SFC<ButtonProps> = props => {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = e => {
    const { onClick } = props;
    if (onClick) {
      (onClick as React.MouseEventHandler<HTMLButtonElement>)(e);
    }
  };

  const renderButton = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls, className, children, type, ...rest } = props;

    const prefixCls = getPrefixCls('btn', customizePrefixCls);

    const classes = classNames(prefixCls, className, {
      [`${prefixCls}-${type}`]: type,
    });

    // React 不识别DOM 元素上的htmlType
    const { htmlType, ...otherProps } = rest as NativeButtonProps;
    return (
      <button
        {...(otherProps as NativeButtonProps)}
        className={classes}
        type={htmlType}
        onClick={handleClick}
      >
        {children}
      </button>
    );
  };

  return <ConfigConsumer>{renderButton}</ConfigConsumer>;
};

Button.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.oneOf(ButtonTypes),
  onClick: PropTypes.func,
};

export default Button;
