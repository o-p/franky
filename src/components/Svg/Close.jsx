/**
 * ___   ___
 * \  \ /  /
 *  \  V  /
 *   >   <
 *  /  .  \
 * /__/ \__\
 */
import React, { PropTypes } from 'react';
import joinClasses from 'fbjs/lib/joinClasses';

export default function SvgClose(props) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      className={joinClasses(props.className, 'svg--close')}
    >
      <line
        x1="1"
        y1="11"
        x2="11"
        y2="1"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      <line
        x1="1"
        y1="1"
        x2="11"
        y2="11"
        stroke="currentColor"
        strokeWidth="2.2"
      />
    </svg>
  );
}

SvgClose.propTypes = {
  className: PropTypes.string,
};
