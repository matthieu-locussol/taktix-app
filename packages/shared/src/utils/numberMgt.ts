import { _assertTrue } from './_assert';

export namespace NumberMgt {
   export const clamp = (value: number, min: number, max: number) =>
      Math.min(Math.max(value, min), max);

   export const random = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1) + min);

   export const hexStringToNumber = (hexString: string): number => {
      _assertTrue(/^#[0-9A-Fa-f]{6}$/.test(hexString), `Invalid hex string: '${hexString}'`);
      return Number.parseInt(hexString.slice(1), 16);
   };
}
