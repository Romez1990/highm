import { pipe } from 'fp-ts/lib/pipeable';
import { map } from 'fp-ts/lib/Array';
import { identifyError, ErrorIdentifier } from '../../Error';
import LessonModuleError from './LessonModuleError';
import { HttpError } from '../../HttpService';

interface LessonResultErrorSubclass {
  identifySubError: ErrorIdentifier<HttpError, LessonResultError>;
}

abstract class LessonResultError extends LessonModuleError {
  public static identify(err: HttpError): LessonResultError {
    return pipe(
      LessonResultError.subclasses,
      map(subclass => subclass.identifySubError),
      identifyError(err),
    );
  }

  protected static subclasses: LessonResultErrorSubclass[] = [];

  public static addSubclass(subclass: LessonResultErrorSubclass): void {
    this.subclasses.push(subclass);
  }
}

export default LessonResultError;
