import Server from './server';

const server = new Server();
const { socket } = server;

server.start();

socket.on('listening', () => {
  console.log('started');
});

socket.on('connect', () => {
  console.log('started');
});

socket.on('message', (msg, remote) => {
  console.log(msg.toString(), remote);
});

socket.on('error', (err) => {
  console.error(err);
});

socket.on('close', () => {
  console.log('closed');
});
