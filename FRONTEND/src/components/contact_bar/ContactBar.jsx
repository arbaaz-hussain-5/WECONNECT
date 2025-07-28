import { useEffect, useState, useRef } from "react";
import "./ContactBar.css";

function ContactBar({
  setOpen_receive_window,
  setOpen_call_window,
  conl_user,
  setSearch_data,
  current_user,
  set_Receiver_id,
  history,
  receiver_id,
  online_users,
  setSerCon,
  socket,
}) {
  return (
    <div className="contac_menu">
      <div className="search_users">
        <input
          placeholder="search people"
          onChange={(e) => {
            if (e.target.value == "") {
              setSerCon(false);
            } else {
              setSerCon(true);
            }
            setSearch_data(e.target.value);
          }}
        />
      </div>
      <div className="genre">
        <span>People</span>
        <span>Group</span>
      </div>
      <div className="contact_bar">
        {Object.keys(online_users).map((o_user) => {
          return (
            <Contact
              socket={socket}
              setOpen_receive_window={setOpen_receive_window}
              setOpen_call_window={setOpen_call_window}
              key={o_user}
              history={history}
              set_Receiver_id={set_Receiver_id}
              r_id={o_user}
              current_receiver={receiver_id}
              current_user={current_user}
              conl_user={conl_user}
              setRe_id={setSerCon}
              setSearch_data={setSearch_data}
              setSerCon={setSerCon}
              pic={online_users[o_user]}
            />
          );
        })}
      </div>
    </div>
  );
}

function Contact({
  setOpen_receive_window,
  setOpen_call_window,
  current_user,
  setSerCon,
  setSearch_data,
  r_id,
  set_Receiver_id,
  current_receiver,
  conl_user,
  pic,
  socket,
}) {
  const [re_id, setRe_id] = useState(r_id);
  const [is_typing, setIs_typing] = useState(false);
  const is_typing_time = useRef(null);
  useEffect(() => {
    socket.on(
      "receive_is_typing",
      (sender_id) => {
        if (re_id == sender_id) {
          setIs_typing(true);
          if (!is_typing_time.current) {
            is_typing_time.current = setTimeout(() => {
              setIs_typing(false);
            }, 1500);
          } else {
            clearTimeout(is_typing_time.current);
            is_typing_time.current = setTimeout(() => {
              setIs_typing(false);
            }, 1500);
          }
        }
      },
      [re_id]
    );
  });
  return (
    <div
      className="contact"
      style={current_receiver === re_id ? { backgroundColor: "#34B7F1" } : {}}
      onClick={() => {
        set_Receiver_id(re_id);
        console.log(re_id);
        setSerCon(false);
        setSearch_data("");
        setOpen_receive_window(false);
        setOpen_call_window(false);
      }}
    >
      <img src={pic} />
      <span style={current_receiver === re_id ? { color: "black" } : {}}>
        {current_user !== re_id ? re_id : "you"}
        <span>
          <span className="is_online">
            {conl_user.includes(re_id) && !is_typing ? "online" : null}
          </span>
          <span className="is_typing"> {is_typing ? "typing....." : null}</span>
        </span>
      </span>
    </div>
  );
}

export default ContactBar;
