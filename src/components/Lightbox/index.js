import { Component, PropTypes, createElement } from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';
import joinClasses from 'fbjs/lib/joinClasses';

import './lightbox.scss';
import SvgClose from '../Svg/Close';

const contextTypes = {
  theme: PropTypes.object,
};
const propTypes = {
  // body: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string,
  modal: PropTypes.bool, // false => 點外面會關閉
  onRequestClose: PropTypes.func,
  show: PropTypes.bool.isRequired,
};

const defaultProps = {
  show: false,
  modal: true, // 點外面(mask上) 不會關閉
  onRequestClose: emptyFunction,
};

export default class Lightbox extends Component {

  get closeButton() {
    return createElement('button', {
      key: 'close',
      'aria-label': 'close',
      className: 'lightbox-close',
      onClick: this.props.onRequestClose,
    }, createElement(SvgClose));
  }

  render() {
    const { children, show, className } = this.props;

    const content = createElement('div', {
      className: 'lightbox-content',
    }, children);

    const box = createElement('div', {
      className: joinClasses('lightbox', className),
    },
      this.closeButton,
      content
    );

    return createElement('div', {
      className: show ? 'show-lightbox lightbox-mask' : 'lightbox-mask',
    }, box);
  }
}

Lightbox.propTypes = propTypes;
Lightbox.defaultProps = defaultProps;
Lightbox.contextTypes = contextTypes;
