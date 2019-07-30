import * as React from 'react';
import './style/index.scss';

export interface ButtonProps {
  compiler: string;
  framework: string;
}

// 'ButtonProps' describes the shape of props.
// State is never set so we use the '{}' type.
export default class Button extends React.Component<ButtonProps, {}> {
  name: string = '123';
  public render() {
    return (
      <h1 className="test">
        Button from {this.props.compiler} and {this.props.framework}! {this.name}
      </h1>
    );
  }
}
