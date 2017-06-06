import { createElement, createFactory, PropTypes, Component } from 'react';
import joinClasses from 'fbjs/lib/joinClasses';

import { div } from '../../html5';

export default class Preview extends Component {

  render() {
    const { apiUpdate, mid } = this.context;
    const { className, src } = this.props;

    return div({
      className: joinClasses('preview-wrapper', className),
    },
      createElement('iframe', {
        className: 'iframe',
        sandbox: 'allow-scripts allow-same-origin',
        src: `${src}?ver=${apiUpdate}&mid=${mid}`,
      })
    );
  }
}

Preview.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
};
Preview.contextTypes = {
  apiUpdate: PropTypes.number,
  mid: PropTypes.number, // 切換 RandomResult 用
};

export const preview = createFactory(Preview);
