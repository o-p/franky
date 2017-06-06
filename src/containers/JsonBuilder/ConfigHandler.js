/**
 * 預計:
 *  init => 傳入 default JSON + update endpoint + update action
 *          return instance
 *
 *  instance -> update(path, value) -> new instance (can be sent)
 *  instance -> send() -> new instance (can't be sent)
 *  instance -> overwrite(json) 整組更新 (可能用不到)
 */
// import merge from 'ramda/src/merge';
// import view from 'ramda/src/view';
import __ from 'ramda/src/__';
import assoc from 'ramda/src/assoc';
import assocPath from 'ramda/src/assocPath';
import clone from 'ramda/src/clone';
import compose from 'ramda/src/compose';
import identity from 'ramda/src/identity';
import is from 'ramda/src/is';
import lens from 'ramda/src/lens';
import over from 'ramda/src/over';
import path from 'ramda/src/path';
import pick from 'ramda/src/pick';
import prop from 'ramda/src/prop';

import assign from 'lodash/assign';

const pickValid = pick([
  'action',
  'endpoint',
  'json',
]);

const jsonLens = lens(prop('json'), assoc('json'));

export default class ConfigHandler {
  static of(opt = {}) { return new ConfigHandler(opt); }
  static from(handler) {
    if (is(ConfigHandler)(handler)) {
      return handler.map(identity);
    }

    return ConfigHandler.of({});
  }

  constructor(opt = {}) {
    assign(this, pickValid(opt));

    this.get = path(__, this.json);
    this.update = compose(this.map, assocPath);
  }

  toJSON() {
    return JSON.stringify(this.json);
  }

  map(fn) {
    return compose(
      ConfigHandler.of,   // 4. 產生新的 instance
      over(jsonLens, fn), // 3. 透過 fn 操作 json 部分
      clone,              // 2. 產生新的一份 (主要針對 json.pages)
      pickValid           // 1. 取出要 dump 的必要資料
    )(this);
  }
}
