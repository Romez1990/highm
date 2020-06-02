import { ErrorIdentifier } from '../../Error';

abstract class HttpErrorIdentifier<
  Output extends Error
> extends ErrorIdentifier<Output> {}

export default HttpErrorIdentifier;
