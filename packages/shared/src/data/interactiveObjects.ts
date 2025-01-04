// This file has been automatically generated. DO NOT edit it manually.

import type { InteractiveObject, InteractiveObjectData } from '../types/InteractiveObject.ts';
import type { Room } from '../types/Room.ts';

export const INTERACTIVE_OBJECTS: Record<Room, InteractiveObjectData[]> = {
   AAA_InitialRoom: [],
   GraveyardRoom: [
      {
         id: 'GraveyardLadder',
         x: null,
         y: null,
      },
      {
         id: 'Teleporter',
         x: null,
         y: null,
      },
      {
         id: 'TeleporterCell',
         x: 15,
         y: 21,
      },
   ],
   MoonshadowBarRoom: [
      {
         id: 'WineBottle',
         x: null,
         y: null,
      },
      {
         id: 'WineBottle',
         x: null,
         y: null,
      },
   ],
   MoonshadowHamletRoom: [
      {
         id: 'TeleporterCell',
         x: 35,
         y: 33,
      },
      {
         id: 'Teleporter',
         x: null,
         y: null,
      },
      {
         id: 'Well',
         x: null,
         y: null,
      },
   ],
   MoonshadowHotelRoom: [
      {
         id: 'Bed',
         x: null,
         y: null,
      },
      {
         id: 'Bed',
         x: null,
         y: null,
      },
      {
         id: 'Bed',
         x: null,
         y: null,
      },
      {
         id: 'Bed',
         x: null,
         y: null,
      },
   ],
   MoonshadowInnRoom: [],
   MoonshadowShopRoom: [],
};

export const INTERACTIVE_OBJECTS_MAP: Record<Room, Record<InteractiveObject, boolean>> = {
   AAA_InitialRoom: {
      Teleporter: false,
      TeleporterCell: false,
      Bed: false,
      Well: false,
      WineBottle: false,
      GraveyardLadder: false,
   },
   GraveyardRoom: {
      Teleporter: true,
      TeleporterCell: true,
      Bed: false,
      Well: false,
      WineBottle: false,
      GraveyardLadder: true,
   },
   MoonshadowBarRoom: {
      Teleporter: false,
      TeleporterCell: false,
      Bed: false,
      Well: false,
      WineBottle: true,
      GraveyardLadder: false,
   },
   MoonshadowHamletRoom: {
      Teleporter: true,
      TeleporterCell: true,
      Bed: false,
      Well: true,
      WineBottle: false,
      GraveyardLadder: false,
   },
   MoonshadowHotelRoom: {
      Teleporter: false,
      TeleporterCell: false,
      Bed: true,
      Well: false,
      WineBottle: false,
      GraveyardLadder: false,
   },
   MoonshadowInnRoom: {
      Teleporter: false,
      TeleporterCell: false,
      Bed: false,
      Well: false,
      WineBottle: false,
      GraveyardLadder: false,
   },
   MoonshadowShopRoom: {
      Teleporter: false,
      TeleporterCell: false,
      Bed: false,
      Well: false,
      WineBottle: false,
      GraveyardLadder: false,
   },
};
