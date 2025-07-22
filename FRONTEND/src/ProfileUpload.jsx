import React from "react";
import "./ProfileUpload.css";
import { useState, useContext } from "react";
import { isUser } from "./isUser";
function ProfileUpload() {
  const cu = useContext(isUser);
  let user = sessionStorage.getItem("current_user");
  if (user == null) {
    user = cu.user;
  }
  const [current_file, setCurrent_file] = useState(null);
  return (
    <div className="profile_upload">
      <div className="profile_upload_box">
        <input
          type="file"
          id="input"
          onChange={(event) => {
            const file_element = event.target.files[0];
            const formData = new FormData();
            formData.append("file", file_element);
            formData.append("tuser", user);
            setCurrent_file(formData);
          }}
        />

        <button
          onClick={() => {
            fetch("/api/uploadsingle", {
              method: "POST",
              body: current_file,
            })
              .then((response) => {
                return response.text();
              })
              .then((data) => {
                console.log(data);
              });
          }}
        >
          Upload
        </button>
      </div>
    </div>
  );
}

export default ProfileUpload;
