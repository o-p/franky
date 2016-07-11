import React, { createElement } from 'react';
import ReactDom from 'react-dom';

import Home from './containers/Home';

const home = createElement(Home);

if (typeof document !== 'undefined') {
  ReactDom.render(home, document.getElementById('root'));
}

export default home;
