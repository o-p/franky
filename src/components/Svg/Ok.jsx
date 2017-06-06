/**
 *   ______
 *  /  __  \
 * |  |  |  |
 * |  |  |  |
 * |  `--'  |
 *  \______/
 */
import React, { PropTypes } from 'react';
import joinClasses from 'fbjs/lib/joinClasses';

export default function SvgClose(props) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      className={joinClasses(props.className, 'svg--ok')}
    >
      <circle
        cx="6"
        cy="6"
        r="4.8"
        stroke="currentColor"
        strokeWidth="2.2"
        fill="none"
      />
    </svg>
  );
}

SvgClose.propTypes = {
  className: PropTypes.string,
};
