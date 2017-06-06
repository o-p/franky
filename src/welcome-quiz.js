import ReactDom from 'react-dom';
import { createElement } from 'react';

import WelcomePageQuiz, { config } from './containers/WelcomePageQuiz';

const welcome = createElement(WelcomePageQuiz);

// client side mounting
if (typeof document !== 'undefined') {
  ReactDom.render(welcome, document.getElementById('root'));
}

// 開發過程方便切換版型
// if (process.env.NODE_ENV === 'development') {
//   const layoutToggler = document.createElement('div');
//   const container = document.getElementById('root');

//   layoutToggler.innerText = '版型切換';

//   const styles = {
//     position: 'fixed',
//     right: '10px',
//     top: '10px',
//     padding: '10px',
//     background: 'red',
//     color: '#FFF',
//     cursor: 'pointer',
//     zIndex: 99999,
//   };

//   Object.keys(styles)
//         .map(attr => {
//           layoutToggler.style[attr] = styles[attr];
//           return true;
//         });

//   layoutToggler.addEventListener('click', () => container.classList.toggle('layout-2-buttons'));
//   document.body.appendChild(layoutToggler);
// }

// expose for bundler usage.
export {
  config,
  welcome as default,
};
