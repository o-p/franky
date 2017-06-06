import { createElement } from 'react';
import ReactDom from 'react-dom';

import Builder from './containers/JsonBuilder';
import config from '../config/custom-quiz';

const builder = createElement(Builder, config);

if (typeof document !== 'undefined') {
  ReactDom.render(builder, document.getElementById('root'));
}

export default builder;
