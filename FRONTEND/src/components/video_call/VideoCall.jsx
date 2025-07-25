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
      </div>
      <div className="sender">
        <video autoPlay playsInline controls={false} ref={myRef_local}></video>
      </div>
    </div>
  );
}

export default VideoCall;
