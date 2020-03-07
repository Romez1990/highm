import React, { Fragment } from 'react';
import MatrixFormula from '../../../../../Math/MatrixFormula';
import { TaskProps } from '../../../../../../src/Lesson';
import { TaskType } from './TaskType';

function Task1({ children }: TaskProps): JSX.Element {
  const task = children as TaskType;
  return (
    <Fragment>
      <MatrixFormula name="A" block>
        {task.matrixA}
      </MatrixFormula>
      <MatrixFormula name="B" block>
        {task.matrixB}
      </MatrixFormula>
    </Fragment>
  );
}

export default Task1;
