import React from 'react';
import { AnswerProps } from '../../../../Answer';
import Answer1 from '../T1/Answer';

function Answer2({ name }: AnswerProps): JSX.Element {
  return <Answer1 name={name} />;
}

export default Answer2;
