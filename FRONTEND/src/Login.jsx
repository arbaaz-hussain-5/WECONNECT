import { useState } from "react";
import { useNavigate } from "react-router";
import "./Login.css";
import { useContext } from "react";
import { isUser } from "./isUser";
function Login() {
  const [user_id, setUser_id] = useState(null);
  const [password, setPassword] = useState(null);
  const ku = useContext(isUser);
  const navigate = useNavigate();
  return (
    <div className="login">
      <div className="login_box">
        <h4>USER ID</h4>
        <input
          onChange={(event) => {
            setUser_id(event.target.value);
          }}
        />
        <br />
        <h4>PASSWORD</h4>
        <input
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

        <button
          onClick={async () => {
            let k = "";
            await fetch("/api/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ user_id: user_id, password: password }),
            })
              .then((response) => {
                console.log(response);
                return response.json();
              })
              .then((data) => {
                k = data.token;
                console.log(k);
              });
            if (k !== "wrong password" && k !== "user not found") {
              ku.auth = true;
              ku.user = user_id;
              ku.auth_token = k;
              console.log(ku);
              sessionStorage.setItem("current_user", user_id);
              sessionStorage.setItem("current_cdi", []);
              console.log("local storage");
              console.log(sessionStorage);
              console.log(sessionStorage.getItem("current_user"));
              console.log(sessionStorage.getItem("current_use"));
              navigate("/");
            }
          }}
        >
          LOGIN
        </button>
        <span
          className="new_sign"
          onClick={() => {
            navigate("/signup");
          }}
        >
          new user?signup hear
        </span>
      </div>
    </div>
  );
}

export default Login;
