import React, { useEffect, useState } from 'react';
import * as PropTypes from 'prop-types';
// import classNames from 'classnames';

export interface ButtonState {
  intNum: number;
}

export interface ButtonProps {
  /**
   * @default yo ho
   */
  name?: string;
  other?: number;
}

const Button: React.SFC<ButtonProps> = props => {
  const initState: ButtonState = {
    intNum: 1,
  };

  // 数据加载状态
  const [intNum, setIntNum] = useState(initState.intNum);

  // 初始化
  useEffect(() => {}, []);

  return (
    <div>
      我是hooks组件${intNum}
      <button onClick={() => setIntNum(2)}>{props.name}点击+11</button>
    </div>
  );
};

Button.defaultProps = {
  name: 'yo ho',
};

Button.propTypes = {
  name: PropTypes.string,
  other: PropTypes.number,
};

export default Button;
