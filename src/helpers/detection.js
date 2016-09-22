import unsupportExternalLink from './rules/unsupportExternalLink';

const RULES = [
  unsupportExternalLink,
];

const params = (typeof location === 'object' && location.search || '')
    .slice(1)
    .split('&')
    .filter(str => str)
    .reduce((args, str) => {
      const idx = str.indexOf('=');

      let key = str;
      let value = true;

      if (idx !== -1) {
        key = str.slice(0, idx);
        value = decodeURIComponent(str.slice(idx + 1));
      }

      // eslint-disable-next-line
      args[key] = value;

      return args;
    }, {});

const { os, version, uid, mid } = params;
const DETECTION = RULES.reduce(
  (result, rule) => {
    const key = rule.name
                    .replace(/([a-z])([A-Z])/g, '$1_$2')
                    .toUpperCase(); // unsupportExternalLink => UNSUPPORT_EXTERNAL_LINK

    // eslint-disable-next-line
    result[key] = rule(params);
    return result;
  }, {
    os,
    version,
    uid,
    mid,
  });

export default DETECTION;
