import * as React from 'react';
// 'ButtonProps' describes the shape of props.
// State is never set so we use the '{}' type.
export default class Button extends React.Component {
  constructor() {
    super(...arguments);
    this.name = '1223234';
  }
  render() {
    return (
      <h1 className="test">
        Button from {this.props.compiler} and {this.props.framework}! {this.name}
      </h1>
    );
  }
}
