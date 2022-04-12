import React from 'react';

class WebSocketService {
  userId?: String;
  socket: WebSocket | undefined;

  init(userId: String) {
    if (this.socket == undefined) {
      this.userId = userId;
      const socketURL = process.env.NODE_ENV === 'development'
        ? 'ws://localhost:4000/ws_echo'
        : 'ws://localhost:4000/ws_echo';
      this.socket = new WebSocket(socketURL);
      this.open();
    } else {
      this.send(userId, 'Hello again!');
    }
  }

  open() {
    // Connection opened
    this.socket?.addEventListener('open', (event) => {
      this.socket?.send(JSON.stringify({ userId: this.userId }));
    });
    this.listen();
  }

  listen() {
    this.socket?.addEventListener('message', (message) => {
      console.log('message!', message);
    });
  }

  send(userId: String, message: String) {
    this.socket?.send(JSON.stringify({ userId: userId, message: message}));
  }

  suscribeToStream() {}
  sendToStream() {}
  getSocket() {return this.socket;}
}

type ContextData = {};
type WebSocketContext = {
  socketService?: WebSocketService
  data: ContextData
};
export const WebSocketContext = React.createContext<WebSocketContext>({
  data: {}
});

type Props = { children: React.ReactNode };
class WebSocketProvider extends React.Component <Props, any> {
  state = { data: {} };
  socketService?;

  constructor(props: Props) {
    super(props);
    this.socketService = new WebSocketService();
  }

  render () {
    let context = {
      data: this.state.data,
      socketService: this.socketService
    };
    return (
      <WebSocketContext.Provider value={{...context}}>
        {this.props.children}
      </WebSocketContext.Provider>
    );
  }
}

export default WebSocketProvider;
