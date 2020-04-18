import React, { Fragment } from 'react';
import SystemOfEquations from '../../../../../Math/SystemOfEquations';
import { TaskProps } from '../../../../../../src/Lesson';
import { Task2Type } from './TaskType';

function Task2({ children }: TaskProps): JSX.Element {
  const task = children as Task2Type;
  return (
    <Fragment>
      <SystemOfEquations
        coefficient={task.coefficientMatrix}
        constantTerms={task.constantTermsVector}
        block
      />
    </Fragment>
  );
}

export default Task2;
