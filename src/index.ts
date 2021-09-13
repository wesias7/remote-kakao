import Message from './message';
import Server from './server';

const server = new Server();

server.on('message', async (msg: Message) => {
  if (msg.room !== 'DEBUG ROOM') return;

  const oldTime = Date.now();
  await msg.reply('Pong!');
  msg.reply(`${Date.now() - oldTime}ms!`);
});

server.start();
