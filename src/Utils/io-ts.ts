import { array, ArrayC, Mixed } from 'io-ts';

const matrix = <C extends Mixed>(codec: C): ArrayC<ArrayC<C>> =>
  array(array(codec));

export { matrix };
