import { pipe } from 'fp-ts/lib/pipeable';
import { map } from 'fp-ts/lib/Array';
import { Task } from 'fp-ts/lib/Task';

function parallel<A>(tasks: [Task<A>]): Task<[A]>;
function parallel<A, B>(tasks: [Task<A>, Task<B>]): Task<[A, B]>;
function parallel<A, B, C>(tasks: [Task<A>, Task<B>, Task<C>]): Task<[A, B, C]>;
function parallel<A, B, C, D>(
  tasks: [Task<A>, Task<B>, Task<C>],
): Task<[A, B, C, D]>;
function parallel<A, B, C, D, E>(
  tasks: [Task<A>, Task<B>, Task<C>, Task<D>, Task<E>],
): Task<[A, B, C, D, E]>;
function parallel<A, B, C, D, E, F>(
  tasks: [Task<A>, Task<B>, Task<C>, Task<D>, Task<E>, Task<F>],
): Task<[A, B, C, D, E, F]>;
function parallel<A, B, C, D, E, F, G>(
  tasks: [Task<A>, Task<B>, Task<C>, Task<D>, Task<E>, Task<F>, Task<G>],
): Task<[A, B, C, D, E, F, G]>;
function parallel<A, B, C, D, E, F, G, H>(
  tasks: [
    Task<A>,
    Task<B>,
    Task<C>,
    Task<D>,
    Task<E>,
    Task<F>,
    Task<G>,
    Task<H>,
  ],
): Task<[A, B, C, D, E, F, G, H]>;
function parallel<A, B, C, D, E, F, G, H, I>(
  tasks: [
    Task<A>,
    Task<B>,
    Task<C>,
    Task<D>,
    Task<E>,
    Task<F>,
    Task<G>,
    Task<H>,
    Task<I>,
  ],
): Task<[A, B, C, D, E, F, G, H, I]>;
function parallel<A, B, C, D, E, F, G, H, I, J>(
  tasks: [
    Task<A>,
    Task<B>,
    Task<C>,
    Task<D>,
    Task<E>,
    Task<F>,
    Task<G>,
    Task<H>,
    Task<I>,
    Task<J>,
  ],
): Task<[A, B, C, D, E, F, G, H, I, J]>;
function parallel<T>(tasks: Task<T>[]): Task<T[]>;

function parallel<T>(tasks: Task<T>[]): Task<T[]> {
  return (): Promise<T[]> =>
    Promise.all(
      pipe(
        tasks,
        map(task => task()),
      ),
    );
}

export { parallel };
