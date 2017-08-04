import ReactDom from 'react-dom';
import { createElement } from 'react';

import WelcomePageQuiz, { config } from './containers/WelcomePageQuiz';

const welcome = createElement(WelcomePageQuiz);

// client side mounting
if (typeof document !== 'undefined') {
  ReactDom.render(welcome, document.getElementById('root'));
}

// expose for bundler usage.
export {
  config,
  welcome as default,
};
