import React from 'react';
import MatrixFormula from '../../../../../Math/MatrixFormula';
import { TaskProps } from '../../../../../../src/Lesson';
import { Task6Type } from './TaskType';

function Task6({ children }: TaskProps): JSX.Element {
  const task = children as Task6Type;
  return (
    <MatrixFormula bracket="|" block>
      {task.matrixA}
    </MatrixFormula>
  );
}

export default Task6;
