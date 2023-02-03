/**
 * check that value is not null nor undefined
 * @param value
 * @param message
 */
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

   // eslint-disable-next-line @typescript-eslint/no-throw-literal
   throw error;
};

export function _assert<T>(value: T, message?: AssertMessage): asserts value is NonNullable<T> {
   // do not declare as an arrow function else we got a
   // 'Assertions require every name in the call target to be declared with an explicit type annotation.ts(2775)' error
   // when using it
   if (value !== undefined && value !== null && typeof value !== 'boolean') {
      return;
   }
   // do not use _assert for boolean
   if (typeof value === 'boolean') {
      // eslint-disable-next-line no-console
      console.error('do not use _assert for boolean value, use _assertTrue instead');
   }

   throwError(message);
}

/**
 * check that value is stricly true
 * @param value
 * @param message
 */
export function _assertTrue(value: boolean, message?: AssertMessage): asserts value {
   // do not declare as an arrow function else we got a
   // 'Assertions require every name in the call target to be declared with an explicit type annotation.ts(2775)' error
   // when using it
   if (value === true) {
      return;
   }

   throwError(message);
}

/**
 * check that value1 is strictly equal to value2
 * @param value1
 * @param value2
 * @param message
 */
export function _assertEq<T, U extends T>(
   value1: T,
   value2: U,
   message?: AssertMessage,
): asserts value1 is U {
   // do not declare as an arrow function else we got a
   // 'Assertions require every name in the call target to be declared with an explicit type annotation.ts(2775)' error
   // when using it (https://github.com/microsoft/TypeScript/issues/34523)
   if (value1 === value2) {
      return;
   }
   throwError(message);
}

export function _assertDeepStrictEqual<T>(
   actual: unknown,
   expected: T,
   message?: string | Error | undefined,
): asserts actual is T {
   return assert.deepStrictEqual(actual, expected, message);
}

export function _assertStrictEqual<T>(
   actual: unknown,
   expected: T,
   message?: string | Error | undefined,
): asserts actual is T {
   return assert.strictEqual(actual, expected, message);
}

export function _throw(message: AssertMessage): never {
   return throwError(message);
}
