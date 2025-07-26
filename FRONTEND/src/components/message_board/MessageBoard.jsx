import "./MessageBoard.css";
import { useState, useContext, useEffect } from "react";
import { makeCall } from "../../utils/web_rtc/web_rtc_server.js";
import VideoCall from "../video_call/VideoCall.jsx";
import { isVideo } from "../../contexts/VideoPlayer.jsx";

function MessageBoard({
  open_call_window,
  setOpen_call_window,
  open_receive_window,
  socket,
  send_message,
  setRefresh,
  history,
  receiver_id,
}) {
  const [current_message, setCurrent_message] = useState("");
  const [pic, setPic] = useState(null);
  const VideoStream = useContext(isVideo);
  let user = sessionStorage.getItem("current_user");
  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/get_profile_pic`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: user, pic_id: receiver_id }),
    })
      .then((response) => response.text())
      .then((data) => {
        setPic(data);
      });
  }, [user, receiver_id]);

  if (open_receive_window) {
    return <VideoCall />;
  }

  if (open_call_window) {
    return <VideoCall />;
  }

  if (!receiver_id) {
    return (
      <div className="message_board_none">
        {" "}
      <svg
            width="128"
            height="128"
            viewBox="0 0 128 128"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="64" cy="64" r="64" fill=" #25D366" />
            <g stroke="#000" strokeWidth="4" fill="none">
              <path
                d="M20 40 h40 a10 10 0 0 1 10 10 v20 a10 10 0 0 1 -10 10 h-8 l-12 10 v-10 h-20 a10 10 0 0 1 -10 -10 v-20 a10 10 0 0 1 10 -10 z"
                fill="#ffffff"
              />
              <circle cx="35" cy="60" r="3" fill="#000" />
              <circle cx="45" cy="60" r="3" fill="#000" />
              <circle cx="55" cy="60" r="3" fill="#000" />
            </g>
            <g stroke="#000" strokeWidth="4" fill="#a0a0a0">
              <rect x="70" y="40" width="40" height="30" rx="4" ry="4" />
              <polygon
                points="110,45 125,55 110,65"
                fill="#e3e3e3"
                stroke="#000"
              />
            </g>
          </svg>
      </div>
    );
  }
  return (
    <div className="message_board">
      <ChatNOTBAR
        key={receiver_id}
        pic={pic}
        receiver_id={receiver_id}
        setOpen_call_window={setOpen_call_window}
        VideoStream={VideoStream}
        socket={socket}
      />
      <div className="chat_messages">
        {history.current.map((msg, index) => {
          if (msg[2] == receiver_id) {
            return (
              <div key={index} className={"send_message_" + msg[1]}>
                <div>{msg[0]}</div>
              </div>
            );
          }
        })}
      </div>
      <div className="Write_message">
        <input
          key={receiver_id}
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

function ChatNOTBAR({
  pic,
  receiver_id,
  setOpen_call_window,
  VideoStream,
  socket,
}) {
  return (
    <div className="chat_not_bar">
      <div className="tpro">
        <img src={pic} />
        <span>{receiver_id}</span>
      </div>
      <div className="call">
        <div
          className="videocall"
          onClick={() => {
            setOpen_call_window(true);

            makeCall(VideoStream, socket, receiver_id);
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
        <div className="audiocall">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default MessageBoard;
