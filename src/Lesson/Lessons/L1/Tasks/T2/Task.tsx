import React from 'react';
import MatrixFormula from '../../../../../Math/MatrixFormula';
import { TaskProps } from '../../../../Task';
import { Task2Type } from './TaskType';

function Task2({ children }: TaskProps): JSX.Element {
  const task = children as Task2Type;
  return (
    <MatrixFormula name="A" block>
      {task.matrixA}
    </MatrixFormula>
  );
}

export default Task2;
