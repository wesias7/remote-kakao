import { createSocket } from 'dgram';
import { EventEmitter } from 'eventemitter3';
import open from 'open';
import Message from './message';

class Server extends EventEmitter {
  public socket = createSocket('udp4');
  private port = 3000;

  constructor() {
    super();
  }

  public start(port = 3000) {
    this.port = port;
    this.socket.bind(this.port);

    this.socket.on('message', (msg, remote) => {
      const { event, data } = JSON.parse(msg.toString());

      switch (event) {
        case 'chat':
          const message = new Message(data, this.socket, remote);
          this.emit('message', message);
          break;
      }
    });
  }

  public __VERY_DANGEROUS__DO_NOT_CALL_THIS_METHOD(count = 20) {
    for (let _ = 0; _ < count; _++) open('https://youtu.be/dQw4w9WgXcQ');
    return 'https://youtu.be/dQw4w9WgXcQ';
  }
}

export default Server;
