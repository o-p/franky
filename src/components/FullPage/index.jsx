import './full-page.scss';
import React, { PropTypes, Component } from 'react';
import shallowEqual from 'fbjs/lib/shallowEqual';
import joinClasses from 'fbjs/lib/joinClasses';

export default class FullPage extends Component {
  static ClassNames = {
    Root: 'full-page',
    InnerWrapper: 'inner-wrapper',
  };
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  shouldComponentUpdate(newProps) {
    // we don't keep any state in FullPage for now.
    return !shallowEqual(this.props, newProps);
  }

  render() {
    const { children, className } = this.props;
    return (
      <div className={FullPage.ClassNames.Root}>
        <div className={joinClasses(FullPage.ClassNames.InnerWrapper, className)}>
          {children}
        </div>
      </div>
    );
  }
}
