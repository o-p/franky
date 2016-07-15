import './drop-button.scss';
import React, { createElement, Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import RaisedButton from 'material-ui/RaisedButton';
import IconFileUpload from 'material-ui/svg-icons/file/file-upload';
import IconBrokenImage from 'material-ui/svg-icons/image/broken-image';

export default class DropButton extends Component {
  static ClassNames = {
    Root: 'drop-button',
    StateActive: 'active',
    StateReject: 'reject',
  };
  static Keys = {
    Button: 'button',
  };
  static FileTypes = {
    svg: 'image/svg+xml',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
  };
  static propTypes = {
    onFileSelected: PropTypes.func.isRequired,
    fileType: PropTypes.string,
    name: PropTypes.string,
    children: PropTypes.node,
  };
  static Styles = {
    ButtonWrapper: {
      width: 160,
      height: 36,
    },
    ButtonLabel: {
      lineHeight: '36px',
      height: 36,
    },
  };
  static Icons = {
    Valid: createElement(IconFileUpload, {
      key: 'valid-icon',
      className: 'drop-button-icon valid',
      color: '#50b4e6',
    }),
    Invalid: createElement(IconBrokenImage, {
      key: 'invalid-icon',
      className: 'drop-button-icon invalid',
      color: '#ff0000',
    }),
  };


  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
    // 當前版本的material-ui搭配dropzone是不需要的, RaisedButton預設handler不會中斷event
    // this.onClick = () => this.refs.dropzone.open();
  }

  onDrop(files) {
    const { name, onFileSelected } = this.props;
    if (files && files[0]) {
      return onFileSelected(files[0], name);
    }
    return false;
  }

  render() {
    const { fileType, name, children } = this.props;

    const button = createElement(RaisedButton, {
      key: DropButton.Keys.Button,
      label: children,
      style: DropButton.Styles.ButtonWrapper,
      labelStyle: DropButton.Styles.ButtonLabel,
    });

    return createElement(Dropzone, {
      ref: 'dropzone',
      className: 'drop-button',
      accept: DropButton.FileTypes[fileType],
      onDrop: this.onDrop,
      multiple: false,
      name,
      activeClassName: DropButton.ClassNames.StateActive,
      rejectClassName: DropButton.ClassNames.StateReject,
    }, [
      button,
      DropButton.Icons.Valid,
      DropButton.Icons.Invalid,
    ]);
  }
}
