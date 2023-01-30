import { useMemo, useState } from 'react';
import { sendHello, sendMessage, sendSum } from './utils/payload';

export const App = () => {
   const [name, setName] = useState('John');
   const [content, setContent] = useState('Lorem ipsum dolor sit amet...');
   const [operand1, setOperand1] = useState('1');
   const [operand2, setOperand2] = useState('2');

   const socket = useMemo(() => new WebSocket('ws://localhost:3000'), []);

   socket.onopen = () => console.log('Connected to the server!');
   socket.onmessage = (event) => console.log(event.data);
   socket.onerror = (error) => console.error(error);

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
