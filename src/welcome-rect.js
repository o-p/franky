import React, { createElement } from 'react';
import ReactDom from 'react-dom';

import WelcomePageRect from './containers/WelcomePageRect';

const welcome = createElement(WelcomePageRect);

if (typeof document !== 'undefined') {
  ReactDom.render(welcome, document.getElementById('root'));
}

if (process.env.NODE_ENV === 'development') {
  const layoutToggler = document.createElement('div');
  const container = document.getElementById('root');

  layoutToggler.innerText = '版型切換';

  const styles = {
    position: 'fixed',
    right: '10px',
    top: '10px',
    padding: '10px',
    background: 'red',
    color: '#FFF',
    cursor: 'pointer',
  };

  Object.keys(styles)
        .map(attr => {
          layoutToggler.style[attr] = styles[attr];
          return true;
        });

  layoutToggler.addEventListener('click', () => container.classList.toggle('layout-2-buttons'));
  document.body.appendChild(layoutToggler);
}

export default welcome;
