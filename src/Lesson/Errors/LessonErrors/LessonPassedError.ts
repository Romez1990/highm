import { pipe } from 'fp-ts/lib/pipeable';
import { none, Option, some } from 'fp-ts/lib/Option';
import { fold } from 'fp-ts/lib/Either';
import { literal, type } from 'io-ts';
import HttpError from '../../../HttpService/Errors/HttpError';
import { check } from '../../../TypeCheck';
import LessonError from '../LessonError';

class LessonPassedError extends LessonError {
  public static identifySubError(err: HttpError): Option<LessonPassedError> {
    const TResponse = type({
      detail: literal('Lesson has been passed.'),
    });

    return pipe(
      check(TResponse, err.response),
      fold(
        () => none,
        () => some(new LessonPassedError('This lesson has been passed')),
      ),
    );
  }
}

LessonError.addSubclass(LessonPassedError);

export default LessonPassedError;
