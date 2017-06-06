/**
 * helper for generate config from astTracking functions to TrackingInterface.
 * 生成可以用於建立 TrackingInterface 的 config
 */
import uniq from 'ramda/src/uniq';

export default function connectAstTracking(tracker, configs) {
  const durations = [];
  const answers = [];

  let hasReadEventInfo = false;
  let lastPageId = 0;
  let pageViewStart = new Date().getTime();

  const answer = (question, value) => {
    answers.push(question);
    tracker.log({
      [question]: value,
    });
  };

  const customEvent = (type, value) => {
    switch (type) {
      case 'readEventInfo': // 讀活動說明
        hasReadEventInfo = true;
        return hasReadEventInfo;
      case 'userFeed': // 使用者自行輸入的資料
        return tracker.log(value);
      default:
        return false;
    }
  };

  const pageView = (pageName, pageIndex) => {
    const now = new Date().getTime();
    const lastPageStay = now - pageViewStart;
    const savedDuration = durations[lastPageId] | 0;
    durations[lastPageId] = lastPageStay + savedDuration;

    pageViewStart = now;
    lastPageId = pageIndex;
  };

  const sendWith = (type, playlist = '0', callback) => tracker.send({
    answers: uniq(answers),
    campaign_uuid: configs.campaign_uuid,
    duration: durations.map(t => Math.round(t / 1000)).join(','),
    event_info: hasReadEventInfo ? '1' : '0',
    event_name: configs.event_name,
    playlist,
    type,
  }, callback);

  const goPremium = (callback) => sendWith('go_premium', '0', callback);
  const spPlaylist = (playlist, callback) => sendWith('playlist', playlist, callback);
  const spStart = (callback) => sendWith('playit', '0', callback);

  return {
    answer,
    customEvent,
    goPremium,
    pageView,
    spPlaylist,
    spStart,
  };
}
