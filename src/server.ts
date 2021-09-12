import { createSocket } from 'dgram';
import { EventEmitter } from 'eventemitter3';

class Server extends EventEmitter {
  public socket = createSocket('udp4');
  private port = 3000;

  constructor() {
    super();
  }

  start(port = 3000) {
    this.port = port;
    this.socket.bind(this.port);
  }
}

export default Server;
