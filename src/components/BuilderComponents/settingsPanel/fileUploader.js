import { createElement, createFactory, Component, PropTypes } from 'react';

import DropButton from '../../DropButton';
import { span, img, div } from '../../html5';

export default class FileUploader extends Component {
  constructor(props, context) {
    super(props);
    this.handleFileChange = context.updateFile;
  }

  render() {
    const { name, fileType, text, hint, preview } = this.props;

    const thePreview = preview ?
      div({
        className: 'file-uploader--preview',
      },
        img({
          className: 'preview-image',
          src: `preview/assets/${name}`,
        }),
        span({
          className: 'preview-filename',
        }, name)
      )
      : null;

    const btn = createElement(DropButton, {
      key: name,
      name,
      fileType,
      onFileSelected: this.handleFileChange,
    },
      span({
        className: 'button-text',
      }, text),
      span({
        className: 'button-hint',
      }, hint)
    );

    return div({
      className: 'settings-panel--file-uploader',
    }, btn, thePreview);
  }
}

FileUploader.propTypes = {
  name: PropTypes.string,
  fileType: PropTypes.string,
  text: PropTypes.string,
  hint: PropTypes.string,
  preview: PropTypes.bool,
};
FileUploader.contextTypes = {
  updateFile: PropTypes.func,
};

export const fileUploader = createFactory(FileUploader);
