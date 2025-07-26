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
        <div>
          <h4>USER ID</h4>
          <input
            onChange={(event) => {
              setUser_id(event.target.value);
            }}
          />
        </div>
        <div>
          <h4>PASSWORD</h4>
          <input
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <button
          onClick={async () => {
            await fetch(`${import.meta.env.VITE_SERVER_URL}/login`, {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ user_id: user_id, password: password }),
            }).then(async (response) => {
              if (response.status == 200) {
                sessionStorage.setItem("current_user", user_id);
                sessionStorage.setItem("is_auth", "true");
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
