import { useEffect, useState } from "react";
import "./Notification.css";
import { useParams } from "react-router";

function Notification() {
  const [not_his, setNot_his] = useState([]);
  const [dre, setDre] = useState(0);
  const id = useParams().ids;
  useEffect(() => {
    fetch(`/${import.meta.env.VITE_SERVER_URL}/get_freind_request`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: id }),
    }).then(async (response) => {
      if (response.status == 200) {
        const data = await response.json();
        setNot_his(data);
      } else if (response.status == 401) {
        console.log("unauthorized access");
      } else {
        console.log("something went wrong while processing your request");
      }
    });
  }, [id]);

  return (
    <div className="notf_page">
      <div className="notification">
        <div className="nothead">
          <span>NOTIFICATIONS</span>
        </div>
        {not_his.map((data, index) => {
          if (data[0] == "arrived") {
            return (
              <NotElementArr
                key={index}
                id={id}
                name={data[1]}
                setDre={setDre}
                setNot_his={setNot_his}
              />
            );
          } else if (data[0] == "dispatch") {
            return (
              <NotElementDis
                key={index}
                id={id}
                name={data[1]}
                setDre={setDre}
              />
            );
          }
        })}
      </div>
      <div className="notfi_side">
        <svg
          width="128"
          height="128"
          viewBox="0 0 128 128"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="128" height="128" fill="#fff6ec" />
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
    </div>
  );
}

function NotElementArr({ id, name, setDre }) {
  const [decision, setDecision] = useState(false);
  const [pic, setPic] = useState(null);
  useEffect(() => {
    fetch(`/${import.meta.env.VITE_SERVER_URL}/get_profile_pic`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: id, pic_id: name }),
    }).then(async (response) => {
      if (response.status == 200) {
        const data = await response.text();
        setPic(data);
      } else if (response.status == 401) {
        console.log("unauthorized access");
      } else {
        console.log("something went wrong while processing your request");
      }
    });
  }, [id, name]);

  function addFrd() {
    fetch(`/${import.meta.env.VITE_SERVER_URL}/addfreind`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_1: id, user_2: name }),
    }).then((response) => {
      if (response.status == 200) {
        console.log("freind added successfully");
        setDre(Date.now());
      } else if (response.status == 401) {
        console.log("unauthorized access");
      } else {
        console.log("something went wrong while processing your request");
      }
    });
  }

  function rejectRequest() {
    fetch(`/${import.meta.env.VITE_SERVER_URL}/remove_freind_request`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_1: id, user_2: name }),
    }).then((response) => {
      if (response.status == 200) {
        console.log("freind request removed successfully");
        setDre(Date.now());
      } else if (response.status == 401) {
        console.log("unauthorized access");
      } else {
        console.log("something went wrong while processing your request");
      }
    });
  }
  if (!decision) {
    return (
      <div className="NotElement">
        <div>
          <img src={pic} />
          <span>{name}</span>
        </div>

        <div>
          <button
            onClick={() => {
              addFrd();
              setDecision(true);
            }}
          >
            Accept
          </button>
          <button
            onClick={() => {
              rejectRequest();
              setDecision(true);
            }}
          >
            Reject
          </button>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

function NotElementDis({ id, name, setDre }) {
  const [decision, setDecision] = useState(false);
  const [pic, setPic] = useState(null);

  useEffect(() => {
    fetch(`/${import.meta.env.VITE_SERVER_URL}/get_profile_pic`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: id, pic_id: name }),
    }).then(async (response) => {
      if (response.status == 200) {
        const data = await response.text();
        setPic(data);
      } else if (response.status == 401) {
        console.log("unauthorized access");
      } else {
        console.log("something went wrong while processing your request");
      }
    });
  }, [id, name]);
  function withDrawRequest() {
    fetch(`/${import.meta.env.VITE_SERVER_URL}/remove_freind_request`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_1: id, user_2: name }),
    }).then((response) => {
      if (response.status == 200) {
        setDre(Date.now());
        console.log("freind request removed successfully");
      } else if (response.status == 401) {
        console.log("unauthorized access");
      } else {
        console.log("something went wrong while processing your request");
      }
    });
  }
  if (!decision) {
    return (
      <div className="NotElement">
        <div>
          <img
            src={
              pic
                ? pic
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
            }
          />
          <span>{name}</span>
        </div>

        <div>
          <button
            onClick={() => {
              withDrawRequest();
              setDecision(true);
            }}
          >
            Withdraw
          </button>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default Notification;
