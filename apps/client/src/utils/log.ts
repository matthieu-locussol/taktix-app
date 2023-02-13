export const log = (message: string) => {
   if (import.meta.env.DEV) {
      console.log(message);
   }
};
