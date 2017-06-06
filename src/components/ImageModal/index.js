/**
 * 只能設定 image 當作內容的 modal
 */
import { Component, PropTypes, createElement, createFactory } from 'react';

import './image-modal.scss';
import { landImage, portImage } from '../ImageWithMediaQuery';

export default class ImageModal extends Component {
  static propTypes = {
    land: PropTypes.string,
    port: PropTypes.string,
  };

  static contextTypes = {
    lightboxSetter: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.updateModal = this.updateModal.bind(this);
  }

  componentWillMount() { this.updateModal(); }

  shouldComponentUpdate(nextProps) {
    return nextProps.land !== this.props.land
    || nextProps.port !== this.props.port;
  }

  componentDidUpdate() { this.updateModal(); }

  updateModal() {
    const body = createElement('div', {
      className: 'modal-body-wrapper',
    },
      landImage({
        className: 'modal-image',
        src: this.props.land,
      }),
      portImage({
        className: 'modal-image',
        src: this.props.port,
      }),
    );

    this.context.lightboxSetter(body, { className: 'image-modal' });
  }

  render() { return null; }
}

export const imageModal = createFactory(ImageModal);
