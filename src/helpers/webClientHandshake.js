import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';
import { listen } from 'fbjs/lib/EventListener';

export default callback =>
  ExecutionEnvironment.canUseDOM
  && listen(
    window,
    'message',
    ev => ev.data === 'webclient' && callback()
  );
