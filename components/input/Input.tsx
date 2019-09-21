import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'omit.js';
import TextArea from './TextArea';
import Password from './Password';
import Search from './Search';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

import { Omit } from '../_util/type';

function fixControlledValue<T>(value: T) {
  // 不加这个 typeof value === 'undefined' 就会报错
  if (typeof value === 'undefined' || value === null) {
    return '';
  }
  return value;
}

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  prefixCls?: string;
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  allowClear?: boolean;
}

class Input extends React.Component<InputProps, any> {
  static TextArea: typeof TextArea;
  static Password: typeof Password;
  static Search: typeof Search;

  static defaultProps = {
    type: 'text',
  };

  static propTypes = {
    type: PropTypes.string,
    id: PropTypes.string,
    maxLength: PropTypes.number,
    disabled: PropTypes.bool,
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    className: PropTypes.string,
    addonBefore: PropTypes.node,
    addonAfter: PropTypes.node,
    prefixCls: PropTypes.string,
    onPressEnter: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    prefix: PropTypes.node,
    suffix: PropTypes.node,
    allowClear: PropTypes.bool,
  };

  input: HTMLInputElement;

  constructor(props: InputProps) {
    super(props);
    const value = typeof props.value === 'undefined' ? props.defaultValue : props.value;
    this.state = {
      value,
    };
  }

  getInputClassName(prefixCls: string) {
    const { disabled } = this.props;
    return classNames(prefixCls, {
      [`${prefixCls}-disabled`]: disabled,
    });
  }

  setValue(
    value: string,
    e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement, MouseEvent>,
    callback?: () => void,
  ) {
    if (!('value' in this.props)) {
      this.setState({ value }, callback);
    }
    const { onChange } = this.props;
    if (onChange) {
      let event = e;
      if (e.type === 'click') {
        // click clear icon
        event = Object.create(e);
        event.target = this.input;
        event.currentTarget = this.input;
        const originalInputValue = this.input.value;
        // change input value cause e.target.value should be '' when clear input
        this.input.value = '';
        onChange(event as React.ChangeEvent<HTMLInputElement>);
        // reset input value
        this.input.value = originalInputValue;
        return;
      }
      onChange(event as React.ChangeEvent<HTMLInputElement>);
    }
  }

  saveInput = (node: HTMLInputElement) => {
    this.input = node;
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setValue(e.target.value, e);
  };

  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { onPressEnter, onKeyDown } = this.props;
    if (e.keyCode === 13 && onPressEnter) {
      onPressEnter(e);
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  //  应用场景很少用到，占时放着不写 ===> 加载input框中的类似按钮
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

  // 增加input框内的前缀和后缀
  renderLabeledIcon(prefixCls: string, children: React.ReactElement<any>) {
    const { suffix, prefix } = this.props;

    const wrapCls = classNames(`${prefixCls}-affix-wrapper`, {});
    return (
      <span className={wrapCls}>
        {prefix}
        {React.cloneElement(children, {
          style: null,
          className: this.getInputClassName(prefixCls),
        })}
        {suffix}
      </span>
    );
  }

  renderInput(prefixCls: string) {
    const { value } = this.state;
    // const {prefixCls,...rest} = this.props 用这种方法取到rest的话，比较难看，而且难操作
    const otherProps = omit(this.props, ['prefixCls', 'allowClear']);
    return this.renderLabeledIcon(
      prefixCls,
      <input
        {...otherProps}
        value={fixControlledValue(value)}
        onChange={e => this.handleChange(e)}
        ref={this.saveInput}
        onKeyDown={this.handleKeyDown}
      />,
    );
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
