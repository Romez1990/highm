import React, { Fragment } from 'react';
import Tag from './Tag';
import mapers from './mapers';
import TextPreprocessorError from './TextPreprocessorError';

function replace(tags: Tag[], sourceText: string): JSX.Element[] {
  const content: JSX.Element[] = [];
  let remainder = sourceText;
  let key = 0;

  tags.reverse().forEach(tag => {
    const fragment = remainder.slice(tag.index + tag.text.length);
    if (fragment.length > 0) {
      content.unshift(<Fragment key={key}>{fragment}</Fragment>);
      key += 1;
    }

    const Component = mapers.get(tag.name);
    if (typeof Component === 'undefined')
      throw new TextPreprocessorError(`Unknown tag ${tag.name}`);
    content.unshift(<Component key={key}>{tag}</Component>);
    key += 1;

    remainder = remainder.slice(0, tag.index);
  });

  if (remainder.length > 0) {
    content.unshift(<Fragment key={key}> {remainder} </Fragment>);
  }

  return content;
}

export default replace;
