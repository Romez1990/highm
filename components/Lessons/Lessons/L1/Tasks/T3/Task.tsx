import React from 'react';
import MatrixFormula from '../../../../../Math/MatrixFormula';
import { TaskProps } from '../../../../../../src/Lesson';
import { Task3Type } from './TaskType';

function Task3({ children }: TaskProps): JSX.Element {
  const task = children as Task3Type;
  return (
    <MatrixFormula bracket="|" block>
      {task.matrixA}
    </MatrixFormula>
  );
}

export default Task3;
