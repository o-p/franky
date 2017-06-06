/**
 * 提供 curried GA function (第一個參數 <tracker>.send必須由 client bind)
 * 生成可以用於建立 TrackingInterface 的 config
 */
import assign from 'lodash/assign';
import padStart from 'lodash/padStart';

const normalizeAnswer = value => padStart(value, 2, '0');

/**
 * @param {Function} fn ga('xxx.send', ...args)
 */
export default function connectGoogleAnalystic(fn, opt = {}) {
  let pageId = 0;
  let lastLogTime = 0;

  const options = assign({
    eventName: 'Event',
  }, opt);

  const getPageId = () => `000${pageId + 1}`.slice(-3);
  const logStayTime = duration => fn({
    hitType: 'event',
    eventCategory: 'StayTime',
    eventAction: `PageStayTime${getPageId()}`, // e.g. PageStayTime001
    eventValue: (duration / 1000) | 0, // 單位秒, 取整數, 無條件捨去
  });

  /**
   * 原本的天才版本規格, 太高深了, 我不想要
   *   hitType: 'event',
   *   eventAction: 'Answer00101'
   */
  const answer = (question, value) => fn({
    hitType: 'event',
    eventCategory: 'Answers',
    eventAction: question,
    eventLabel: `${question}${normalizeAnswer(value)}`,
  });

  const externalLink = () => fn({
    hitType: 'event',
    eventCategory: 'Standard',
    eventAction: 'ExternalLink',
  });

  const goPremium = () => fn({
    hitType: 'event',
    eventCategory: 'Standard',
    eventAction: 'GoPremium',
  });

  const pageView = (pageName, pageIndex) => {
    const now = new Date().getTime();
    // script 第一次載入 and mount 不會 send stay time
    if (lastLogTime) logStayTime(now - lastLogTime);

    lastLogTime = now;
    pageId = pageIndex;

    return fn({
      hitType: 'pageview',
      page: `${options.eventName}/${pageName}`,
    });
  };

  const spPlaylist = (playlist) => fn({
    hitType: 'event',
    eventCategory: 'Standard',
    eventAction: 'GoPlaylist',
    eventLabel: playlist,
  });

  const spStart = () => fn({
    hitType: 'event',
    eventCategory: 'Standard',
    eventAction: 'GoPlay',
  });

  return {
    answer,
    // 這邊沒實作 customEvent, 直接留空
    // 如果使用到 TrackingInterface::customEvent
    // 會出現警告訊息, 提示沒有實作這部分
    externalLink,
    goPremium,
    pageView,
    spPlaylist,
    spStart,
  };
}
