import "./VideoCall.css";
import "video.js/dist/video-js.css";
import { useContext, useEffect, useRef } from "react";
import { isVideo } from "../../contexts/VideoPlayer";
function VideoCall() {
  const VideoStream = useContext(isVideo);
  const myRef_local = useRef(null);
  const myRef_remote = useRef(null);
  VideoStream.video_elm_remote = myRef_remote;
  VideoStream.video_elm_local = myRef_local;
  return (
    <div className="video_call">
      <div className="receiver">
        <video ref={myRef_remote} autoPlay playsInline controls={false}></video>
        <div className="cont_receiver">
          <div className="mic">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="m710-362-58-58q14-23 21-48t7-52h80q0 44-13 83.5T710-362ZM480-594Zm112 112-72-72v-206q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v126l-80-80v-46q0-50 35-85t85-35q50 0 85 35t35 85v240q0 11-2.5 20t-5.5 18ZM440-120v-123q-104-14-172-93t-68-184h80q0 83 57.5 141.5T480-320q34 0 64.5-10.5T600-360l57 57q-29 23-63.5 39T520-243v123h-80Zm352 64L56-792l56-56 736 736-56 56Z" />
            </svg>
          </div>
          <div className="camera">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="m880-195-80-80v-405H638l-73-80H395l-38 42-57-57 60-65h240l74 80h126q33 0 56.5 23.5T880-680v485Zm-720 75q-33 0-56.5-23.5T80-200v-480q0-33 23.5-56.5T160-760h41l80 80H160v480h601l80 80H160Zm466-215q-25 34-62.5 54.5T480-260q-75 0-127.5-52.5T300-440q0-46 20.5-83.5T375-586l58 58q-24 13-38.5 36T380-440q0 42 29 71t71 29q29 0 52-14.5t36-38.5l58 58Zm-18-233q25 24 38.5 57t13.5 71v12q0 6-1 12L456-619q6-1 12-1h12q38 0 71 13.5t57 38.5ZM819-28 27-820l57-57L876-85l-57 57ZM407-440Zm171-57Z" />
            </svg>
          </div>
          <div className="sound">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M792-56 671-177q-25 16-53 27.5T560-131v-82q14-5 27.5-10t25.5-12L480-368v208L280-360H120v-240h128L56-792l56-56 736 736-56 56Zm-8-232-58-58q17-31 25.5-65t8.5-70q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 53-14.5 102T784-288ZM650-422l-90-90v-130q47 22 73.5 66t26.5 96q0 15-2.5 29.5T650-422ZM480-592 376-696l104-104v208Zm-80 238v-94l-72-72H200v80h114l86 86Zm-36-130Z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="sender">
        <video autoPlay playsInline controls={false} ref={myRef_local}></video>
         <div className="cont_sender">
          <div className="mic">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="m710-362-58-58q14-23 21-48t7-52h80q0 44-13 83.5T710-362ZM480-594Zm112 112-72-72v-206q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v126l-80-80v-46q0-50 35-85t85-35q50 0 85 35t35 85v240q0 11-2.5 20t-5.5 18ZM440-120v-123q-104-14-172-93t-68-184h80q0 83 57.5 141.5T480-320q34 0 64.5-10.5T600-360l57 57q-29 23-63.5 39T520-243v123h-80Zm352 64L56-792l56-56 736 736-56 56Z" />
            </svg>
          </div>
          <div className="camera">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="m880-195-80-80v-405H638l-73-80H395l-38 42-57-57 60-65h240l74 80h126q33 0 56.5 23.5T880-680v485Zm-720 75q-33 0-56.5-23.5T80-200v-480q0-33 23.5-56.5T160-760h41l80 80H160v480h601l80 80H160Zm466-215q-25 34-62.5 54.5T480-260q-75 0-127.5-52.5T300-440q0-46 20.5-83.5T375-586l58 58q-24 13-38.5 36T380-440q0 42 29 71t71 29q29 0 52-14.5t36-38.5l58 58Zm-18-233q25 24 38.5 57t13.5 71v12q0 6-1 12L456-619q6-1 12-1h12q38 0 71 13.5t57 38.5ZM819-28 27-820l57-57L876-85l-57 57ZM407-440Zm171-57Z" />
            </svg>
          </div>
          <div className="sound" onClick={() => {
            myRef_local.current.muted = !myRef_local.current.muted;
          }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M792-56 671-177q-25 16-53 27.5T560-131v-82q14-5 27.5-10t25.5-12L480-368v208L280-360H120v-240h128L56-792l56-56 736 736-56 56Zm-8-232-58-58q17-31 25.5-65t8.5-70q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 53-14.5 102T784-288ZM650-422l-90-90v-130q47 22 73.5 66t26.5 96q0 15-2.5 29.5T650-422ZM480-592 376-696l104-104v208Zm-80 238v-94l-72-72H200v80h114l86 86Zm-36-130Z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCall;
