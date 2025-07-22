import "./MessageBoard.css";
import { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router";
import { makeCall } from "../video_call/rtc_client.js";
import { isUser } from "../../isUser";
import VideoCall from "../video_call/VideoCall.jsx";
import { isVideo } from "../../VideoPlayer.jsx";
function MessageBoard({
  socket,
  send_message,
  setRefresh,
  history,
  receiver_id,
}) {
  const [open_call_window, setOpen_call_window] = useState(false);
  const [current_message, setCurrent_message] = useState("");
  // const [video_lisner, setVideo_lisner] = useState(null)
const video_po = useContext(isVideo)
  let user = sessionStorage.getItem("current_user");
  const cu = useContext(isUser);
  if (user == null) {
    user = cu.user;
  }

  if (open_call_window) {
    return <VideoCall />;
  }

  if (!receiver_id) {
    return (
      <div className="message_board">
        {" "}
        <svg
          className="mbsvg"
          width="128"
          height="128"
          viewBox="0 0 128 128"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="128" height="128" fill="#fff6ec" />
          <g stroke="#000" stroke-width="4" fill="none">
            <path
              d="M20 40 h40 a10 10 0 0 1 10 10 v20 a10 10 0 0 1 -10 10 h-8 l-12 10 v-10 h-20 a10 10 0 0 1 -10 -10 v-20 a10 10 0 0 1 10 -10 z"
              fill="#ffffff"
            />
            <circle cx="35" cy="60" r="3" fill="#000" />
            <circle cx="45" cy="60" r="3" fill="#000" />
            <circle cx="55" cy="60" r="3" fill="#000" />
          </g>
          <g stroke="#000" stroke-width="4" fill="#a0a0a0">
            <rect x="70" y="40" width="40" height="30" rx="4" ry="4" />
            <polygon
              points="110,45 125,55 110,65"
              fill="#e3e3e3"
              stroke="#000"
            />
          </g>
        </svg>
        <span className="msgspan">Select Contact to Chat</span>
      </div>
    );
  }
  return (
    <div className="message_board">
      <div className="chat_not_bar">
        <div className="tpro">
          <img src="https://cdn2.iconfinder.com/data/icons/user-people-4/48/6-512.png" />
          <span>{receiver_id}</span>
        </div>
        <div className="call">
          <div
            className="videocall"
            onClick={() => {
        
              setOpen_call_window(true);
              
              makeCall( video_po, socket, receiver_id);
             ;
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M320-400h240q17 0 28.5-11.5T600-440v-80l80 80v-240l-80 80v-80q0-17-11.5-28.5T560-720H320q-17 0-28.5 11.5T280-680v240q0 17 11.5 28.5T320-400ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="chat_messages">
        {history.current.map((msg) => {
          if (msg[2] == receiver_id) {
            return (
              <div className={"send_message_" + msg[1]}>
                <div>{msg[0]}</div>
              </div>
            );
          }
        })}
      </div>
      <div className="Write_message">
        <input
          className="type_message"
          type="text"
          onChange={(event) => {
            setCurrent_message(event.target.value);
          }}
        />
        <button
          onClick={() => {
            send_message.go(current_message, receiver_id);
            console.log(current_message);
            console.log(history.current);
            setRefresh(Date.now());
          }}
        >
          SEND
        </button>
      </div>
    </div>
  );
}

export default MessageBoard;
