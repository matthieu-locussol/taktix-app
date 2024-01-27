export namespace TimeMgt {
   export const wait = (ms: number) =>
      new Promise((resolve) => {
         setTimeout(resolve, ms);
      });
}
