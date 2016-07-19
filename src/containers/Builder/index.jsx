import './style.scss';

import pathPortUi from './ui-iphone5.svg';

import React, { createElement, Component, PropTypes } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropButton from '../../components/DropButton';
import Panel from '../../components/Panel';
import StandardPage from '../../components/StandardPage';

import update from '../../helpers/update';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

export default class Builder extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
  };
  static buttonText = createElement.bind(null, 'span', {
    className: 'button-text',
    key: 'button-text',
  });
  static buttonHint = createElement.bind(null, 'span', {
    className: 'button-hint',
    key: 'button-hint',
  });

  static ClassNames = {
    Root: 'builder-wrapper',
    ButtonsRow: 'buttons-row',
    ButtonsWrapper: 'buttons-wrapper',
    ContentWrapper: 'contents',
    PlaylistWrapper: 'playlist-field',
    PreviewLandIframe: 'preview-wrapper land',
    PreviewPortIframe: 'preview-wrapper port',
    Iframe: 'iframe',
  };

  static Refs = {
    PreviewLandIframe: 'iframe-land',
    PreviewPortIframe: 'iframe-port',
  };

  static Keys = Object.assign({}, Builder.ClassNames, Builder.Refs, {
    // to custom keys if necessary
    PlaylistCheckbox: 'playlist-checkbox',
    PanelPort: 'panel-port',
    PanelLand: 'panel-land',
  });

  static Styles = {
    PlaylistIdWrapper: {
      height: 36,
      top: 4,
    },
    PlaylistIdInput: {
      top: -4,
      padding: '0 0.5em',
    },
    PlaylistCheckbox: {
      width: 28,
      float: 'left',
      top: 6,
    },
  };

  static Images = {
    PreviewLandIframe: createElement('img', {
      src: pathPortUi,
      key: 'simulate-ui',
      className: 'simulate-ui',
    }),
    PreviewPortIframe: createElement('img', {
      src: pathPortUi,
      key: 'simulate-ui',
      className: 'simulate-ui',
    }),
  };

  static Texts = {
    TitlePortrait: createElement('div', null, [
      createElement('span', {
        key: 'zh',
        className: 'zh',
      }, '直式'),
      createElement('span', {
        key: 'en',
        className: 'en',
      }, 'Portraits'),
    ]),

    TitleLandscape: createElement('div', null, [
      createElement('span', {
        key: 'zh',
        className: 'zh',
      }, '橫式'),
      createElement('span', {
        key: 'en',
        className: 'en',
      }, 'Landscape'),
    ]),

    TitlePreview: createElement('h2', {
      className: 'title-previews',
      key: 'title-previews',
    }, '預覽圖檔'),
  };

  constructor(props) {
    super(props);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.onPlaylistIdChange = this.onPlaylistIdChange.bind(this);
    this.togglePlaylist = this.togglePlaylist.bind(this);
    this.refreshAll = this.refreshAll.bind(this);
    this.handlePlaylistKeyDown = this.handlePlaylistKeyDown.bind(this);
    this.updatePlaylist = this.updatePlaylist.bind(this);

    const { config } = props;
    const updateApi = update(config.api);

    this.update = (type, name, value, file) => updateApi({
      data: {
        type,
        [name]: value,
      },
      file,
    });

    this.state = {
      hasPlaylist: false,
      playlistId: '',
    };
    this.originPlaylistId = this.state.playlistId;

    this.texts = Object.assign({}, Builder.Texts, {

      HintPortrait: createElement('div', {
        className: 'hints',
        key: 'hints',
      }, [
        createElement('span', {
          key: 'hint-text',
          className: 'hint',
        }, '請選擇圖檔一一上傳(僅限png檔)'),
        createElement('a', {
          key: 'download-link',
          className: 'download-link',
          download: 'portrait-example.zip',
          href: config.pathPortraitExample,
        }, '下載範例檔'),
      ]),

      HintLandscape: createElement('div', {
        className: 'hints',
        key: 'hints',
      }, [
        createElement('span', {
          key: 'hint-text',
          className: 'hint',
        }, '請選擇圖檔一一上傳(僅限png檔)'),
        createElement('a', {
          key: 'download-link',
          className: 'download-link',
          download: 'landscape-example.zip',
          href: config.pathLandscapeExample,
        }, '下載範例檔'),
      ]),

      TitleHeader: createElement('h1', {
        key: 'head-title',
        className: 'head-title',
      }, config.title),
    });

    this.exportButton = createElement('div', {
      key: 'export-wrapper',
      className: 'export-wrapper',
    }, createElement(RaisedButton, {
      key: 'export-button',
      className: 'export-button',
      containerElement: 'a',
      download: true,
      href: config.pathExport,
      label: '輸出設定檔',
      labelStyle: {
        fontSize: 22,
        color: '#444',
        fontWeight: 'bold',
        height: 56,
        lineHeight: '56px',
      },
      style: {
        margin: '0 auto',
        height: 56,
      },
    }));
  }

  // 歌單編號內容改變
  onPlaylistIdChange(ev) {
    const { value } = ev.target;
    const { hasPlaylist } = this.state;

    if (value && !hasPlaylist) {
      // 自動勾選
      this.togglePlaylist();
    }
    return this.setState({
      playlistId: value,
    });
  }

  togglePlaylist() {
    const hasPlaylist = !this.state.hasPlaylist;
    const rootClassName = hasPlaylist ? 'layout-2-buttons' : 'layout-1-button';
    this.setState({ hasPlaylist });
    return this.update('var', 'ROOT_CLASSNAME', rootClassName)
        .then(this.refreshAll);
  }

  // 圖檔改變
  handleFileChange(file, name) {
    return this.update('file', 'filename', name, file)
               .then(this.refreshAll)
               .catch(this.refreshAll);
  }

  // 刷新預覽視窗
  refreshAll() {
    return ['PreviewLandIframe', 'PreviewPortIframe']
        .map(key => Builder.Refs[key])
        .forEach(name => {
          const iframe = this.refs[name];
          iframe.src = iframe.src;
        });
  }

  handlePlaylistKeyDown(ev) {
    if (ev.which === 13 || ev.keyCode === 13) {
      return this.updatePlaylist();
    }
    return false;
  }

  updatePlaylist() {
    const { playlistId } = this.state;
    if (this.originPlaylistId !== playlistId) {
      this.update('var', 'PLAYLIST_ID', playlistId)
          .then(() => {
            this.originPlaylistId = playlistId;
            this.refreshAll();
          })
          .catch(this.refreshAll);
      return true;
    }
    return false;
  }

  parsePlaylistId(props) {
    const { name, text } = props;
    const label = createElement('span', {
      key: 'text',
      className: 'text',
    }, text);
    const input = createElement(TextField, {
      name,
      key: 'input',
      className: 'input',
      value: this.state.playlistId,
      onChange: this.onPlaylistIdChange,
      onKeyDown: this.handlePlaylistKeyDown,
      onBlur: this.updatePlaylist,
      style: Builder.Styles.PlaylistIdWrapper,
      inputStyle: Builder.Styles.PlaylistIdInput,
    });
    return createElement('div', {
      key: name,
      className: Builder.ClassNames.PlaylistWrapper,
    }, [label, input]);
  }

  parsePlaylistButton(props) {
    const { name, text, fileType } = props;
    const { hasPlaylist } = this.state;
    const checkbox = createElement(Checkbox, {
      key: Builder.Keys.PlaylistCheckbox,
      checked: hasPlaylist,
      onCheck: this.togglePlaylist,
      style: Builder.Styles.PlaylistCheckbox,
    });
    const button = createElement(DropButton, {
      key: name,
      name,
      fileType,
      onFileSelected: this.handleFileChange,
    }, text);

    return createElement('div', {
      key: name,
      className: Builder.ClassNames.PlaylistWrapper,
    }, [
      checkbox,
      button,
    ]);
  }

  parseField(props) {
    const { hint, name, text, type, fileType } = props;
    switch (type) {
      case 'playlist-button':
        return this.parsePlaylistButton(props);
      case 'playlist-id':
        return this.parsePlaylistId(props);
      default:
        return createElement(DropButton, {
          key: name,
          name,
          fileType,
          onFileSelected: this.handleFileChange,
        }, [
          Builder.buttonText(text),
          Builder.buttonHint(hint),
        ]);
    }
  }

  parseButtonRow(buttonsConfig, key) {
    return createElement('div', {
      key,
      className: Builder.ClassNames.ButtonsRow,
    }, buttonsConfig.map(prop => this.parseField(prop)));
  }

  // 直式 Panel
  get portraitSettings() {
    const rowsConfig = this.props.config.layout.portrait;
    const buttonsWrapper = createElement('div', {
      key: Builder.Keys.ButtonsWrapper,
      className: Builder.ClassNames.ButtonsWrapper,
    }, rowsConfig.map((config, idx) => this.parseButtonRow(config, idx)));

    return createElement(Panel, {
      title: this.texts.TitlePortrait,
      key: Builder.Keys.PanelPort,
    }, [
      this.texts.HintPortrait,
      buttonsWrapper,
    ]);
  }

  // 橫式 Panel
  get landscapeSettings() {
    const rowsConfig = this.props.config.layout.landscape;
    const buttonsWrapper = createElement('div', {
      key: Builder.Keys.ButtonsWrapper,
      className: Builder.ClassNames.ButtonsWrapper,
    }, rowsConfig.map((config, idx) => this.parseButtonRow(config, idx)));

    return createElement(Panel, {
      title: this.texts.TitleLandscape,
      key: Builder.Keys.PanelLand,
    }, [
      this.texts.HintLandscape,
      buttonsWrapper,
    ]);
  }

  get previews() {
    const { config } = this.props;
    const iframes = ['PreviewLandIframe', 'PreviewPortIframe'].map(name => {
      const key = Builder.Keys[name];
      const ref = Builder.Refs[name];
      const className = Builder.ClassNames[name];
      const simulateUI = Builder.Images[name];

      const iframe = createElement('iframe', {
        className: Builder.ClassNames.Iframe,
        key: Builder.Keys.Iframe,
        ref,
        sandbox: 'allow-scripts allow-same-origin',
        // https://kkbox-ad-event.s3.amazonaws.com/equals/index.html - Rect layout
        src: config.previewUrl,
      });

      return createElement('div', {
        className,
        key,
      }, [
        simulateUI,
        iframe,
      ]);
    });

    return createElement('div', {
      className: 'previews',
      key: 'previews',
    }, iframes);
  }

  // 直式／橫式／預覽圖檔
  get contents() {
    return createElement('div', {
      className: Builder.ClassNames.ContentWrapper,
      key: Builder.ClassNames.ContentWrapper,
    }, [
      this.portraitSettings,
      this.landscapeSettings,
      // 預覽圖檔
      this.texts.TitlePreview,
      this.previews,
      // 輸出設定檔
      this.exportButton,
    ]);
  }

  render() {
    const body = createElement('div', {
      className: Builder.ClassNames.Root,
    }, [
      this.texts.TitleHeader,
      this.contents,
    ]);

    return createElement(MuiThemeProvider, null, createElement(StandardPage, null, body));
  }
}

