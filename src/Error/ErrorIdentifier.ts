import { pipe } from 'fp-ts/lib/pipeable';
import { map, findFirstMap } from 'fp-ts/lib/Array';
import { Option, getOrElse } from 'fp-ts/lib/Option';
import AppError from './AppError';

export interface ErrorIdentifierSubclass<
  Output extends Error,
  Input extends Error
> {
  identifySubError(err: Input): Option<Output>;
}

abstract class ErrorIdentifier<
  Output extends Error,
  Input extends Error,
  Source extends Error = Input
> extends AppError {
  protected abstract primaryProcessing(err: Source): Input;

  public identify(err: Source): Output {
    const inputError = this.primaryProcessing(err);
    return pipe(
      this.subclasses,
      map(subclass => subclass.identifySubError),
      findFirstMap(identify => identify(inputError)),
      getOrElse((): Output | never => {
        throw err;
      }),
    );
  }

  protected subclasses: ErrorIdentifierSubclass<Output, Input>[] = [];

  public addSubclass(subclass: ErrorIdentifierSubclass<Output, Input>): void {
    this.subclasses.push(subclass);
  }
}

export default ErrorIdentifier;
