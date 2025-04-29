import { Client } from '@stomp/stompjs';

let client: Client;

export const connectStomp = (onData: (data: any) => void) => {
  client = new Client({
    brokerURL: 'ws://localhost:8080/ws',  // Native WebSocket, no SockJS
    reconnectDelay: 5000,
    onConnect: () => {
      client.subscribe('/topic/data', (message) => {
        const body = JSON.parse(message.body);
        onData(body);
      });
    },
    onStompError: (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    }
  });

  client.activate();
};

export const disconnectStomp = () => {
  if (client) {
    client.deactivate();
  }
};