import assert from 'assert';

export type AssertMessage = string | Error | Function | undefined | Object;

const throwError = (message: AssertMessage): never => {
   let error: Error | Object;
   const messageProcessed = typeof message === 'function' ? message() : message;

   switch (typeof messageProcessed) {
      case 'object':
         error = messageProcessed;
         break;
      default:
         error = new Error(messageProcessed);
         break;
   }

   throw error;
};

/**
 * check that value is not null nor undefined
 * @param value
 * @param message
 */
export const _assert: <T>(value: T, message?: AssertMessage) => asserts value is NonNullable<T> = (
   value,
   message,
) => {
   if (value !== undefined && value !== null && typeof value !== 'boolean') {
      return;
   }

   // do not use _assert for boolean
   if (typeof value === 'boolean') {
      console.error('do not use _assert for boolean value, use _assertTrue instead');
   }

   throwError(message);
};

/**
 * check that value is stricly true
 * @param value
 * @param message
 */
export const _assertTrue: (value: boolean, message?: AssertMessage) => asserts value = (
   value,
   message,
) => {
   if (value === true) {
      return;
   }

   throwError(message);
};

/**
 * check that value1 is strictly equal to value2
 * @param value1
 * @param value2
 * @param message
 */
export const _assertEq: <T, U extends T>(
   value1: T,
   value2: U,
   message?: AssertMessage,
) => asserts value1 is U = (value1, value2, message) => {
   if (value1 === value2) {
      return;
   }

   throwError(message);
};

export const _assertDeepStrictEqual: <T>(
   actual: unknown,
   expected: T,
   message?: string | Error | undefined,
) => asserts actual is T = (actual, expected, message) =>
   assert.deepStrictEqual(actual, expected, message);

export const _assertStrictEqual: <T>(
   actual: unknown,
   expected: T,
   message?: string | Error | undefined,
) => asserts actual is T = (actual, expected, message) =>
   assert.strictEqual(actual, expected, message);

export const _throw = (message: AssertMessage): never => throwError(message);
