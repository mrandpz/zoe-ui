import * as React from 'react';
import * as PropTypes from 'prop-types';
// import classNames from 'classnames';

export interface InputProps {
  name: string;
}

const Input = (props: InputProps) => {
  const { name } = props;
  return <div>{name}</div>;
};

Input.defaultProps = {
  name: '1',
};

Input.propTypes = {
  name: PropTypes.string,
};

export default Input;
