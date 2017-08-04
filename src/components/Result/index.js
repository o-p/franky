/**
 * 結果頁, 圖片搭配按鈕, 設計用來搭配Question
 */
import { Component, PropTypes, createFactory } from 'react';
import isFunction from 'lodash/isFunction';
import joinClasses from 'fbjs/lib/joinClasses';

import './result.scss';
import { landImage, portImage } from '../ImageWithMediaQuery';
import { image } from '../Image';
import { div } from '../html5';

const contextTypes = {
  linkProvider: PropTypes.func,
  theme: PropTypes.object,
  toggleLightbox: PropTypes.func,
  readEventInfo: PropTypes.func,
};

const propTypes = {
  altContent: PropTypes.string,
  buttons: PropTypes.array.isRequired,
  className: PropTypes.string,
  imageLandscape: PropTypes.string,
  imagePortrait: PropTypes.string,
  scrollToBottom: PropTypes.bool,
  svgTextLand: PropTypes.string,
  svgTextPort: PropTypes.string,
  hasEventInfo: PropTypes.bool,
};

const defaultProps = {
  scrollToBottom: true,
};

export default class Result extends Component {

  constructor(props) {
    super(props);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  componentWillMount() {
    const { theme } = this.context;
    this.styles = {
      button: {
        color: theme.buttonText,
        backgroundColor: theme.buttonBackground,
      },
      wrapper: {
        color: theme.contentText,
      },
    };
    this.bottomAnchor = div({
      ref: element => { this.anchorBottom = element; },
      key: 'anchor-bottom',
      className: 'result-bottom-anchor',
    }, ' ');
  }

  componentDidMount() {
    if (this.props.scrollToBottom) window.setTimeout(this.scrollToBottom, 100);
  }

  getTextClientEventHandler() {
    if (this.props.hasEventInfo) {
      return () => {
        this.context.readEventInfo();
        this.context.toggleLightbox();
      };
    }

    return undefined;
  }

  get buttons() {
    const { buttons } = this.props;
    const { linkProvider } = this.context;

    const children = buttons
      .filter(button => button.type && button.type !== 'none')
      .map((button, key) => {
        const { type, text, useImage, image: src, ...options } = button;
        const content = useImage ?
          image({
            key: 'icon',
            src,
            alt: text,
            className: 'result-button-icon',
          }) :
          text;
        return linkProvider(type, {
          className: 'result-button',
          key,
          style: this.styles.button,
          ...options,
        }, content);
      }
    );

    return div({
      className: `result-buttons with-${children.length}-btns`,
      key: 'buttons',
    }, children);
  }

  get contents() {
    const { altContent, svgTextLand, svgTextPort, hasEventInfo } = this.props;

    const appendClasses = hasEventInfo ? 'behavior-toggle-lightbox' : null;
    const portContent = portImage({
      key: 'port-content',
      src: svgTextPort,
      alt: altContent,
      className: joinClasses('result-text-content port', appendClasses),
      onClick: this.getTextClientEventHandler(),
    });
    const landContent = landImage({
      key: 'land-content',
      src: svgTextLand,
      alt: altContent,
      className: joinClasses('result-text-content land', appendClasses),
      onClick: this.getTextClientEventHandler(),
    });

    return div({
      key: 'content-container',
      className: 'result-contents',
    },
      landContent,
      portContent,
      this.buttons,
    );
  }

  /** 自動捲到畫面底部, 手機直式的需求 */
  scrollToBottom() {
    const anchorBottom = this.anchorBottom;
    return anchorBottom &&
        isFunction(anchorBottom.scrollIntoView) &&
        anchorBottom.scrollIntoView({ smooth: true });
  }

  render() {
    const { imageLandscape, imagePortrait, className } = this.props;
    const imgLand = landImage({
      key: 'land-hero-image',
      src: imageLandscape,
      className: 'result-image land',
    });
    const imgPort = portImage({
      key: 'port-hero-image',
      src: imagePortrait,
      className: 'result-image port',
    });

    return div({
      className: joinClasses('result', className),
      style: this.styles.wrapper,
    },
      imgPort,
      imgLand,
      this.contents,
      this.bottomAnchor,
    );
  }
}
Result.propTypes = propTypes;
Result.contextTypes = contextTypes;
Result.defaultProps = defaultProps;

const result = createFactory(Result);

export { result };
