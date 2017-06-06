import mergeWith from 'ramda/src/mergeWith';
import juxt from 'ramda/src/juxt';
import unapply from 'ramda/src/unapply';

import clientFunctionProvider from './clientFunctionProvider';
import { log, send } from '../../helpers/astEventTracking';
import connectGA from '../../helpers/connectGoogleAnalystic';
import connectAst from '../../helpers/connectAstTracking';
import TrackingInterface from '../../helpers/TrackingInterface';


export default function tracking(config) {
  // GA Tracking
  const gaTracking = connectGA(clientFunctionProvider.track, {
    eventName: config.event_name,
  });
  // AST Tracking
  const astTracking = connectAst({ log, send }, {
    event_name: config.event_name,
    uid: config.uid,
    campaign_uuid: config.campaign_uuid,
  });

  // Merge two types of tracking:
  // 將相同的參數傳入所有 functions 中
  // juxta- (並列), 來源: https://en.wiktionary.org/wiki/juxta-
  const applyAll = unapply(juxt);
  // 合併兩種 Tracking Functions, 有同名的情況兩者並列執行
  const merged = mergeWith((applyAll), astTracking, gaTracking);

  return new TrackingInterface(merged);
}
