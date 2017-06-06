/**
 * 確保在 app mounted 後才 render 的 img
 */
import { Component, PropTypes, createFactory } from 'react';
import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';
import shallowEqual from 'fbjs/lib/shallowEqual';

const img = createFactory('img');

export default class Image extends Component {

  shouldComponentUpdate(nextProps) {
    return !shallowEqual(this.props, nextProps);
  }

  render() {
    // no pre-render at server side
    // 避免 iOS WebView 卡住的問題
    if (!ExecutionEnvironment.canUseDOM) return null;
    if (!this.props.src) return null;
    return img(this.props);
  }
}

Image.contextTypes = {
  appDidMounted: PropTypes.bool,
};

Image.propTypes = {
  src: PropTypes.string,
};

export const image = createFactory(Image);
