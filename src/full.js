import React, { createElement } from 'react';
import ReactDom from 'react-dom';

import Builder from './containers/Builder';
import config from 'config/full-layout.json'; // eslint-disable-line import/no-unresolved


const fullWelcomePageBuilder = createElement(Builder, { config });

if (typeof document !== 'undefined') {
  ReactDom.render(fullWelcomePageBuilder, document.getElementById('root'));
}

export default fullWelcomePageBuilder;
