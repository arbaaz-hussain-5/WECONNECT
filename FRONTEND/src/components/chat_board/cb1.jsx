import { useEffect, useState, useRef, useContext } from "react";
import MessageBoard from "../message_board/MessageBoard";
import { io } from "socket.io-client";
import "./ChatBoard.css";
import ContactBar from "../contact_bar/ContactBar";
import SearchContact from "../search_contact/SearchContact";
import { isUser } from "../../isUser";
import CallDisplay from "../video_call/callDisplay";
function ChatBoard({ current_user }) {
  const [send_message, setSendMessage] = useState(null);
  const [receiver_id, set_Receiver_id] = useState(null);
  const [online_users, setOnline_users] = useState([]);
  const [freinds, set_freinds] = useState([]);
  const user_socket = useRef(null);
  const user_history = useRef([]);
  const [refresh, setRefresh] = useState(0);
  const [searCon, setSerCon] = useState(false);
  const [search_data, setSearch_data] = useState("");
  const [conl_user, setConl_user] = useState([]);
  const [is_calling, setIs_calling] = useState(false);
  const online_freinds = useRef([]);
  const currernt_ice = useRef([])
  const currernt_offer = useRef(null)


  const ku = useContext(isUser);
  useEffect(() => {
    const socket = io("http://localhost:3000/", {
      extraHeaders: {
        user_id: current_user,
      },
    });
    socket.on("recieve_message", (message, sender_id) => {
      user_history.current.push([message, "incomming", sender_id]);
      console.log(message);
      console.log(user_history.current);
      setRefresh(Date.now());
    });

    socket.on("current_online_users", (user_list) => {
      setOnline_users(user_list);
      console.log(user_list);
      setRefresh(Date.now());
    });

    socket.on("receive_message_rtc", (message, sender_id) => {
      if (message.offer) {
        console.log("calling");
        setIs_calling(true);
        currernt_offer.current = message
      }
      if (message.icecandidate) {
        console.log("getting cids")
        currernt_ice.current.push(message.icecandidate)
        console.log(currernt_ice.current)
      }
    });

    setSendMessage({
      go: (message, rece_id) => {
        socket.emit("send_message", message, rece_id);
        user_history.current.push([message, "outgoing", rece_id]);
      },
    });

    setRefresh(Date.now());

    user_socket.current = socket;

    socket.on("online_update", (type, id) => {
      if (type == "add") {
        online_freinds.current.push(id);
        online_freinds.current = [...new Set(online_freinds.current)];
      } else {
        online_freinds.current = online_freinds.current.filter(
          (item) => item !== id
        );
        online_freinds.current = [...new Set(online_freinds.current)];
      }
      setConl_user(online_freinds.current);
      console.log("new online: " + online_freinds.current);
    });

    return () => {
      socket.disconnect();
    };
  }, [current_user, receiver_id]);

  useEffect(() => {
    fetch("/api/getfreinds", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ku.auth_token}`,
      },
      body: JSON.stringify({ user_id: current_user }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("frdzzzzzz");
        console.log(data);
        set_freinds(data);
      });
  }, [ku.auth_token, current_user]);

  return (
    <div className="chat_board">
      {is_calling ? (
        <div className="call_dispalyer">
          <CallDisplay user_id = {current_user} message_offer={currernt_offer.current} ice_list = {currernt_ice.current}  />
        </div>
      ) : null}
      {(() => {
        if (searCon) {
          return (
            <SearchContact
              search_data={search_data}
              current_user={current_user}
            />
          );
        }
      })()}
      <ContactBar
        current_user={current_user}
        receiver_id={receiver_id}
        online_users={freinds}
        key={receiver_id}
        set_Receiver_id={set_Receiver_id}
        history={user_history}
        setSerCon={setSerCon}
        setSearch_data={setSearch_data}
        conl_user={conl_user}
      />
      <MessageBoard
        key={refresh}
        send_message={send_message}
        setRefresh={setRefresh}
        history={user_history}
        receiver_id={receiver_id}
      />
    </div>
  );
}

export default ChatBoard;
