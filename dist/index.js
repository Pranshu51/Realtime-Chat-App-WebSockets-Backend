// import  WebSocket, { WebSocketServer } from "ws";
// interface SocketWithRoom {
//   socket: WebSocket;
//   room: string | null;
// }
// const wss = new WebSocketServer({ port: 8080 });
// const allSocket: SocketWithRoom[] = [];
// wss.on("connection", (socket: WebSocket) => {
//   console.log("✅ New client connected");
//   allSocket.push({ socket, room: null });
//   socket.on("message", (message: string) => {
//     try {
//       const parsedMessage = JSON.parse(message);
//       if (parsedMessage.type === "join") {
//         // Assign room to the current user
//         for (let i = 0; i < allSocket.length; i++) {
//           if (allSocket[i].socket === socket) {
//             allSocket[i].room = parsedMessage.payload.roomId;
//             console.log(`📌 User joined room: ${parsedMessage.payload.roomId}`);
//           }
//         }
//       }
//       if (parsedMessage.type === "chat") {
//         let currentUserRoom: string | null = null;
//         // Find the room of the sender
//         for (let i = 0; i < allSocket.length; i++) {
//           if (allSocket[i].socket === socket) {
//             currentUserRoom = allSocket[i]?.room ?? null;
//           }
//         }
//         if (!currentUserRoom) {
//           console.log("⚠️ User not in a room, ignoring message");
//           return;
//         }
//         console.log(`💬 Message from room ${currentUserRoom}: ${parsedMessage.payload.message}`);
//         // Broadcast only to users in the same room
//         for (let i = 0; i < allSocket.length; i++) {
//           if (allSocket[i].room === currentUserRoom) {
//             allSocket[i].socket.send(parsedMessage.payload.message);
//           }
//         }
//       }
//     } catch (error) {
//       console.error("❌ Error parsing message", error);
//     }
//   });
//   socket.on("close", () => {
//     console.log("❌ Client disconnected");
//     // Remove socket from list
//     for (let i = 0; i < allSocket.length; i++) {
//       if (allSocket[i].socket === socket) {
//         allSocket.splice(i, 1);
//         break;
//       }
//     }
//   });
// });
// import { WebSocketServer, WebSocket } from "ws";
// const wss = new WebSocketServer({ port:8080 });
// interface User {
//     socket: WebSocket;
//     room: string;
// }
// let allSockets: User[] = [];
// wss.on("connection", (socket) => {
//     socket.on("message", (message) => {
//         // @ts-ignore
//         const parsedMessage = JSON.parse(message);
//         if (parsedMessage.type == "join") {
//             console.log("user joined room " + parsedMessage.payload.roomId);
//             allSockets.push({
//                 socket,
//                 room: parsedMessage.payload.roomId
//             })
//         }
//         if (parsedMessage.type == "chat") {
//             console.log("user wants to chat");
//             // const currentUserRoom = allSockets.find((x) => x.socket == socket).room
//             let currentUserRoom = null;
//             for (let i = 0; i < allSockets.length; i++) {
//                 if (allSockets[i]?.socket == socket) {
//                     currentUserRoom = allSockets[i]?.room
//                 }
//             }
//             for (let i = 0; i < allSockets.length; i++) {
//                 if (allSockets[i]?.room == currentUserRoom) {
//                     allSockets[i]?.socket.send(JSON.stringify({
//                       type: "chat",
//                       payload: {message: parsedMessage.payload.message}
//                     }))
//                 }
//             }
//         }
//     })
// })
import WebSocket, { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 8080 });
let allSocket = [];
wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        const parsedMessage = JSON.parse(message); //convert kiya object message
        if (parsedMessage.type == "join") {
            allSocket.push({
                socket,
                room: parsedMessage.payload.roomId
            });
        }
        if (parsedMessage.type == "chat") {
            //const currentUserRoom = allSocket.find((x) => x.socket == socket).room
            let currentUserRoom = null;
            for (let i = 0; i < allSocket.length; i++) {
                if (allSocket[i]?.socket == socket) {
                    currentUserRoom = allSocket[i]?.room;
                }
            }
            for (let i = 0; i < allSocket.length; i++) {
                allSocket[i]?.socket.send(parsedMessage.payload.message);
            }
        }
    });
});
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
//# sourceMappingURL=index.js.map