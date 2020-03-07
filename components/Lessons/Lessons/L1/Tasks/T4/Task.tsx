import React from 'react';
import MatrixFormula from '../../../../../Math/MatrixFormula';
import { TaskProps } from '../../../../../../src/Lesson';
import { Task4Type } from './TaskType';

function Task4({ children }: TaskProps): JSX.Element {
  const task = children as Task4Type;
  return (
    <MatrixFormula name="x" block>
      {task.matrixA}
    </MatrixFormula>
  );
}

export default Task4;
