import { AxiosError } from 'axios';
import { pipe } from 'fp-ts/lib/pipeable';
import { map } from 'fp-ts/lib/Array';
import { AppError, identifyError, ErrorIdentifier } from '../../Error';

export declare type RequestError = AxiosError<unknown>;

interface NetworkErrorSubclass {
  identifySubError: ErrorIdentifier<RequestError, NetworkError>;
}

abstract class NetworkError extends AppError {
  protected constructor(
    message: string,
    public readonly requestError: RequestError,
  ) {
    super(message);
  }

  public static identify(err: RequestError): NetworkError {
    return pipe(
      NetworkError.subclasses,
      map(subclass => subclass.identifySubError),
      identifyError(err),
    );
  }

  protected static subclasses: NetworkErrorSubclass[] = [];

  public static addSubclass(subclass: NetworkErrorSubclass): void {
    this.subclasses.push(subclass);
  }
}

export default NetworkError;
