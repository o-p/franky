import React, { createElement } from 'react';
import ReactDom from 'react-dom';

import WelcomePageFull from './containers/WelcomePageFull';

const welcome = createElement(WelcomePageFull);

if (typeof document !== 'undefined') {
  ReactDom.render(welcome, document.getElementById('root'));
}

export default welcome;
