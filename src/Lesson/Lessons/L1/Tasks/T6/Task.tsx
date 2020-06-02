import React from 'react';
import Task3 from '../T3/Task';
import { TaskProps } from '../../../../Task';
import { Task6Type } from './TaskType';

function Task6({ children }: TaskProps): JSX.Element {
  const task = children as Task6Type;
  return <Task3>{task}</Task3>;
}

export default Task6;
