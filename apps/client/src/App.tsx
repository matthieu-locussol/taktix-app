import { useMemo, useState } from 'react';
import { ClientPacket } from 'shared';
import { zServerPacket } from 'shared/src/client/ServerPacket';
import { handleServerMessage } from './sockets/handleServerMessage';
import { handleServerResponse } from './sockets/handleServerResponse';
import { sendHello, sendMessage, sendSum } from './utils/payload';

export const App = () => {
   const [name, setName] = useState('John');
   const [content, setContent] = useState('Lorem ipsum dolor sit amet...');
   const [operand1, setOperand1] = useState('1');
   const [operand2, setOperand2] = useState('2');

   const socket = useMemo(() => new WebSocket('ws://localhost:3000'), []);

   socket.onopen = () => {
      console.log('Connected to the server!');
   };

   socket.onmessage = (event) => {
      try {
         const { type, packet } = zServerPacket.parse(JSON.parse(event.data.toString()));

         switch (type) {
            case 'message': {
               const response = handleServerMessage(packet);
               const payload: ClientPacket = {
                  type: 'response',
                  packet: response,
               };
               socket.send(JSON.stringify(payload));
               break;
            }
            case 'response': {
               handleServerResponse(packet);
               break;
            }
            default:
               throw new Error(`Unknown ServerPacket type: "${type}"`);
         }
      } catch (e) {
         console.error(e);
      }
   };

   socket.onerror = (error) => {
      console.error(error);
   };

   return (
      <div>
         <h1>Client</h1>
         <div>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <button onClick={() => sendHello(socket, name)}>Send "Hello" payload</button>
         </div>
         <div>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} />
            <button onClick={() => sendMessage(socket, content)}>Send "Message" payload</button>
         </div>
         <div>
            <input type="number" value={operand1} onChange={(e) => setOperand1(e.target.value)} />
            <input type="number" value={operand2} onChange={(e) => setOperand2(e.target.value)} />
            <button onClick={() => sendSum(socket, operand1, operand2)}>Send "Sum" payload</button>
         </div>
         <div>
            <button onClick={() => socket.close()}>Disconnect</button>
         </div>
      </div>
   );
};
