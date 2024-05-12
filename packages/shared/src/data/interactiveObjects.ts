// This file has been automatically generated. DO NOT edit it manually.

import type { InteractiveObject, InteractiveObjectData } from '../types/InteractiveObject';
import type { Room } from '../types/Room';

export const INTERACTIVE_OBJECTS: Record<Room, InteractiveObjectData[]> = {
   AAA_InitialRoom: [],
   CloudsRoom: [
      {
         id: 'Teleporter',
         x: null,
         y: null,
      },
      {
         id: 'TeleporterCell',
         x: 10,
         y: 11,
      },
   ],
   DungeonRoom: [],
   ForestRoom: [
      {
         id: 'Teleporter',
         x: null,
         y: null,
      },
      {
         id: 'TeleporterCell',
         x: 13,
         y: 39,
      },
   ],
   HouseRoom: [],
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
};

export const INTERACTIVE_OBJECTS_MAP: Record<Room, Record<InteractiveObject, boolean>> = {
   AAA_InitialRoom: {
      Teleporter: false,
      TeleporterCell: false,
      Bed: false,
      Well: false,
   },
   CloudsRoom: {
      Teleporter: true,
      TeleporterCell: true,
      Bed: false,
      Well: false,
   },
   DungeonRoom: {
      Teleporter: false,
      TeleporterCell: false,
      Bed: false,
      Well: false,
   },
   ForestRoom: {
      Teleporter: true,
      TeleporterCell: true,
      Bed: false,
      Well: false,
   },
   HouseRoom: {
      Teleporter: false,
      TeleporterCell: false,
      Bed: false,
      Well: false,
   },
   MoonshadowHamletRoom: {
      Teleporter: true,
      TeleporterCell: true,
      Bed: false,
      Well: true,
   },
   MoonshadowHotelRoom: {
      Teleporter: false,
      TeleporterCell: false,
      Bed: true,
      Well: false,
   },
   MoonshadowInnRoom: {
      Teleporter: false,
      TeleporterCell: false,
      Bed: false,
      Well: false,
   },
};
