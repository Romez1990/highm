import React from 'react';
import { TaskProps } from '../../../../Task';
import { Task2Type } from './TaskType';
import Task1 from '../T1/Task';

function Task2({ children }: TaskProps): JSX.Element {
  const task = children as Task2Type;

  return <Task1>{task}</Task1>;
}

export default Task2;
