// Source: https://github.com/colyseus/colyseus/blob/master/packages/core/src/Protocol.ts#L6
export enum Protocol {
   // Room-related (10~19)
   JOIN_ROOM = 10,
   ERROR = 11,
   LEAVE_ROOM = 12,
   ROOM_DATA = 13,
   ROOM_STATE = 14,
   ROOM_STATE_PATCH = 15,
   ROOM_DATA_SCHEMA = 16, // used to send schema instances via room.send()
   ROOM_DATA_BYTES = 17,

   // WebSocket close codes (https://github.com/Luka967/websocket-close-codes)
   WS_CLOSE_NORMAL = 1000,
   WS_CLOSE_GOING_AWAY = 1001,

   // WebSocket error codes
   WS_CLOSE_CONSENTED = 4000,
   WS_CLOSE_WITH_ERROR = 4002,
   WS_CLOSE_DEVMODE_RESTART = 4010,

   WS_SERVER_DISCONNECT = 4201,
   WS_TOO_MANY_CLIENTS = 4202,
}

export enum CustomProtocol {
   DISCONNECT_FROM_OTHER_SESSION = 4400,
}

// Source: https://github.com/colyseus/colyseus/blob/master/packages/transport/uwebsockets-transport/src/uWebSocketClient.ts#L13
export enum ReadyState {
   CONNECTING = 0,
   OPEN = 1,
   CLOSING = 2,
   CLOSED = 3,
}
