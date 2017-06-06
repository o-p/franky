import './go-premium.scss';
import { Component, PropTypes, createElement, createFactory } from 'react';

const contextTypes = {
  linkProvider: PropTypes.func,
  theme: PropTypes.object,
};

const propTypes = {
  text: PropTypes.string,
};

export default class GoPremium extends Component {
  // 升級白金會員的文字目前不可能更改
  shouldComponentUpdate() { return false; }

  render() {
    const { text } = this.props;
    const { linkProvider, theme } = this.context;

    // 連結文字
    const link = linkProvider('go_premium', {
      key: 'go-premium-link',
      className: 'link',
      style: theme && {
        color: theme.pageText,
        borderColor: theme.pageText,
      },
    }, text);

    return createElement('div', {
      className: 'go-premium',
      key: 'go-premium',
    }, link);
  }
}

GoPremium.propTypes = propTypes;
GoPremium.contextTypes = contextTypes;


export const goPremium = createFactory(GoPremium);
