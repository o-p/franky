/**
 * 互動模組用的, 爬 config 產生 pages
 *   context: global settings, global functions
 *   props: page 的設定
 */
import './interactive-framework.scss';
import { Component, PropTypes, createElement } from 'react';

import map from 'ramda/src/map';
import merge from 'ramda/src/merge';
import prop from 'ramda/src/prop';

import joinClasses from 'fbjs/lib/joinClasses';

import Lightbox from '../../components/Lightbox';

import createFunctionWithTimeout from '../../helpers/createFunctionWithTimeout';
import TrackingInterface from '../../helpers/TrackingInterface';
import webClientHandshake from '../../helpers/webClientHandshake';

import generatePages from './generatePages';
import linksGetter from './default-links';
import answersToClassName from './answersToClassName';
import defaultStyles from './defaultStyles';

import { a, button, div } from '../../components/html5';

const childContextTypes = {
  answers: PropTypes.object,
  lightboxSetter: PropTypes.func,
  linkProvider: PropTypes.func,
  readEventInfo: PropTypes.func,
  saveAnswer: PropTypes.func,
  styles: PropTypes.object,
  theme: PropTypes.object,
  toggleLightbox: PropTypes.func,
  toStep: PropTypes.func,
  userFeed: PropTypes.func,
};
const propTypes = {
  tracker: PropTypes.instanceOf(TrackingInterface).isRequired,
  components: PropTypes.object.isRequired,
  links: PropTypes.shape({}),
  event_name: PropTypes.string.isRequired,
  pages: PropTypes.array.isRequired,
  playlist: PropTypes.string,
  // 基本色票
  theme: PropTypes.shape({
    pageBackground: PropTypes.string,
    pageText: PropTypes.string,
    contentBackground: PropTypes.string,
    contentText: PropTypes.string,
    contentHighlight: PropTypes.string,
    buttonBackground: PropTypes.string,
    buttonText: PropTypes.string,
  }),
};
export default class InteractiveFramework extends Component {

  constructor(props) {
    super(props);

    const { tracker, components, pages, theme } = props;
    // 紀錄使用者回答的答案, 同時此資料會跨 component share (不過不會觸發 update component)
    this.answers = {};
    // cache each page elements
    this.history = [];
    this.pages = generatePages(components)(pages);
    this.pageNames = map(prop('pageName'), pages);
    this.toggleLightbox = () => this.setState({ showLightbox: !this.state.showLightbox });

    this.state = {
      lightbox: null,
      page: this.pages[0],
      pageName: pages[0].pageName,
      showLightbox: false,
      step: 0,
    };

    // instance default props
    this.isWebClient = false;
    this.lightboxProps = {};
    this.lightboxBody = null;
    this.lightboxSetter = this.lightboxSetter.bind(this);
    this.links = merge(props.links, linksGetter({ playlist: props.playlist }));
    this.styles = defaultStyles(theme);

    // Bind function context to this
    this.getAnswerLink = this.getAnswerLink.bind(this);
    this.getGoPremiumLink = this.getGoPremiumLink.bind(this);
    this.getPlayItButton = this.getPlayItButton.bind(this);
    this.getShowPageLink = this.getShowPageLink.bind(this);
    this.getViewPlaylistButton = this.getViewPlaylistButton.bind(this);
    this.linkProvider = this.linkProvider.bind(this);
    this.onPlayItClick = this.onPlayItClick.bind(this);
    this.onPlaylistClick = this.onPlaylistClick.bind(this);
    this.readEventInfo = () => tracker.customEvent('readEventInfo');
    this.toStep = this.toStep.bind(this);
    this.trackAnswer = this.trackAnswer.bind(this);
    this.trackPageView = this.trackPageView.bind(this);
    this.userFeed = (value) => tracker.customEvent('userFeed', value);

    // helpers
    this.setAnswerLink = (question, answer, page) =>
        () =>
        (this.trackAnswer(answer, question), page && this.toStepByName(page));
  }

  getChildContext() {
    return {
      answers: this.answers,
      lightboxSetter: this.lightboxSetter,
      linkProvider: this.linkProvider,
      readEventInfo: this.readEventInfo,
      saveAnswer: this.trackAnswer,
      styles: this.styles,
      theme: this.props.theme,
      toggleLightbox: this.toggleLightbox,
      toStep: this.toStep,
      userFeed: this.userFeed,
    };
  }
  componentDidMount() {
    // 跟 WebClient Handshake
    webClientHandshake(this.setAppInWebClient.bind(this));
    this.trackPageView(this.state.step);
  }
  componentDidUpdate(prevProps, prevState) {
    const { step } = this.state;
    if (prevState.step !== step) this.trackPageView(step);
  }

  /**
   * SP - 直接開始聽歌 event handler
   * @private
   * @param {React\SyntheticEvent} ev
   */
  onPlayItClick(ev) {
    if (!this.hasCompleted) {
      this.hasCompleted = true;
      ev.preventDefault();
      const handler = createFunctionWithTimeout(this.triggerClientCallback(ev.target), 1000);
      this.props.tracker.spStart(handler);
    }
  }

  /**
   * SP - View playlist event handler
   * @private
   * @param {React\SyntheticEvent} ev
   */
  onPlaylistClick(ev) {
    if (!this.hasCompleted) {
      this.hasCompleted = true;
      ev.preventDefault();
      const handler = createFunctionWithTimeout(this.triggerClientCallback(ev.target), 1000);
      const { playlist } = this.props;
      this.props.tracker.spPlaylist(playlist, handler);
    }
  }

