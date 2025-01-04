import type { Room } from 'shared/src/types/Room.ts';
import type { Store } from './Store.ts';

import { makeAutoObservable } from 'mobx';
import { TELEPORTATION_PLACES } from 'shared/src/data/teleportationPlaces.ts';
import { zRoom } from 'shared/src/types/Room.ts';
import { ArrayMgt } from 'shared/src/utils/arrayMgt.ts';

export class MapMenuStore {
   private _store: Store;

   public isOpened: boolean = false;

   public selectedRoom: Room | null = null;

   constructor(store: Store) {
      makeAutoObservable(this);

      this._store = store;
   }

   public setIsOpened(isOpened: boolean): void {
      this.isOpened = isOpened;
      this._store.soundsStore.play('check');
   }

   public open(): void {
      this.setIsOpened(true);
   }

   public close(): void {
      this.setIsOpened(false);
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

      this.setIsOpened(false);
      this._store.colyseusStore.teleport(this.selectedRoom);
      this.selectedRoom = null;
      this._store.soundsStore.play('teleport');
   }

   public isTeleportationPlaceDisabled(room: Room): boolean {
      return (
         this._store.characterStore.map === room ||
         !this._store.characterStore.teleporters.includes(room) ||
         !this.hasEnoughMoneyForRoom(room)
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

   public get hasEnoughMoney(): boolean {
      if (this.selectedRoom === null) {
         return false;
      }

      return this.hasEnoughMoneyForRoom(this.selectedRoom);
   }

   public hasEnoughMoneyForRoom(room: Room): boolean {
      const place = TELEPORTATION_PLACES[room];

      if (place === null) {
         return false;
      }

      return this._store.characterStore.money >= place.price;
   }
}
