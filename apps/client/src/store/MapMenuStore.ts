import { makeAutoObservable } from 'mobx';
import { TELEPORTATION_PLACES } from 'shared/src/data/teleportationPlaces';
import { Room, zRoom } from 'shared/src/types/Room';
import { ArrayMgt } from 'shared/src/utils/arrayMgt';
import { Store } from './Store';

export class MapMenuStore {
   private _store: Store;

   public isOpened: boolean = false;

   public selectedRoom: Room | null = null;

   constructor(store: Store) {
      makeAutoObservable(this);

      this._store = store;
   }

   public open(): void {
      this.isOpened = true;
   }

   public close(): void {
      this.isOpened = false;
      this.selectedRoom = null;
   }

   public toggle(): void {
      if (this.isOpened) {
         this.close();
      } else {
         this.open();
      }
   }

   public setSelectedRoom(room: Room): void {
      if (this.isTeleportationPlaceDisabled(room)) {
         return;
      }

      if (room === this.selectedRoom) {
         this.selectedRoom = null;
      } else {
         this.selectedRoom = room;
      }
   }

   public teleport(): void {
      if (this.selectedRoom === null) {
         return;
      }

      this.isOpened = false;
      this._store.colyseusStore.teleport(this.selectedRoom);
      this.selectedRoom = null;
   }

   public isTeleportationPlaceDisabled(room: Room): boolean {
      return (
         this._store.characterStore.map === room ||
         !this._store.characterStore.teleporters.includes(room)
      );
   }

   public get teleportationPlaces(): Room[] {
      return ArrayMgt.filterNullish(
         Object.entries(TELEPORTATION_PLACES)
            .filter(([roomString]) => {
               const room = zRoom.parse(roomString);
               return this._store.characterStore.teleporters.includes(room);
            })
            .map(([roomString, place]) => {
               const room = zRoom.parse(roomString);

               if (place === null) {
                  return null;
               }

               return room;
            }),
      ).sort((a, b) =>
         a === this._store.characterStore.map ? -1 : b === this._store.characterStore.map ? 1 : 0,
      );
   }
}
