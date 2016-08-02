import './styles.scss';

import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';
import FullPage from '../../components/FullPage';
import React, { createElement, Component } from 'react';

import pathPortImage from './background-port.jpg';

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

export default class WelcomePageRect extends Component {
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
    ImagePortrait: 'image-port',
    TextLandscape: 'text-land',
    TextPortrait: 'text-port',
    Texts: 'texts',
    PremiumLand: 'premium-text',
    PremiumPort: 'premium-text',
    PremiumLandWrapper: 'premium-land-wrapper',
    PremiumPortWrapper: 'premium-port-wrapper',
  };

  static Keys = Object.assign({}, WelcomePageRect.ClassNames, {
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
    // this.tracking = ExecutionEnvironment.canUseDOM ?
    //     (...args) => window.ga('send', ...args) :
    //     () => {};
    this.onPlayitClick = this.onPlayitClick.bind(this);
    this.onPlaylistClick = this.onPlaylistClick.bind(this);
    this.onPremiumClick = this.onPremiumClick.bind(this);
  }

  componentWillMount() {
    this.links = {
      nextSlot: KKBOXProtocol.NextSlot,
      viewPlaylist: KKBOXProtocol.nextSlotWithCallback(
        'view_playlist',
        WelcomePageRect.Config.PLAYLIST_ID),
      // playPlaylist: KKBOXProtocol.nextSlotWithCallback(
      //     'play_playlist',
      //     WelcomePageRect.Config.PLAYLIST_ID),
      goPremium: Device.isMobile ?
          KKBOXProtocol.MobileGoPremiumLink :
          KKBOXProtocol.PortalGoPremiumLink,
    };

    this.portImage = createElement('img', {
      key: WelcomePageRect.Keys.ImagePortrait,
      src: pathPortImage,
      className: WelcomePageRect.ClassNames.ImagePortrait,
      alt: 'Sponsored Premium',
    });

    const textLand = createElement('img', {
      key: WelcomePageRect.Keys.TextLandscape,
      src: pathLandText,
      className: WelcomePageRect.ClassNames.TextLandscape,
      alt: '觀賞影片後即可享受免費60分鐘音樂',
    });

    const textPort = createElement('img', {
      key: WelcomePageRect.Keys.TextPortrait,
      src: pathPortText,
      className: WelcomePageRect.ClassNames.TextPortrait,
      alt: '觀賞影片後即可享受免費60分鐘音樂',
    });

    this.texts = createElement('div', {
      key: WelcomePageRect.Keys.Texts,
      className: WelcomePageRect.ClassNames.Texts,
    }, [textLand, textPort]);

    const buttonPlayIt = createElement('a', {
      href: this.links.nextSlot,
      key: WelcomePageRect.Keys.ButtonPlayIt,
      className: WelcomePageRect.ClassNames.ButtonPlayIt,
      onClick: this.onPlayitClick,
    }, [
      createElement('img', {
        key: WelcomePageRect.Keys.ButtonImageInLandscape,
        className: WelcomePageRect.ClassNames.ButtonImageInLandscape,
        src: pathButtonPlayItLand,
        alt: '開始聽歌',
      }),
      createElement('img', {
        key: WelcomePageRect.Keys.ButtonImageInPortrait,
        className: WelcomePageRect.ClassNames.ButtonImageInPortrait,
        src: pathButtonPlayItPort,
        alt: '開始聽歌',
      }),
    ]);

    const buttonPlaylist = createElement('a', {
      href: this.links.viewPlaylist,
      key: WelcomePageRect.Keys.ButtonPlaylist,
      className: WelcomePageRect.ClassNames.ButtonPlaylist,
      onClick: this.onPlaylistClick,
    }, [
      createElement('img', {
        key: WelcomePageRect.Keys.ButtonImageInLandscape,
        className: WelcomePageRect.ClassNames.ButtonImageInLandscape,
        src: pathButtonPlaylistLand,
        alt: '精選歌單',
      }),
      createElement('img', {
        key: WelcomePageRect.Keys.ButtonImageInPortrait,
        className: WelcomePageRect.ClassNames.ButtonImageInPortrait,
        src: pathButtonPlaylistPort,
        alt: '精選歌單',
      }),
    ]);

    this.buttons = createElement('div', {
      key: WelcomePageRect.Keys.Buttons,
      className: WelcomePageRect.ClassNames.Buttons,
    }, [buttonPlaylist, buttonPlayIt]);

    this.premiumTextLand = createElement('a', {
      key: WelcomePageRect.Keys.PremiumLandWrapper,
      className: WelcomePageRect.ClassNames.PremiumLandWrapper,
      href: this.links.goPremium,
      onClick: this.onPremiumClick,
      target: '_blank',
    }, createElement('img', {
      key: WelcomePageRect.Keys.PremiumLand,
      src: pathGoPremiumLand,
      className: WelcomePageRect.ClassNames.PremiumLand,
      alt: '不想看廣告，升級白金會員',
    }));

    this.premiumTextPort = createElement('a', {
      key: WelcomePageRect.Keys.PremiumPortWrapper,
      className: WelcomePageRect.ClassNames.PremiumPortWrapper,
      href: this.links.goPremium,
      onClick: this.onPremiumClick,
      target: '_blank',
    }, createElement('img', {
      key: WelcomePageRect.Keys.PremiumPort,
      src: pathGoPremiumPort,
      className: WelcomePageRect.ClassNames.PremiumPort,
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
      eventLabel: WelcomePageRect.Config.PLAYLIST_ID,
    });
  }

  get contents() {
    const content = createElement('div', {
      key: 'content',
      className: WelcomePageRect.ClassNames.Content,
    }, [
      this.texts,
      this.buttons,
      this.premiumTextLand,
      this.premiumTextPort,
    ]);

    return createElement('div', {
      className: WelcomePageRect.ClassNames.ContentWrapper,
      key: 'contents',
    }, [
      this.portImage,
      content,
    ]);
  }

  render() {
    return createElement(FullPage, null, this.contents);
  }
}

