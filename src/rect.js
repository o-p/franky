import React, { createElement } from 'react';
import ReactDom from 'react-dom';

import Builder from './containers/Builder';
import config from 'config/rect-layout.json'; // eslint-disable-line import/no-unresolved


const rectWelcomePageBuilder = createElement(Builder, { config });

if (typeof document !== 'undefined') {
  ReactDom.render(rectWelcomePageBuilder, document.getElementById('root'));
}

export default rectWelcomePageBuilder;
