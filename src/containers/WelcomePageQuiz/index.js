/**
 * 問答類 welcome page
 * 透過 InteractiveFramework 生成符合需求的靜態網頁
 *
 * InteractiveFramework 所需要的 config / external functions 由這邊組裝後提供
 */
import { createElement } from 'react';
import merge from 'ramda/src/merge';

import './welcome-page-quiz.scss';
import InteractiveFramework from '../InteractiveFramework';
import components from './components';
import tracking from './tracking';
import loc from '../../helpers/location';

// minify 之後讓 api replace 用的keyword
const jsonPlaceholder = '%JSON_CONFIG%';
const config = typeof jsonPlaceholder === 'object'
  ? jsonPlaceholder
  : require('./default-config.js').default;

const tracker = tracking({
  // ast tracking required params:
  uid: loc.uid,
  campaign_uuid: config.campaign_uuid,
  // both GA & ast tracking required:
  event_name: config.event_name,
});

const props = merge(config, {
  tracker,
  components,
});

export default function WelcomePageQuiz() {
  return createElement(InteractiveFramework, props);
}

// expose for bundler usage.
export { config };
