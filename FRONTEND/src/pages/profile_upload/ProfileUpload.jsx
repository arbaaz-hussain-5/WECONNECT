
import "./ProfileUpload.css";
import { useState} from "react";
function ProfileUpload() {
 
  let user = sessionStorage.getItem("current_user");
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
            fetch(`/${import.meta.env.VITE_SERVER_URL}/uploadsingle`, {
              method: "POST",
              body: current_file,
            }).then((response) => {
              if (response.status == 200) {
                console.log("profile changed successfilly");
              } else if (response.status == 401) {
                console.log("unauthorized access");
              } else {
                console.log(
                  "something went wrong while processing your request"
                );
              }
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
