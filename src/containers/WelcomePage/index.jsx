import React, { createElement, Component, PropTypes } from 'react';
import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';

import FullPage from '../../components/FullPage';
import Device from '../../helpers/device';
import Detection from '../../helpers/detection';
import webClientHandshake from '../../helpers/webClientHandshake';

const KKBOXProtocol = {
  NextSlot: 'kkbox://sponsored_premium_v2_goto_next_slot',
  nextSlotWithCallback: (type, id) =>
    `kkbox://sponsored_premium_v2_goto_next_slot?callback=kkbox%3A%2F%2F${type}_${id}`,
  MobileGoPremiumLink: 'kkbox://payment_entrance',
  PortalGoPremiumLink: 'http://www.kkbox.com/client/billing.php',
};

const DEFAULT_CONFIG = {
  PLAYLIST_ID: '%PLAYLIST_ID%',
  SECONDARY_BUTTON: '%SECONDARY_BUTTON%',
  EXTERNAL_LINK: '%EXTERNAL_LINK%',
};

export default class WelcomePage extends Component {
  static Config = (ExecutionEnvironment.canUseDOM && window.Ast) ?
    window.Ast.Config :
    DEFAULT_CONFIG;

  static ClassNames = {
    ButtonExternalLink: 'button button-external-link',
    ButtonPlayIt: 'button button-playit',
    ButtonPlaylist: 'button button-playlist',
    ButtonImageInLandscape: 'button-image in-land-layout',
    ButtonImageInPortrait: 'button-image in-port-layout',
    Buttons: 'buttons',
    Content: 'content',
    ContentWrapper: 'contents',
    TextLandscape: 'text-land',
    TextPortrait: 'text-port',
    Texts: 'texts',
    PremiumLand: 'premium-text',
    PremiumPort: 'premium-text',
    PremiumLandWrapper: 'premium-land-wrapper',
    PremiumPortWrapper: 'premium-port-wrapper',
    UnsupportExternalLink: 'unsupport-external-link',
  };

  static Keys = Object.assign({}, WelcomePage.ClassNames, {
    ButtonExternalLink: 'button-ext-link',
    ButtonPlayIt: 'button-playit',
    ButtonPlaylist: 'button-playlist',
    ButtonImageInLandscape: 'land',
    ButtonImageInPortrait: 'port',
  });

  static propTypes = {
    /**
     * TODO: 加入 production build 移除 propTypes 驗證的外掛, 改成下列shape:
     *
     * pathes: PropTypes.shape({
     *   pathLandText: PropTypes.string
     *   pathPortText: PropTypes.string
     *   pathGoPremiumLand: PropTypes.string
     *   pathGoPremiumPort: PropTypes.string
     *   pathButtonPlayItLand: PropTypes.string
     *   pathButtonPlayItPort: PropTypes.string
     *   pathButtonPlaylistLand: PropTypes.string
     *   pathButtonPlaylistPort: PropTypes.string
     *   pathButtonExternalLand: PropTypes.string
     *   pathButtonExternalPort: PropTypes.string
     *  })
     */
    pathes: PropTypes.object,
    elemBeforeContent: PropTypes.node,
  };

  constructor(props) {
    super(props);

    this.isWebClient = false;
    this.finishSP = this.finishSP.bind(this);
    this.onPlayitClick = this.onPlayitClick.bind(this);
    this.onPlaylistClick = this.onPlaylistClick.bind(this);
    this.onPremiumClick = this.onPremiumClick.bind(this);
    this.onExternalLinkClick = this.onExternalLinkClick.bind(this);

    this.tracking = () => {};
    this.onPageLeave = () => {};
  }

