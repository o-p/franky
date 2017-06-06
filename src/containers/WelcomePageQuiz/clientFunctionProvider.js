/**
 * 負責提供 client(window) function 的介面
 */
import emptyFunction from 'fbjs/lib/emptyFunction';
import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';

const astInterface = '__Ast_Interface__';
const provider = ExecutionEnvironment.canUseDom ?
    window[astInterface] :
    {};

const track = provider && typeof provider.track instanceof Function
  ? provider.track
  : emptyFunction;

export default {
  track,
};
