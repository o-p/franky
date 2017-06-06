import joinClasses from 'fbjs/lib/joinClasses';
import __ from 'ramda/src/__';
import compose from 'ramda/src/compose';
import curryN from 'ramda/src/curryN';
import lensProp from 'ramda/src/lensProp';
import over from 'ramda/src/over';
import prop from 'ramda/src/prop';
import set from 'ramda/src/set';

import './image-with-media-query.scss';
import { image } from '../Image';

/**
 * 調整 props 中的 className
 * @param {Function} 參數1 - class name handler, input 原className, 輸出新的 className
 * @param {Function} 參數2 - props
 */
const manipulateClassName = over(lensProp('className'));
const lenMedia = lensProp('mediaQuery');
const addClass = curryN(2, joinClasses);

const base = 'iwmq--';
// 取得對應 media query 的特別 class name
const getMediaQueryClassName = prop(__, {
  landscape: `${base}land-only`,
  portrait: `${base}port-only`,
});

/**
 * @param {object} props
 * @return {ReactElement}
 */
function ImageWithMediaQuery(props) {
  const { mediaQuery, ...imgProps } = props;
  // 對應 media query 需要的 class name
  const mediaClass = getMediaQueryClassName(mediaQuery);

  // className => mediaQueryClassName
  const appendMediaClass = addClass(__, mediaClass);

  // props<className> => props<mediaQueryClassName>
  const newProps = manipulateClassName(appendMediaClass, imgProps);

  return image(newProps);
}

const setMediaTo = set(lenMedia);
const landImage = compose(ImageWithMediaQuery, setMediaTo('landscape'));
const portImage = compose(ImageWithMediaQuery, setMediaTo('portrait'));

export {
  ImageWithMediaQuery as default,
  landImage,
  portImage,
};
