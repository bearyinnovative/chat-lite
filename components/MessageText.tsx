import React from 'react';
import cx from 'classnames';
import { Emoji, extract } from '@dididc/emojipack';
import '@dididc/emojipack/dist/index.css';

function MessageText(props: { text: string; className?: string }) {
  const { text = '', className } = props;
  const matches = Array.from(text.matchAll(/:[a-zA-Z_\-0-9]+:/g));
  const segments = [];
  if (matches.length) {
    matches.forEach((match, no) => {
      const startIdx = match.index;
      if (no === 0 && startIdx > 0) {
        segments.push(<span>{text.slice(0, startIdx)}</span>);
      }
      segments.push(<Emoji shortcode={extract(match[0])} />);
      const nextMatch = matches[no + 1];
      const endIdx = nextMatch ? nextMatch.index : undefined;
      segments.push(
        <span>{text.slice(startIdx + match[0].length, endIdx)}</span>
      );
    });
  } else {
    segments.push(<span>{text}</span>);
  }

  return <div className={cx(className)}>{segments}</div>;
}

export default MessageText;
