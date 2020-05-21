import { pipe } from 'fp-ts/lib/pipeable';
import { map } from 'fp-ts/lib/Array';
import { identifyError, ErrorIdentifier } from '../../Error';
import LessonModuleError from './LessonModuleError';
import { HttpError } from '../../HttpService';

interface LessonErrorSubclass {
  identifySubError: ErrorIdentifier<HttpError, LessonError>;
}

abstract class LessonError extends LessonModuleError {
  public static identify(err: HttpError): LessonError {
    return pipe(
      LessonError.subclasses,
      map(subclass => subclass.identifySubError),
      identifyError(err),
    );
  }

  protected static subclasses: LessonErrorSubclass[] = [];

  public static addSubclass(subclass: LessonErrorSubclass): void {
    this.subclasses.push(subclass);
  }
}

export default LessonError;
