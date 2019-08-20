import React from 'react';
import defaultTheme from 'sinoui-components/styles/defaultTheme';
// import { ThemeProvider } from 'sinoui-components/styles';

import '../components/style/reset.less';
import '../components/style/index.less';
import './style/components.less';
import './style/demo.less';

export default function Wrapper(props) {
  return <div id="component-demo">{props.children}</div>;
}
