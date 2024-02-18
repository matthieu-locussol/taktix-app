export namespace TimeMgt {
   export const wait = (ms: number) =>
      new Promise((resolve) => {
         setTimeout(resolve, ms);
      });

   export const formatDatetime = (date: Date) => {
      const year = date.getFullYear();
      const month = Number(date.getMonth() + 1)
         .toString()
         .padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');

      return `${year}-${month}-${day} @ ${hours}:${minutes}`;
   };
}
