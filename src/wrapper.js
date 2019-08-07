import React from 'react';
// import defaultTheme from 'sinoui-components/styles/defaultTheme';
// import { ThemeProvider } from 'sinoui-components/styles';
import '../dist/cpant.css';

export default function Wrapper(props) {
  return <div>{props.children}</div>;
}
