export namespace NumberMgt {
   export const clamp = (value: number, min: number, max: number) =>
      Math.min(Math.max(value, min), max);

   export const random = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1) + min);
}
