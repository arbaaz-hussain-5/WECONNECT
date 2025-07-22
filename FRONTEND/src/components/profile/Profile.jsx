import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { isUser } from "../../isUser";
function Profile() {
  const [pdata, setPdata] = useState(null);
  const [isFrd, setIsfrd] = useState(false);
  const [isReq, setIsReq] = useState(false);
  const navigate = useNavigate();
  const id = useParams().id;
  const cu = useContext(isUser);
  let user = sessionStorage.getItem("current_user");
  if (user == null) {
    user = cu.user;
  }
  const token = cu.auth_token;
  useEffect(() => {
    fetch("/api/get_profile", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ user_id: user, p_id: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setPdata(data);
      });
  }, [id, token, user]);

  useEffect(() => {
    fetch("/api/getfreinds", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ user_id: user }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("frdssss");
        console.log(data);
        if (Object.keys(data).includes(id)) {
          setIsfrd(true);
          console.log("this is frd");
        } else {
          setIsfrd(false);
          console.log("this is NOT frd");
        }
      });
  }, [user, id, token]);

  useEffect(() => {
    fetch("/api/get_freind_request", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ user_id: user }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("frdssssRequests");
        console.log(data);

        for (let i = 0; i < data.length; i++) {
          if (data[i][1] == id) {
            if (data[i][0] == "dispatch") {
              setIsReq(true);
            }
          }
        }
      });
  }, [user, id, token]);

  function sendRequest() {
    fetch("/api/freind_request", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ r_sender: user, r_receiver: id }),
    }).then(() => {
      console.log("requst sent");
    });
  }
  function makeUnFreind() {
    fetch("/api/removefreind", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_1: user, user_2: id }),
    }).then(() => {
      console.log("requst sent");
      setIsfrd(false);
    });
  }
  function withDrawRequest() {
    fetch("/api/remove_freind_request", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ user_1: user, user_2: id }),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
      });
  }
  return (
    <div className="profile">
      <div className="photo">
        <img src={pdata?.profile_pic} />
        {user == id ? (
          <div className="change_profile" >
            <div>
              <button onClick = {() => {
                navigate("/profileupload");
              }}>CHANGE PROFILE PIC</button>
            </div>
          </div>
        ) : (
          <div className="request">
            {!isFrd ? (
              <div>
                {isReq ? (
                  <button
                    onClick={() => {
                      withDrawRequest();
                      setIsReq(false);
                      console.log("isreeeeeeeeeeeeeeeeeeeeeeeeeee" + isReq);
                    }}
                  >
                    withDraw
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      sendRequest();
                      setIsReq(true);
                    }}
                  >
                    send Request
                  </button>
                )}
              </div>
            ) : (
              <div>
                <button
                  onClick={() => {
                    makeUnFreind();
                    setIsfrd(false);
                  }}
                >
                  UNFREIND
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="about">
        <div className="aname">{pdata?.user_id}</div>
        <div className="aabout">{"this is indiaihudus"}</div>
      </div>
    </div>
  );
}

export default Profile;
