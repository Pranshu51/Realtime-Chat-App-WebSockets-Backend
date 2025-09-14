
import  WebSocket, {WebSocketServer} from "ws";

const wss = new WebSocketServer({ port: 8080});

interface User {
  socket: WebSocket;
  room: string;
}

let allSocket: User[] = [];

wss.on("connection" , (socket) => {

  socket.on("message", (message) => {
   const parsedMessage = JSON.parse(message as unknown as  string);//convert kiya object message
   if(parsedMessage.type == "join"){
    allSocket.push({
      socket,
      room: parsedMessage.payload.roomId
    })
   }
   if(parsedMessage.type == "chat"){
    //const currentUserRoom = allSocket.find((x) => x.socket == socket).room
    let currentUserRoom = null;
    for (let i = 0 ; i< allSocket.length; i++){
      if(allSocket[i]?.socket == socket){
        currentUserRoom = allSocket[i]?.room
      }
    }

    for( let i =0; i<allSocket.length; i++){
      allSocket[i]?.socket.send(parsedMessage.payload.message)
    }
   }
    })
  })
  

































































// // import {WebSocketServer,WebSocket} from "ws";

// // const wss = new WebSocketServer({ port: 8080});

// // let userCount = 0;
// // let allSocket: WebSocket[] = [];

// // wss.on("connection" , (socket) => {
// //   allSocket.push(socket);
// //   console.log("user Connected #" + userCount)
// //   userCount = userCount + 1;

// //   socket.on("message", (message) => {
// //     console.log("message received :" + message.toString())
// //     for (let i = 0 ; i < allSocket.length ; i++){
// //       const s = allSocket[i];
// //       s.send(message.toString() +" : sent from the server");
// //     }
// //   })
// // })