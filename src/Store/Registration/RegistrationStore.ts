import { observable, action } from 'mobx';
import { pipe } from 'fp-ts/lib/pipeable';
import { TaskEither, map } from 'fp-ts/lib/TaskEither';
import AuthenticationService, {
  RegistrationError,
  RegistrationCodeCheckParams,
} from '../../AuthenticationService';
import RegistrationBeforeCheckingError from './RegistrationBeforeCheckingError';

export interface RegisterParams {
  email: string;
  password: string;
}

class RegistrationStore {
  @observable
  public registrationCodeValid: boolean | undefined = undefined;

  @action
  public setRegistrationCodeValid(
    registrationCodeValid: boolean | undefined,
  ): void {
    this.registrationCodeValid = registrationCodeValid;
  }

  public markRegistrationCodeValid(): void {
    this.setRegistrationCodeValid(true);
  }

  public makeRegistrationCodeInvalid(): void {
    this.setRegistrationCodeValid(false);
  }

  public makeNoRegistrationCode(): void {
    this.setRegistrationCodeValid(undefined);
  }

  public registrationCode: string | undefined = undefined;

  public firstName: string | undefined = undefined;

  public lastName: string | undefined = undefined;

  public registrationCodeCheck(
    data: RegistrationCodeCheckParams,
  ): TaskEither<RegistrationError[], void> {
    return pipe(
      AuthenticationService.registrationCodeCheck(data),
      map(() => {
        this.registrationCode = data.registrationCode;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.markRegistrationCodeValid();
      }),
    );
  }

  public register(data: RegisterParams): TaskEither<RegistrationError[], void> {
    const { registrationCode, firstName, lastName } = this;
    if (
      typeof registrationCode === 'undefined' ||
      typeof firstName === 'undefined' ||
      typeof lastName === 'undefined'
    ) {
      throw new RegistrationBeforeCheckingError('');
    }
    return AuthenticationService.register({
      ...data,
      registrationCode,
      firstName,
      lastName,
    });
  }

  public hydrate(store: RegistrationStore): void {
    this.setRegistrationCodeValid(store.registrationCodeValid);
    this.registrationCode = store.registrationCode;
    this.firstName = store.firstName;
    this.lastName = store.lastName;
  }
}

export default new RegistrationStore();

export { RegistrationStore };
