import { useState } from "react";
import "./ContactBar.css";

function ContactBar({
  conl_user,
  setSearch_data,
  current_user,
  set_Receiver_id,
  history,
  receiver_id,
  online_users,
  setSerCon,
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
      <div className="contact_bar">
        <div className="genre">
          <span>People</span>
          <span>Group</span>
        </div>
        {Object.keys(online_users).map((o_user, index) => {
          return (
            
            <Contact
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
  current_user,
  history,
  setSerCon,
  setSearch_data,
  r_id,
  set_Receiver_id,
  current_receiver,
  conl_user,
  pic
}) {
  const [re_id, setRe_id] = useState(r_id);
  return (
    <div
      className="contact"
      style={current_receiver === re_id ? { backgroundColor: "pink" } : {}}
      onClick={() => {
        set_Receiver_id(re_id);
        console.log(re_id);
        setSerCon(false);
        setSearch_data("");
      }}
    >
      <img src={pic} />
      <span>
        {current_user !== re_id ? re_id : "you"} <br />
        <span className="is_online">
          {conl_user.includes(re_id) ? "online" : null}
        </span>
      </span>
    </div>
  );
}

export default ContactBar;
