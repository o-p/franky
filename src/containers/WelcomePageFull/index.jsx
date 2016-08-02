import './styles.scss';

import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';
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

import Device from '../../helpers/device';

const KKBOXProtocol = {
  NextSlot: 'kkbox://sponsored_premium_v2_goto_next_slot',
  nextSlotWithCallback: (type, id) =>
    `kkbox://sponsored_premium_v2_goto_next_slot?callback=kkbox%3A%2F%2F${type}_${id}`,
  MobileGoPremiumLink: 'kkbox://payment_entrance',
  PortalGoPremiumLink: 'http://www.kkbox.com/client/billing.php',
};

const DEFAULT_CONFIG = {
  PLAYLIST_ID: '%PLAYLIST_ID%',
};

export default class WelcomePageFull extends Component {
  static Config = (ExecutionEnvironment.canUseDOM && window.Ast) ?
    window.Ast.Config :
    DEFAULT_CONFIG;

  static ClassNames = {
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
  };

  static Keys = Object.assign({}, WelcomePageFull.ClassNames, {
    ButtonPlayIt: 'button-playit',
    ButtonPlaylist: 'button-playlist',
    ButtonImageInLandscape: 'land',
    ButtonImageInPortrait: 'port',
  });

  constructor(props) {
    super(props);
    this.tracking = ExecutionEnvironment.canUseDOM ?
      window.Ast.tracking :
      () => { };
    this.onPageLeave = ExecutionEnvironment.canUseDOM ?
      window.Ast.logStayTime :
      () => {};
    this.onPlayitClick = this.onPlayitClick.bind(this);
    this.onPlaylistClick = this.onPlaylistClick.bind(this);
    this.onPremiumClick = this.onPremiumClick.bind(this);
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

    this.buttons = createElement('div', {
      key: WelcomePageFull.Keys.Buttons,
      className: WelcomePageFull.ClassNames.Buttons,
    }, [buttonPlaylist, buttonPlayIt]);

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

  onPremiumClick() {
    this.onPageLeave();

    return this.tracking({
      hitType: 'event',
      eventCategory: 'Standard',
      eventAction: 'GoPremium',
    });
  }

  onPlayitClick() {
    this.onPageLeave();

    return this.tracking({
      hitType: 'event',
      eventCategory: 'Standard',
      eventAction: 'GoPlay',
    });
  }

  onPlaylistClick() {
    this.onPageLeave();

    return this.tracking({
      hitType: 'event',
      eventCategory: 'Standard',
      eventAction: 'GoPlaylist',
      eventLabel: WelcomePageFull.Config.PLAYLIST_ID,
    });
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
    return createElement(FullPage, null, this.contents);
  }
}

