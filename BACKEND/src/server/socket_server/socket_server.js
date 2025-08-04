import { Server } from "socket.io";
import { connectBase } from "../../database/get_database.js";
export default function socketServer(server) {
  const io_server = new Server(server, {
    cors: {
      origin: process.env.CLIENT,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      credentials: true,
    },
  });

  const online_users = new Map();
  const online_call_users = new Map();
  io_server.on("connection", async (user_socket) => {
    const data_base = (connectBase()).db("CHAT-BASE");
    const users = data_base.collection("users");
    const user_id = user_socket.handshake.headers.user_id;
    online_users.set(user_id, user_socket);
    let freinds;
    try {
      freinds = (await users.findOne({ user_id: user_id }))?.freinds;
    }
    catch (error) {
      console.log("unable to connect to database", error);
    }
    const fdata = [];
    console.log("freinds: " + freinds);

    for (let i = 0; i < freinds?.length; i++) {
      const d = freinds[i];
      if (Array.from(online_users.keys()).includes(d)) {
        fdata.push(d);
      }
    }
    console.log("fdata" + fdata);
    fdata.forEach((auser_id) => {
      if (auser_id != null && user_id != null) {
        online_users.get(user_id)?.emit("online_update", "add", auser_id);
        online_users.get(auser_id)?.emit("online_update", "add", user_id);
      }
    });

    Array.from(online_users.keys()).forEach((auser_id) => {
      if (auser_id != null && user_id != null) {
        online_users
          .get(auser_id)
          .emit("current_online_users", Array.from(online_users.keys()));
      }
    });
    console.log(`${user_id} is connected to server`);
    console.log("online users: " + Array.from(online_users.keys()));
    user_socket.on("disconnect", () => {
      online_users.delete(user_id);
      Array.from(online_users.keys()).forEach((auser_id) => {
        if (auser_id != null && user_id !== null) {
          online_users
            .get(auser_id)
            .emit("current_online_users", Array.from(online_users.keys()));
        }
      });

      fdata.forEach((auser_id) => {
        if (auser_id != null && user_id != null) {
          online_users.get(auser_id)?.emit("online_update", "remove", user_id);
        }
      });
      console.log(user_id + " is disconnected");
      console.log("online users: " + Array.from(online_users.keys()));
    });
    user_socket.on("send_message", async (message, reciever_id) => {
      console.log(message + " to " + reciever_id);
      const data = { message: message, sender: user_id, receiver: reciever_id };
      if (online_users.has(reciever_id)) {
        online_users.get(reciever_id).emit("recieve_message", message, user_id);
      }
    });
    user_socket.on("send_is_typing", (reciever_id) => {
      console.log(user_id + " is typing to " + reciever_id)
      if (online_users.has(reciever_id)) {
        online_users.get(reciever_id).emit("receive_is_typing", user_id);
      }
    })

    user_socket.on("send_message_rtc", (message, receiver) => {
      console.log(online_users.keys())
      console.log(user_id + " wants to video call " + receiver)
      if (online_users.has(receiver)) {
        online_users.get(receiver).emit("receive_message_rtc", message, user_id)
        if (message.offer) {
          console.log(message.offer)
        }
      }
    })


  });
}
