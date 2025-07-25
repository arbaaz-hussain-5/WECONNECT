import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { useParams } from "react-router-dom";
import { useState } from "react";

function Profile() {
  const [pdata, setPdata] = useState(null);
  const [isFrd, setIsfrd] = useState(false);
  const [isReq, setIsReq] = useState(false);
  const id = useParams().id;

  const navigate = useNavigate();
  let user = sessionStorage.getItem("current_user");

  useEffect(() => {
    fetch(`/${import.meta.env.VITE_SERVER_URL}get_profile`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: user, p_id: id }),
    }).then(async (response) => {
      if (response.status == 200) {
        const data = await response.json();
        console.log(data);
        setPdata(data);
      } else if (response.status == 401) {
        console.log("unauthorized access");
      } else {
        console.log("something went wrong while processing your request");
      }
    });
  }, [id, user]);

  useEffect(() => {
    fetch(`/${import.meta.env.VITE_SERVER_URL}/getfreinds`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: user }),
    }).then(async (response) => {
      if (response.status == 200) {
        const data = await response.json();
        if (Object.keys(data).includes(id)) {
          setIsfrd(true);
        } else {
          setIsfrd(false);
        }
      } else if (response.status == 401) {
        console.log("unauthorized access");
      } else {
        console.log("something went wrong while processing your request");
      }
    });
  }, [user, id]);

  useEffect(() => {
    fetch(`/${import.meta.env.VITE_SERVER_URL}/get_freind_request`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: user }),
    }).then(async (response) => {
      if (response.status == 200) {
        const data = await response.json();
        for (let i = 0; i < data.length; i++) {
          if (data[i][1] == id) {
            if (data[i][0] == "dispatch") {
              setIsReq(true);
            }
          }
        }
      } else if (response.status == 401) {
        console.log("unauthorized access");
      } else {
        console.log("something went wrong while processing your request");
      }
    });
  }, [user, id]);

  function sendRequest() {
    fetch(`/${import.meta.env.VITE_SERVER_URL}/freind_request`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ r_sender: user, r_receiver: id }),
    }).then((response) => {
      if (response.status == 200) {
        console.log("request sent");
      } else if (response.status == 401) {
        console.log("unauthorized access");
      } else {
        console.log("something went wrong while processing your request");
      }
    });
  }
  function makeUnFreind() {
    fetch(`/${import.meta.env.VITE_SERVER_URL}/removefreind`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_1: user, user_2: id }),
    }).then((response) => {
      if (response.status == 200) {
        console.log("unfreind succesfully");
        setIsfrd(false);
      } else if (response.status == 401) {
        console.log("unauthorized access");
      } else {
        console.log("something went wrong while processing your request");
      }
    });
  }
  function withDrawRequest() {
    fetch(`/${import.meta.env.VITE_SERVER_URL}/remove_freind_request`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_1: user, user_2: id }),
    }).then((response) => {
      if (response.status == 200) {
        console.log("freind request removed successfully");
      } else if (response.status == 401) {
        console.log("unauthorized access");
      } else {
        console.log("something went wrong while processing your request");
      }
    });
  }
  return (
    <div className="pro_con">
      <div className="profile">
        <div className="photo">
          <img src={pdata?.profile_pic} />
          {user == id ? (
            <div className="change_profile">
              <div>
                <button
                  onClick={() => {
                    navigate("/profileupload");
                  }}
                >
                  CHANGE PROFILE PIC
                </button>
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
    </div>
  );
}

export default Profile;
