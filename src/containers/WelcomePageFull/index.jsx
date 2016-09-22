import './styles.scss';

import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';
import { listen } from 'fbjs/lib/EventListener';

import FullPage from '../../components/FullPage';
import React, { createElement, Component } from 'react';

import pathLandText from './text-land.svg';
import pathPortText from './text-port.svg';

import pathGoPremiumLand from './premium-land.svg';
import pathGoPremiumPort from './premium-port.svg';

import pathButtonPlayItLand from './button-playit-land.svg';
import pathButtonPlayItPort from './button-playit-port.svg';
import pathButtonPlaylistLand from './button-playlist-land.svg';
import pathButtonPlaylistPort from './button-playlist-port.svg';
import pathButtonExternalLand from './button-external-land.svg';
import pathButtonExternalPort from './button-external-port.svg';

import Device from '../../helpers/device';
import Detection from '../../helpers/detection';

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

export default class WelcomePageFull extends Component {
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

  static Keys = Object.assign({}, WelcomePageFull.ClassNames, {
    ButtonExternalLink: 'button-ext-link',
    ButtonPlayIt: 'button-playit',
    ButtonPlaylist: 'button-playlist',
    ButtonImageInLandscape: 'land',
    ButtonImageInPortrait: 'port',
  });

  constructor(props) {
    super(props);
    this.finishSP = this.finishSP.bind(this);
    this.tracking = ExecutionEnvironment.canUseDOM ?
      window.Ast.tracking :
      () => { };
    this.onPageLeave = ExecutionEnvironment.canUseDOM ?
      window.Ast.logStayTime :
      () => {};
    this.onPlayitClick = this.onPlayitClick.bind(this);
    this.onPlaylistClick = this.onPlaylistClick.bind(this);
    this.onPremiumClick = this.onPremiumClick.bind(this);
    this.onExternalLinkClick = this.onExternalLinkClick.bind(this);
  }