  componentWillMount() {
    const {
      pathLandText, pathPortText,
      pathButtonPlayItLand, pathButtonPlayItPort,
      pathButtonPlaylistLand, pathButtonPlaylistPort,
      pathButtonExternalLand, pathButtonExternalPort,
      pathGoPremiumLand, pathGoPremiumPort,
    } = this.props.pathes;

    this.links = {
      nextSlot: KKBOXProtocol.NextSlot,
      viewPlaylist: KKBOXProtocol.nextSlotWithCallback(
        'view_playlist',
        WelcomePage.Config.PLAYLIST_ID),
      goPremium: Device.isMobile ?
          KKBOXProtocol.MobileGoPremiumLink :
          KKBOXProtocol.PortalGoPremiumLink,
    };
    // 文案部分
    const textLand = createElement('img', {
      key: WelcomePage.Keys.TextLandscape,
      src: pathLandText,
      className: WelcomePage.ClassNames.TextLandscape,
      alt: '觀賞影片後即可享受免費60分鐘音樂',
    });

    const textPort = createElement('img', {
      key: WelcomePage.Keys.TextPortrait,
      src: pathPortText,
      className: WelcomePage.ClassNames.TextPortrait,
      alt: '觀賞影片後即可享受免費60分鐘音樂',
    });

    this.texts = createElement('div', {
      key: WelcomePage.Keys.Texts,
      className: WelcomePage.ClassNames.Texts,
    }, [textLand, textPort]);
    // 三種按鈕 - 開始聽歌
    const buttonPlayIt = createElement('a', {
      href: this.links.nextSlot,
      key: WelcomePage.Keys.ButtonPlayIt,
      className: WelcomePage.ClassNames.ButtonPlayIt,
      onClick: this.onPlayitClick,
    }, [
      createElement('img', {
        key: WelcomePage.Keys.ButtonImageInLandscape,
        className: WelcomePage.ClassNames.ButtonImageInLandscape,
        src: pathButtonPlayItLand,
        alt: '開始聽歌',
      }),
      createElement('img', {
        key: WelcomePage.Keys.ButtonImageInPortrait,
        className: WelcomePage.ClassNames.ButtonImageInPortrait,
        src: pathButtonPlayItPort,
        alt: '開始聽歌',
      }),
    ]);
    // 三種按鈕 - 歌單
    const buttonPlaylist = createElement('a', {
      href: this.links.viewPlaylist,
      key: WelcomePage.Keys.ButtonPlaylist,
      className: WelcomePage.ClassNames.ButtonPlaylist,
      onClick: this.onPlaylistClick,
    }, [
      createElement('img', {
        key: WelcomePage.Keys.ButtonImageInLandscape,
        className: WelcomePage.ClassNames.ButtonImageInLandscape,
        src: pathButtonPlaylistLand,
        alt: '精選歌單',
      }),
      createElement('img', {
        key: WelcomePage.Keys.ButtonImageInPortrait,
        className: WelcomePage.ClassNames.ButtonImageInPortrait,
        src: pathButtonPlaylistPort,
        alt: '精選歌單',
      }),
    ]);
    // 三種按鈕 - 外連
    const buttonExternalLinks = [
      createElement('a', {
        href: `kkbox://act_open,${WelcomePage.Config.EXTERNAL_LINK}`,
        key: 'in-app',
        className: `${WelcomePage.ClassNames.ButtonExternalLink} only-in-app`,
        onClick: this.onExternalLinkClick,
      },
        createElement('img', {
          key: WelcomePage.Keys.ButtonImageInLandscape,
          className: WelcomePage.ClassNames.ButtonImageInLandscape,
          src: pathButtonExternalLand,
          alt: '了解更多',
        }),
        createElement('img', {
          key: WelcomePage.Keys.ButtonImageInPortrait,
          className: WelcomePage.ClassNames.ButtonImageInPortrait,
          src: pathButtonExternalPort,
          alt: '了解更多',
        }),
      ),
      createElement('a', {
        target: '_blank',
        href: WelcomePage.Config.EXTERNAL_LINK,
        key: 'in-webclient',
        className: `${WelcomePage.ClassNames.ButtonExternalLink} only-in-webclient`,
        onClick: this.onExternalLinkClick,
      },
        createElement('img', {
          key: WelcomePage.Keys.ButtonImageInLandscape,
          className: WelcomePage.ClassNames.ButtonImageInLandscape,
          src: pathButtonExternalLand,
          alt: '了解更多',
        }),
        createElement('img', {
          key: WelcomePage.Keys.ButtonImageInPortrait,
          className: WelcomePage.ClassNames.ButtonImageInPortrait,
          src: pathButtonExternalPort,
          alt: '了解更多',
        }),
      ),
    ];
    // 三種按鈕 - 包裝
    this.buttons = createElement('div', {
      key: WelcomePage.Keys.Buttons,
      className: WelcomePage.ClassNames.Buttons,
    },
      buttonPlaylist,
      buttonExternalLinks,
      buttonPlayIt
    );
    // 升級白金會員 - 寬版
    this.premiumTextLand = createElement('a', {
      key: WelcomePage.Keys.PremiumLandWrapper,
      className: WelcomePage.ClassNames.PremiumLandWrapper,
      href: this.links.goPremium,
      onClick: this.onPremiumClick,
      target: '_blank',
    }, createElement('img', {
      key: WelcomePage.Keys.PremiumLand,
      src: pathGoPremiumLand,
      className: WelcomePage.ClassNames.PremiumLand,
      alt: '不想看廣告，升級白金會員',
    }));
    // 升級白金會員 - 直版
    this.premiumTextPort = createElement('a', {
      key: WelcomePage.Keys.PremiumPortWrapper,
      className: WelcomePage.ClassNames.PremiumPortWrapper,
      href: this.links.goPremium,
      onClick: this.onPremiumClick,
      target: '_blank',
    }, createElement('img', {
      key: WelcomePage.Keys.PremiumPort,
      src: pathGoPremiumPort,
      className: WelcomePage.ClassNames.PremiumPort,
      alt: '不想看廣告，升級白金會員',
    }));
  }

