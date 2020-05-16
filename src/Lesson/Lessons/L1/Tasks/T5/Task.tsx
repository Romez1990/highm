import React from 'react';
import MatrixFormula from '../../../../../Math/MatrixFormula';
import { TaskProps } from '../../../../Task';
import { Task5Type } from './TaskType';

function Task5({ children }: TaskProps): JSX.Element {
  const task = children as Task5Type;
  return (
    <MatrixFormula bracket="|" equalsTo="0" block>
      {task.equation}
    </MatrixFormula>
  );
}

export default Task5;
