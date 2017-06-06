/**
 * 作為tracking functions interface
 */
import warning from 'fbjs/lib/warning';
import compose from 'ramda/src/compose';
import is from 'ramda/src/is';
import pick from 'ramda/src/pick';
import pickBy from 'ramda/src/pickBy';
import curryN from 'ramda/src/curryN';
import assign from 'lodash/assign';

export default class TrackingInterface {
  constructor(list) {
    const validNames = pick([
      'answer',
      'customEvent',
      'externalLink',
      'goPremium',
      'pageView',
      'spPlaylist',
      'spStart',
    ]);

    const validTypes = pickBy(is(Function));
    const assignToThis = curryN(2)(assign)(this);
    // 把符合規則的 config.<function> ==> this.<function>
    compose(assignToThis, validNames, validTypes)(list);
  }

  /** Log of the answer user choosed */
  answer(question, value) {
    warning(
      false,
      '未覆寫 $s::answer (question: %s, value: %s)', this.constructor.name, question, value);
  }
  /** Log only support types, should not throw error. */
  customEvent(type) {
    warning(false, '未覆寫 $s::customEvent (type: %s)', this.constructor.name, type);
  }
  externalLink() { warning(false, '未覆寫 $s::externalLink', this.constructor.name); }
  goPremium() { warning(false, '未覆寫 $s::goPremium', this.constructor.name); }
  pageView(pageName, pageIndex) {
    warning(
      false,
      '未覆寫 $s::pageView (pageName: %s, pageIndex: %s)',
      this.constructor.name,
      pageName,
      pageIndex
    );
  }
  /** Log of user init the sponsored premium with specific playlist */
  spPlaylist(playlist, callback) {
    warning(
      false,
      '未覆寫 $s::spPlaylist (playlist: %s, callback: %s) - 開始 Sponsored Premium (歌單)',
      this.constructor.name,
      playlist,
      callback
    );
  }
  /** Log of user init the sponsored premium */
  spStart(callback) {
    warning(
      false,
      '未覆寫 $s::spStart (callback: %s) - 開始Sponsored Premium',
      this.constructor.name,
      callback
    );
  }
}
