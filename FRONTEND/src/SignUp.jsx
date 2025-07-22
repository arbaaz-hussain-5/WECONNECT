import { useState } from "react";
import { useNavigate } from "react-router";
import "./SignUp.css";
function SignUp() {
  const [user_id, setUser_id] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirm_password, setConfirm_Password] = useState(null);
    let navigate = useNavigate();
  return (
    <div className="signup">
      <div className="signup_box">
        <h4>USER ID</h4>
        <input value={user_id}
          onChange={(event) => {
            setUser_id(event.target.value);
          }}
        />
        <br />
        <h4>PASSWORD</h4>
        <input value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <br />
        <h4>CONFIRM PASSWORD</h4>
        <input value={confirm_password}
          onChange={(event) => {
            setConfirm_Password(event.target.value);
          }}
        />

        <button
          onClick={async () => {
            if (password === confirm_password) {
              let k = "";
              await fetch("/api/signup", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ user_id: user_id, password: password }),
              })
                .then((response) => response.text())
                .then((data) => {
                  k = data;
                });
              if (k == "done") {
                alert("succesfully signed in");
                 setConfirm_Password("");
                 setPassword("");
                 setUser_id("");
                     navigate("/");
              }
               else if (k == "exist") {
                alert("user already exist");
              }
            }
            else{
                 setConfirm_Password("");
                 alert("enter correct password")
            }
          }}
        >
          SIGNUP
        </button>
          <span className="new_sign" onClick={() => {
           navigate("/login");
        }}>existing user?login hear</span>
      </div>
    </div>
  );
}

export default SignUp;
