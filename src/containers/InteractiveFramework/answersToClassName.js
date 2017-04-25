/**
 * @example
 *     const answers = { quiz: 3 };
 *     answerToClassName(answers); // 'answer-quiz-3'
 */
import compose from 'ramda/src/compose';
import join from 'ramda/src/join';
import map from 'ramda/src/map';
import toPairs from 'ramda/src/toPairs';

const prefix = value => `answer-${value}`;
const toClassNames = compose(prefix, join('-'));
const joinClasses = join(' ');

export default compose(joinClasses, map(toClassNames), toPairs);
