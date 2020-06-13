import React, { ReactNode } from 'react';
import { KatexOptions, ParseError } from 'katex';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import TeX from '@matejmazur/react-katex';

interface Props {
  children: string;
  block?: boolean;
  errorColor?: string;
  renderError?: (error: ParseError | TypeError) => ReactNode;
  settings?: KatexOptions;
}

function Formula({ children, block }: Props): JSX.Element {
  return <TeX block={block}>{children}</TeX>;
}

export default Formula;
