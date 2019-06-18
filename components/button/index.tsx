import * as React from "react";

export interface ButtonProps { compiler: string; framework: string; }

// 'ButtonProps' describes the shape of props.
// State is never set so we use the '{}' type.
export default class Button extends React.Component<ButtonProps, {}> {
    render() {
        return <h1 className="test">Button from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}