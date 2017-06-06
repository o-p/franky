import './full-page.scss';
import { createElement, PropTypes, Component } from 'react';
import shallowEqual from 'fbjs/lib/shallowEqual';
import joinClasses from 'fbjs/lib/joinClasses';

export default class FullPage extends Component {

  shouldComponentUpdate(newProps) {
    // we don't keep any state in FullPage for now.
    return !shallowEqual(this.props, newProps);
  }

  render() {
    const { children, className } = this.props;
    const { theme } = this.context;

    const style = theme ? {
      backgroundColor: theme.backgroundColor,
    } : null;

    const inner = createElement('div', {
      className: joinClasses('inner-wrapper', className),
    }, children);

    return createElement('div', {
      className: 'full-page',
      style,
    }, inner);
  }
}

FullPage.contextTypes = {
  theme: PropTypes.object,
};
FullPage.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
