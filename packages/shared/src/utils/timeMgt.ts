export namespace TimeMgt {
   export const wait = (ms: number) =>
      new Promise((resolve) => {
         setTimeout(resolve, ms);
      });

   export const formatDatetime = (date: Date) => {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();

      return `${year}-${month}-${day} @ ${hours}:${minutes}`;
   };
}
