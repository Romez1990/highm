import React, { Fragment } from 'react';
import SystemOfEquations from '../../../../../Math/SystemOfEquations';
import { TaskProps } from '../../../../Task';
import { Task1Type } from './TaskType';

function Task1({ children }: TaskProps): JSX.Element {
  const task = children as Task1Type;
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

export default Task1;
