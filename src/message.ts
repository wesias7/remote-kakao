import { RemoteInfo, Socket } from 'dgram';

class Message {
  public room;
  public text;
  public sender;
  public isGroupChat;
  public getProfileImage;
  private getSocket;
  public remote;

  constructor(data: { room: string; text: string; sender: string; isGroupChat: boolean; profileImage: string }, socket: Socket, remote: RemoteInfo) {
    this.room = data.room;
    this.text = data.text;
    this.sender = data.sender;
    this.isGroupChat = data.isGroupChat;
    this.getProfileImage = () => data.profileImage;
    this.getSocket = () => socket;
    this.remote = remote;
  }

  public async replyRoom(room: string, text: string, timeout = 10000) {
    return await new Promise<boolean>((res, rej) => {
      const data = JSON.stringify({ event: 'sendText', data: { room, text } });

      setTimeout(() => rej('timeout'), timeout);

      const handler = (msg: any) => {
        const { event, data } = JSON.parse(msg.toString());

        switch (event) {
          case 'sent':
            res(data.success);
            break;
        }

        this.getSocket().off('message', handler);
      };
      this.getSocket().on('message', handler);

      this.getSocket().send(data, 0, data.length, this.remote.port, this.remote.address);
    });
  }
  public reply(text: string) {
    return this.replyRoom(this.room, text);
  }
}

export default Message;
