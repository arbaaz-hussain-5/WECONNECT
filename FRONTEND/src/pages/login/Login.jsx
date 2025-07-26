import { useState } from "react";
import { useNavigate } from "react-router";
import "./Login.css";
function Login() {
  const [user_id, setUser_id] = useState(null);
  const [password, setPassword] = useState(null);
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
            await fetch("https://weconnect-xj4a.onrender.com/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ user_id: user_id, password: password }),
            }).then(async (response) => {
              if (response.status == 200) {
                const token = await response.text();
                // ku.auth = true;
                // ku.user = user_id;
                // ku.auth_token = token;
                // console.log(ku);
                sessionStorage.setItem("current_user", user_id);
                sessionStorage.setItem("is_auth", "true")
                console.log("local storage");
                console.log(sessionStorage);
                navigate("/");
              } else if (response.status == 204) {
                alert("user not registerd");
              } else if (response.status == 401) {
                alert("invalid password");
              } else {
                alert("something went wrong while processing your request");
              }
            });
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
