import './style.scss';

import pathPortUi from './ui-iphone5.svg';
import pathLandUi from './ui-ipad.svg';

import React, { createElement, Component, PropTypes } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropButton from '../../components/DropButton';
import Panel from '../../components/Panel';
import StandardPage from '../../components/StandardPage';
import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';

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
    TrackingIdWrapper: 'tracking-field',
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
    PanelCommonSettings: 'panel-common',
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
      src: pathLandUi,
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

    TitleCommonSettings: createElement('div', null, [
      createElement('span', {
        key: 'zh',
        className: 'zh',
      }, '共用設定'),
      createElement('span', {
        key: 'en',
        className: 'en',
      }, 'Common Settings'),
    ]),

    TitlePreview: createElement('h2', {
      className: 'title-previews',
      key: 'title-previews',
    }, '預覽圖檔'),
  };

  constructor(props) {
    super(props);

    this.handleFileChange = this.handleFileChange.bind(this);
    this.handlePlaylistKeyDown = this.handlePlaylistKeyDown.bind(this);
    this.handleTrackingIdKeyDown = this.handleTrackingIdKeyDown.bind(this);
    this.onPlaylistIdChange = this.onPlaylistIdChange.bind(this);
    this.onTrackingIdChange = this.onTrackingIdChange.bind(this);
    this.refreshAll = this.refreshAll.bind(this);
    this.togglePlaylist = this.togglePlaylist.bind(this);
    this.updatePlaylist = this.updatePlaylist.bind(this);
    this.updateTrackingId = this.updateTrackingId.bind(this);

    const { config } = props;
    const updateApi = update(config.api);

    this.updateVariable = (key, value) => updateApi({
      data: {
        type: 'var',
        key,
        value,
      },
    });

    this.updateFile = (filename, file) => updateApi({
      data: {
        type: 'file',
        filename,
      },
      file,
    });

    this.state = {
      hasPlaylist: false,
      playlistId: '',
      trackingId: '',
    };
    this.originPlaylistId = this.state.playlistId;
    this.originTrackingId = this.state.trackingId;

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
      href: ExecutionEnvironment.canUseDOM ?
        `${config.pathExport}&origin=${encodeURIComponent(location.href)}` :
        config.pathExport,
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

  onTrackingIdChange(ev) {
    return this.setState({
      trackingId: ev.target.value,
    });
  }

  togglePlaylist() {
    const hasPlaylist = !this.state.hasPlaylist;
    const rootClassName = hasPlaylist ? 'layout-2-buttons' : 'layout-1-button';
    this.setState({ hasPlaylist });
    return this.updateVariable('ROOT_CLASSNAME', rootClassName)
               .then(this.refreshAll)
               .catch(this.refreshAll);
  }

  // 圖檔改變
  handleFileChange(file, name) {
    return this.updateFile(name, file)
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

  handleTrackingIdKeyDown(ev) {
    if (ev.which === 13 || ev.keyCode === 13) {
      return this.updateTrackingId(ev);
    }
    return false;
  }

  updatePlaylist() {
    const { playlistId } = this.state;
    if (this.originPlaylistId !== playlistId) {
      this.updateVariable('PLAYLIST_ID', playlistId)
          .then(() => {
            this.originPlaylistId = playlistId;
            this.refreshAll();
          })
          .catch(this.refreshAll);
      return true;
    }
    return false;
  }

  updateTrackingId() {
    const { trackingId } = this.state;
    if (this.originTrackingId !== trackingId) {
      this.updateVariable('CUSTOM_TRACKING_ID', trackingId)
          .then(() => {
            this.originTrackingId = trackingId;
            // this.refreshAll();
          });
          // .catch(this.refreshAll);
      return true;
    }
    return false;
    // return this.updateVariable('CUSTOM_TRACKER_ID', value); // 這個不用refresh
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

  parseTrackingId(props) {
    const { name, text } = props;
    const label = createElement('span', {
      key: 'text',
      className: 'text',
    }, text);
    const input = createElement(TextField, {
      name,
      key: 'input',
      className: 'input',
      value: this.state.trackingId,
      onChange: this.onTrackingIdChange,
      onKeyDown: this.handleTrackingIdKeyDown,
      onBlur: this.updateTrackingId,
      style: Builder.Styles.TrackingIdWrapper,
      hintText: 'UA-XXXXXXXXX-Y',
      inputStyle: Builder.Styles.TrackingIdInput,
    });
    return createElement('div', {
      key: name,
      className: Builder.ClassNames.TrackingIdWrapper,
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
      case 'tracking-id':
        return this.parseTrackingId(props);
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

  // 共用設定
  get commonSettings() {
    const rowsConfig = this.props.config.layout.common;
    const buttonsWrapper = createElement('div', {
      key: Builder.Keys.ButtonsWrapper,
      className: Builder.ClassNames.ButtonsWrapper,
    }, rowsConfig.map((config, idx) => this.parseButtonRow(config, idx)));

    return createElement(Panel, {
      title: this.texts.TitleCommonSettings,
      key: Builder.Keys.PanelCommonSettings,
    }, [
      // this.texts.HintLandscape,
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
      this.commonSettings,
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

