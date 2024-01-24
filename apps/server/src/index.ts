import { Server } from '@colyseus/core';
import { monitor } from '@colyseus/monitor';
import { playground } from '@colyseus/playground';
import { WebSocketTransport } from '@colyseus/ws-transport';
import cors from 'cors';
import express, { json } from 'express';
import basicAuth from 'express-basic-auth';
import { createServer } from 'http';
import { AuthRoom } from './rooms/AuthRoom';
import { ChatRoom } from './rooms/ChatRoom';
import { CloudsRoom } from './rooms/maps/CloudsRoom';
import { DungeonRoom } from './rooms/maps/DungeonRoom';
import { HouseRoom } from './rooms/maps/HouseRoom';
import { registerRouter } from './routers/registerRouter';
import { statusRouter } from './routers/statusRouter';

const app = express();
const auth = basicAuth({
   challenge: true,
   users: { [process.env.MONITORING_USERNAME]: process.env.MONITORING_PASSWORD },
});

app.use(cors());
app.use(json());
app.use('/monitor', auth, monitor());
app.use('/playground', auth, playground);

app.get('/status', statusRouter);
app.post('/register', registerRouter);

const gameServer = new Server({
   transport: new WebSocketTransport({
      pingInterval: 6000,
      pingMaxRetries: 4,
      server: createServer(app),
   }),
   greet: false,
});

gameServer.listen(4000, undefined, undefined, () => {
   console.log(`Listening on ws://localhost:4000...`);
});

if (process.env.NODE_ENV !== 'production') {
   gameServer.simulateLatency(300);
}

gameServer.define('AuthRoom', AuthRoom);
gameServer.define('ChatRoom', ChatRoom);

gameServer.define('CloudsRoom', CloudsRoom);
gameServer.define('HouseRoom', HouseRoom);
gameServer.define('DungeonRoom', DungeonRoom);
