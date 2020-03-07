import React, { Fragment } from 'react';
import parse from './parse';
import replace from './replace';

interface Props {
  children: string;
}

function TextPreprocessor({ children: text }: Props): JSX.Element {
  const tags = parse(text);
  const elements = replace(tags, text);
  return <Fragment>{elements}</Fragment>;
}

export default TextPreprocessor;
