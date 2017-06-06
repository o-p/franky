import head from 'ramda/src/head';
import split from 'ramda/src/split';
import compose from 'ramda/src/compose';
import map from 'ramda/src/map';
import set from 'ramda/src/set';
import lensProp from 'ramda/src/lensProp';
import prop from 'ramda/src/prop';
import __ from 'ramda/src/__';

const keyLens = lensProp('key');
const propsWithKey = set(keyLens);

/**
 * 從所有屬性中提出指定 type 的屬性, 並強制加上 key
 */
const getPropsFrom = all => target => propsWithKey(target, prop(target, all));

/** 'result-id' => 'result' */
const getComponentName = compose(head, split('-'));

const getComponentFrom = factories => compose(
  prop(__, factories),
  getComponentName,
);

export default function generatePages(factories) {
  /** prop => ReactElement */
  const toComponent = getComponentFrom(factories);

  return map(pageSetting => {
    const { types } = pageSetting;
    const toProps = getPropsFrom(pageSetting);

    return map(type => {
      const props = toProps(type);
      const comp = toComponent(type);
      return comp(props);
    })(types);
  });
}
