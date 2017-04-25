/**
 * 假設網址是 ?doSomething&username=chris
 *
 * loc: {
 *   doSomething: true,
 *   username: "chris",
 * }
 */
import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';
import assign from 'lodash/assign';

const loc = {};
if (ExecutionEnvironment.canUseDOM) {
  const params = location.search.substr(1).split('&');

  params.every((str) => {
    if (!str) return false;
    const idx = str.indexOf('=');
    if (idx === -1) return assign(loc, { [str]: true });

    const name = decodeURIComponent(str.substr(0, idx));
    const val = decodeURIComponent(str.substr(idx + 1));
    return assign(loc, { [name]: val });
  });
}
export default loc;
