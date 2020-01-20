function setTimeoutPromisified(callback: Function, time: number): number;
async function setTimeoutPromisified(time?: number): Promise<void>;

function setTimeoutPromisified(
  param1?: Function | number,
  param2?: number,
): number | Promise<void> {
  if (
    typeof param1 !== 'undefined' &&
    typeof param2 !== 'undefined' &&
    typeof param1 !== 'number'
  ) {
    const handler = param1;
    const timeout = param2 as number;
    return setTimeout(handler, timeout);
  }

  const timeout = param1 as number | undefined;
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default setTimeoutPromisified;
