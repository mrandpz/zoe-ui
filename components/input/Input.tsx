import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'omit.js';
import TextArea from './TextArea';
import Password from './Password';
import Search from './Search';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface InputProps {
  prefixCls?: string;
  className?: string;
  disabled?: boolean;
}

class Input extends React.Component<InputProps, any> {
  static TextArea: typeof TextArea;
  static Password: typeof Password;
  static Search: typeof Search;

  static defaultProps = {};

  static propTypes = {
    name: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
  };

  getInputClassName(prefixCls: string) {
    const { disabled } = this.props;
    return classNames(prefixCls, {
      [`${prefixCls}-disabled`]: disabled,
    });
  }

  //  应用场景很少用到，占时放着不写
  renderLabeledInput(prefixCls: string, children: React.ReactElement<any>) {
    const { className, style } = this.props;
    const mergedWrapperClassName = classNames(`${prefixCls}-wrapper`);

    const mergedGroupClassName = classNames(className, `${prefixCls}-group-wrapper`);
    return (
      <span className={mergedGroupClassName} style={style}>
        <span className={mergedWrapperClassName}>
          {/* {addonBefor} */}
          {React.cloneElement(children, { style: null })}
        </span>
      </span>
    );
  }

  renderLabeledIcon(prefixCls: string, children: React.ReactElement<any>) {
    const suffix = 'ICON前缀'; // 后缀
    const prefix = 'ICON后缀'; //

    const wrapCls = classNames(`${prefixCls}-affix-wrapper`, {});
    return (
      <span className={wrapCls}>
        {suffix}
        {React.cloneElement(children, {
          style: null,
          className: this.getInputClassName(prefixCls),
        })}
        {prefix}
      </span>
    );
  }

  renderInput(prefixCls: string) {
    // const {prefixCls,...rest} = this.props 用这种方法取到rest的话，比较难看，而且难操作
    const otherProps = omit(this.props, ['prefixCls', 'allowClear']);
    return this.renderLabeledIcon(prefixCls, <input {...otherProps} />);
  }

  renderComponent = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls } = this.props;
    const prefixCls = getPrefixCls('input', customizePrefixCls);
    return this.renderLabeledInput(prefixCls, this.renderInput(prefixCls));
  };

  render() {
    return <ConfigConsumer>{this.renderComponent}</ConfigConsumer>;
  }
}

export default Input;