  componentDidMount() {
    if (window.Ast) {
      const { tracking, logStayTime } = window.Ast;
      if (typeof tracking === 'function') this.tracking = tracking;
      if (typeof logStayTime === 'function') this.onPageLeave = logStayTime;
    }

    // 跟 WebClient Handshake
    webClientHandshake(this.setAppInWebClient.bind(this));
  }

  onExternalLinkClick() {
    return this.tracking({
      hitType: 'event',
      eventCategory: 'Standard',
      eventAction: 'ExternalLink',
    });
  }

  onPremiumClick() {
    this.onPageLeave();

    return this.tracking({
      hitType: 'event',
      eventCategory: 'Standard',
      eventAction: 'GoPremium',
    });
  }

  onPlayitClick(ev) {
    if (!this.hasDone) {
      this.hasDone = true;

      ev.preventDefault();
      this.tracking({
        hitType: 'event',
        eventCategory: 'Standard',
        eventAction: 'GoPlay',
      });

      return this.finishSP(ev.currentTarget);
    }

    return 0;
  }

  onPlaylistClick(ev) {
    if (!this.hasDone) {
      this.hasDone = true;

      ev.preventDefault();
      this.tracking({
        hitType: 'event',
        eventCategory: 'Standard',
        eventAction: 'GoPlaylist',
        eventLabel: WelcomePage.Config.PLAYLIST_ID,
      });

      return this.finishSP(ev.currentTarget);
    }

    return 0;
  }

  /** 指定 App 位於 Web Client 中 (browser iframe) */
  setAppInWebClient() { this.isWebClient = true; }

  finishSP(dom) {
    this.onPageLeave();
    const { href, click } = dom;
    const handler = this.isWebClient ?
      () => parent.window.postMessage(href, '*') :
      click.bind(dom);

    return window.setTimeout(handler, 1000);
  }

  get contents() {
    const { elemBeforeContent } = this.props;

    const content = createElement('div', {
      key: 'content',
      className: WelcomePage.ClassNames.Content,
    }, [
      this.texts,
      this.buttons,
      this.premiumTextLand,
      this.premiumTextPort,
    ]);

    return createElement('div', {
      className: WelcomePage.ClassNames.ContentWrapper,
      key: 'contents',
    }, [elemBeforeContent, content]);
  }

  render() {
    const { UNSUPPORT_EXTERNAL_LINK } = Detection;

    const className = [
      `show-button-${WelcomePage.Config.SECONDARY_BUTTON}`,
      this.isWebClient ? 'env-webclient' : 'env-app',
      UNSUPPORT_EXTERNAL_LINK ? WelcomePage.ClassNames.UnsupportExternalLink : null,
    ]
      .filter(Boolean)
      .join(' ');

    return createElement(FullPage, {
      className,
    }, this.contents);
  }
}

