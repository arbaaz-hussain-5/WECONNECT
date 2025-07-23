import "./NavBar.css";
import { NavLink, Link } from "react-router";
import { useContext } from "react";
import { isUser } from "../../isUser";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useEffect } from "react";
function NavBar() {
  const usob = useContext(isUser);
  const user = sessionStorage.getItem("current_user");
  const [isnotf, setIsnotf] = useState(false);
  if (user !== null) {
    usob.auth = true;
    usob.user = user;
  }
  const [uauth, setUauth] = useState(false);
  const [isham, setIsHam] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("/api/notfication_status", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: user }),
    })
      .then((response) => response.text())
      .then((data) => {
        if (data == "true") {
          setIsnotf(true);
        } else {
          setIsnotf(false);
        }
      });
  }, [user]);
  return (
    <div className="nav_bar">
      {isham ? <SideBar isham={isham} setIsHam={setIsHam} /> : null}
      <div className="left_nav">
        <div
          className="ham_menu"
          onClick={() => {
            setIsHam(!isham);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
            viewBox="0 0 48 48"
          >
            <g
              fill="none"
              stroke="#ffffff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
            >
              <path d="M7.94971 11.9497H39.9497" />
              <path d="M7.94971 23.9497H39.9497" />
              <path d="M7.94971 35.9497H39.9497" />
            </g>
          </svg>
        </div>

        <div className="logo">
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
      </div>
      <div className="right_nav">
        {!usob.auth ? (
          <>
            <div className="login_logout">
              <NavLink to="/login">LOGIN</NavLink>
            </div>

            <div className="login_logout">
              <NavLink to="/signup">SIGNUP</NavLink>
            </div>
          </>
        ) : (
          <>
            <div className="login_logout">
              <NavLink
                to="/"
                onClick={() => {
                  sessionStorage.removeItem("current_user");
                  usob.auth = false;
                  usob.user = undefined;
                  usob.auth_token = undefined;
                  setUauth(!uauth);
                }}
              >
                LOGOUT
              </NavLink>
            </div>

            <div
              className={isnotf ? "notfication_bell" : "not_notfication_bell"}
              onClick={() => {
                navigate("/notifications/" + usob.user);
              }}
            >
              {isnotf ? <div className="notf_dot"></div> : null}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" />
              </svg>
            </div>

            <div
              className="account"
              onClick={() => {
                navigate("/profile/" + usob.user);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
              </svg>
            </div>

            <div
              className="Chat_Message"
              onClick={() => {
                navigate("/" + usob.user);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" />
              </svg>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function SideBar({ isham, setIsHam }) {
  return (
    <div className="sidebar">
      <div className="side_top">
        <div
          className="ham_menu_side"
          onClick={() => {
            setIsHam(!isham);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000"
          >
            <path d="M360-240 120-480l240-240 56 56-144 144h488v-160h80v240H272l144 144-56 56Z" />
          </svg>
        </div>

        <div className="side_logo">
          <svg
            width="128"
            height="128"
            viewBox="0 0 128 128"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="64" cy="64" r="64" fill="#25D366" />
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

      <div className="side_con">
        <div>Privacy</div>
        <div>Terms</div>
        <div>Security</div>
        <div>Contact</div>
        <div>Feedback</div>
      </div>
    </div>
  );
}

export default NavBar;
