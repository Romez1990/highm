import { ParsedUrlQuery } from 'querystring';

function getLesson(query: ParsedUrlQuery): number {
  const { lesson } = query;
  if (typeof lesson !== 'string') throw new Error('Param must be string');
  return parseInt(lesson, 10);
}

export default getLesson;