  componentWillMount() {
    this.links = {
      nextSlot: KKBOXProtocol.NextSlot,
      viewPlaylist: KKBOXProtocol.nextSlotWithCallback(
        'view_playlist',
        WelcomePageFull.Config.PLAYLIST_ID),
      // playPlaylist: KKBOXProtocol.nextSlotWithCallback(
      //     'play_playlist',
      //     WelcomePageFull.Config.PLAYLIST_ID),
      goPremium: Device.isMobile ?
          KKBOXProtocol.MobileGoPremiumLink :
          KKBOXProtocol.PortalGoPremiumLink,
    };

    const textLand = createElement('img', {
      key: WelcomePageFull.Keys.TextLandscape,
      src: pathLandText,
      className: WelcomePageFull.ClassNames.TextLandscape,
      alt: '觀賞影片後即可享受免費60分鐘音樂',
    });

    const textPort = createElement('img', {
      key: WelcomePageFull.Keys.TextPortrait,
      src: pathPortText,
      className: WelcomePageFull.ClassNames.TextPortrait,
      alt: '觀賞影片後即可享受免費60分鐘音樂',
    });

    this.texts = createElement('div', {
      key: WelcomePageFull.Keys.Texts,
      className: WelcomePageFull.ClassNames.Texts,
    }, [textLand, textPort]);

    const buttonPlayIt = createElement('a', {
      href: this.links.nextSlot,
      key: WelcomePageFull.Keys.ButtonPlayIt,
      className: WelcomePageFull.ClassNames.ButtonPlayIt,
      onClick: this.onPlayitClick,
    }, [
      createElement('img', {
        key: WelcomePageFull.Keys.ButtonImageInLandscape,
        className: WelcomePageFull.ClassNames.ButtonImageInLandscape,
        src: pathButtonPlayItLand,
        alt: '開始聽歌',
      }),
      createElement('img', {
        key: WelcomePageFull.Keys.ButtonImageInPortrait,
        className: WelcomePageFull.ClassNames.ButtonImageInPortrait,
        src: pathButtonPlayItPort,
        alt: '開始聽歌',
      }),
    ]);

    const buttonPlaylist = createElement('a', {
      href: this.links.viewPlaylist,
      key: WelcomePageFull.Keys.ButtonPlaylist,
      className: WelcomePageFull.ClassNames.ButtonPlaylist,
      onClick: this.onPlaylistClick,
    }, [
      createElement('img', {
        key: WelcomePageFull.Keys.ButtonImageInLandscape,
        className: WelcomePageFull.ClassNames.ButtonImageInLandscape,
        src: pathButtonPlaylistLand,
        alt: '精選歌單',
      }),
      createElement('img', {
        key: WelcomePageFull.Keys.ButtonImageInPortrait,
        className: WelcomePageFull.ClassNames.ButtonImageInPortrait,
        src: pathButtonPlaylistPort,
        alt: '精選歌單',
      }),
    ]);


    const buttonExternalLink = createElement('a', {
      target: '_blank',
      href: WelcomePageFull.Config.EXTERNAL_LINK,
      key: WelcomePageFull.Keys.ButtonExternalLink,
      className: WelcomePageFull.ClassNames.ButtonExternalLink,
      onClick: this.onExternalLinkClick,
    }, [
      createElement('img', {
        key: WelcomePageFull.Keys.ButtonImageInLandscape,
        className: WelcomePageFull.ClassNames.ButtonImageInLandscape,
        src: pathButtonExternalLand,
        alt: '了解更多',
      }),
      createElement('img', {
        key: WelcomePageFull.Keys.ButtonImageInPortrait,
        className: WelcomePageFull.ClassNames.ButtonImageInPortrait,
        src: pathButtonExternalPort,
        alt: '了解更多',
      }),
    ]);


    this.buttons = createElement('div', {
      key: WelcomePageFull.Keys.Buttons,
      className: WelcomePageFull.ClassNames.Buttons,
    }, [buttonPlaylist, buttonExternalLink, buttonPlayIt]);

    this.premiumTextLand = createElement('a', {
      key: WelcomePageFull.Keys.PremiumLandWrapper,
      className: WelcomePageFull.ClassNames.PremiumLandWrapper,
      href: this.links.goPremium,
      onClick: this.onPremiumClick,
      target: '_blank',
    }, createElement('img', {
      key: WelcomePageFull.Keys.PremiumLand,
      src: pathGoPremiumLand,
      className: WelcomePageFull.ClassNames.PremiumLand,
      alt: '不想看廣告，升級白金會員',
    }));

    this.premiumTextPort = createElement('a', {
      key: WelcomePageFull.Keys.PremiumPortWrapper,
      className: WelcomePageFull.ClassNames.PremiumPortWrapper,
      href: this.links.goPremium,
      onClick: this.onPremiumClick,
      target: '_blank',
    }, createElement('img', {
      key: WelcomePageFull.Keys.PremiumPort,
      src: pathGoPremiumPort,
      className: WelcomePageFull.ClassNames.PremiumPort,
      alt: '不想看廣告，升級白金會員',
    }));
  }

  componentDidMount() {
    listen(window, 'message', (ev) => {
      if (ev.data === 'webclient') {
        this.isWebClient = true;
      }
    });
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
        eventLabel: WelcomePageFull.Config.PLAYLIST_ID,
      });

      return this.finishSP(ev.currentTarget);
    }

    return 0;
  }

  finishSP(dom) {
    this.onPageLeave();
    const { href, click } = dom;
    const handler = this.isWebClient ?
      () => parent.window.postMessage(href, '*') :
      click.bind(dom);

    return window.setTimeout(handler, 1000);
  }

  get contents() {
    const content = createElement('div', {
      key: 'content',
      className: WelcomePageFull.ClassNames.Content,
    }, [
      this.texts,
      this.buttons,
      this.premiumTextLand,
      this.premiumTextPort,
    ]);

    return createElement('div', {
      className: WelcomePageFull.ClassNames.ContentWrapper,
      key: 'contents',
    }, content);
  }

  render() {
    const { UNSUPPORT_EXTERNAL_LINK } = Detection;

    const classNames = [
      `show-button-${WelcomePageFull.Config.SECONDARY_BUTTON}`,
    ];

    if (UNSUPPORT_EXTERNAL_LINK) classNames.push(WelcomePageFull.ClassNames.UnsupportExternalLink);

    return createElement(FullPage, {
      className: classNames.join(' '),
    }, this.contents);
  }
}