  /**
   * Click Go Premium Link
   * @private
   * @param {React\SyntheticEvent} ev
   */
  onGoPremiumClick(ev) {
    if (!this.hasCompleted) {
      this.hasCompleted = true;
      ev.preventDefault();
      const handler = createFunctionWithTimeout(this.triggerClientCallback(ev.target), 1000);
      this.props.tracker.goPremium(handler);
    }
  }

  /** 指定 App 位於 Web Client 中 (browser iframe) */
  setAppInWebClient() { this.isWebClient = true; }

  setAnswer(name, value) {
    this.answers[name] = value;
    this.bodyClassName = answersToClassName(this.answers);
  }

  /** @private 回答問題的連結, 依照設定可同時前往指定頁 */
  getAnswerLink(props, children) {
    const { question, answer, page, ...rest } = props;
    const onClick = this.setAnswerLink(question, answer, page);
    return button({
      onClick,
      ...rest,
    }, children);
  }

  /** @private 完成 SP 任務, 開啟特定 playlist 的連結 */
  getViewPlaylistButton(props, children) {
    return a({
      href: this.links.viewPlaylist,
      onClick: this.onPlaylistClick,
      ...props,
    }, children);
  }

  /** @private 完成 SP 任務, 開始聽歌的連結 */
  getPlayItButton(props, children) {
    return a({
      href: this.links.nextSlot,
      onClick: this.onPlayItClick,
      ...props,
    }, children);
  }

  /** @private 前往指定頁面用的連結 */
  getShowPageLink(props, children) {
    const { value, ...rest } = props;
    const onClick = value ?
        () => this.toStepByName(value) :
        () => this.toStepById();

    return button({
      onClick,
      ...rest,
    }, children);
  }

  /** @private 前往升級白金會員頁的連結 */
  getGoPremiumLink(props, children) {
    return a({
      href: this.links.goPremium,
      onClick: this.onGoPremiumClick,
      target: '_blank',
      ...props,
    }, children);
  }

  /**
   * 觸發各種 client 內的 SP 回報機制, 目前用 HTML Element 當作輸入參數比較醜一點
   * 未來有時間可以寫兩種 interface, webClient / non-webClient
   * non-webClient 可以考慮透過 react 生成假的 link 來 click,
   * (如果元件沒有 mount 就透過 js click 怕會被阻擋?)
   *
   * @param {HTMLDOMElement} target
   */
  triggerClientCallback(target) {
    return this.isWebClient ?
        () => parent.window.postMessage(target.href, '*') :
        target.click.bind(target);
  }

  /**
   * 紀錄選擇的答案
   * @param {*} value
   * @param {string} name
   */
  trackAnswer(value, name) {
    this.setAnswer(name, value);
    // this.answers[name] = value;
    return this.props.tracker.answer(name, value);
  }
  /**
   * 紀錄瀏覽頁面行為, 其實 state 就有 step, pageName, 但這邊假設可以任意使用不限定只能記錄當前頁面
   * @param {number} step
   */
  trackPageView(step) {
    const pageName = this.pageNames[step];
    return this.props.tracker.pageView(pageName, step);
  }

  /**
   * 讓子元素可以產生具備符合標準功能的連結
   * TODO 改寫成每個元件獨立呼叫 func, 現在這樣看不下去
   */
  linkProvider(type, props, children) { // , options = {}) {
    switch (type) {
      // 打開指定歌單
      case 'view_playlist':
        return this.getViewPlaylistButton(props, children);
      // 聽歌去
      case 'playit':
        return this.getPlayItButton(props, children);
      // 升級白金會員
      case 'go_premium':
        return this.getGoPremiumLink(props, children);
      // 回答問題 (並換頁)
      case 'answer':
        return this.getAnswerLink(props, children);
      // 顯示指定頁
      case 'show_page':
        return this.getShowPageLink(props, children);
      default:
        return null;
    }
  }

  /** 依照相對順序換頁, 預設為顯示下一頁 */
  toStepById(diff = 1) {
    const step = this.state.step + diff;
    const pageName = this.props.pages[step].pageName;
    const page = this.pages[step];
    return this.setState({ step, page, pageName });
  }

  /** 依照絕對名稱換頁 */
  toStepByName(pageName) {
    const step = this.pageNames.indexOf(pageName);
    const page = this.pages[step];
    return this.setState({ step, page, pageName });
  }

  addCurrentStepToHistory() { this.history.push(this.state.step); }
  backHistory() { this.toStep(this.history.pop()); }

  /** 換頁用 (數字用相對順序換頁, 字串則直接跳到指定頁) */
  toStep(step) {
    this.addCurrentStepToHistory();
    return typeof step === 'string' ? this.toStepByName(step) : this.toStepById(step);
  }

  lightboxSetter(body, props = {}) {
    this.lightboxBody = body;
    this.lightboxProps = props;
  }

  get lightbox() {
    return createElement(Lightbox, {
      key: 'lightbox',
      show: this.state.showLightbox,
      onRequestClose: this.toggleLightbox,
      modal: true,
      ...this.lightboxProps,
    }, this.lightboxBody);
  }

  render() {
    const { pageName } = this.state;

    // 多層 DOM 結構, 限制 port / land 版型用, 與 code 無關
    const content = div({
      className: 'full-page-outer-container',
    }, div({
      className: 'fullpage-inner-container',
    }, this.state.page));

    return div({
      className: joinClasses('full-page', pageName, this.bodyClassName),
      style: {
        backgroundColor: this.props.theme.pageBackground,
        color: this.props.theme.pageText,
      },
    },
    content,
    this.lightbox);
  }
}
InteractiveFramework.propTypes = propTypes;
InteractiveFramework.childContextTypes = childContextTypes;
