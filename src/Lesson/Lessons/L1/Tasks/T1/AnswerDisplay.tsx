import React from 'react';
import { Answer1Type } from './AnswerType';

interface Props {
  answer: Answer1Type;
}

function Answer1Display({
  answer: { whichOfProducts, product },
}: Props): JSX.Element {
  return <div>123</div>;
}

export default Answer1Display;
