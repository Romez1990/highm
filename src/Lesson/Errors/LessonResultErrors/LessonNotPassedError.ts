import { pipe } from 'fp-ts/lib/pipeable';
import { none, Option, some } from 'fp-ts/lib/Option';
import { fold } from 'fp-ts/lib/Either';
import { literal, type } from 'io-ts';
import HttpError from '../../../HttpService/Errors/HttpError';
import { check } from '../../../TypeCheck';
import LessonResultError from '../LessonResultError';

class LessonNotPassedError extends LessonResultError {
  public static identifySubError(err: HttpError): Option<LessonNotPassedError> {
    const TResponse = type({
      detail: literal('Lesson has not been passed.'),
    });

    return pipe(
      check(TResponse, err.response),
      fold(
        () => none,
        () => some(new LessonNotPassedError('This lesson has not been passed')),
      ),
    );
  }
}

LessonResultError.addSubclass(LessonNotPassedError);

export default LessonNotPassedError;
