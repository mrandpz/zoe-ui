import * as React from 'react';
export interface ButtonProps {
  compiler: string;
  framework: string;
}
export default class Button extends React.Component<ButtonProps, {}> {
  name: string;
  render(): JSX.Element;
}
