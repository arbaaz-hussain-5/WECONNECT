import "./VideoCall.css";
import { useEffect, useRef } from "react";
import { useContext } from "react";
import { isVideo } from "../../VideoPlayer";
function VideoCall() {
  const myElementRef = useRef(null);
  const k = useContext(isVideo);
  k.video_elm = myElementRef;
  console.log("strmmmmmmmmmmmmmmmmm");
  console.log(k.current_stream);
  console.log("mmmmmmmmmmmmmmmmmmmmmmmmmm");
  return (
    <div ref={myElementRef} className="video_call">
      <div className="receiver">
        <video id="hi" autoPlay playsInline controls={true}></video>
        <button
          onClick={() => {
            console.log("strmmmmmmmmmmmmmmmmm");
            console.log(k.current_stream);
            k.video_elm.current.querySelector("#hi").srcObject =
              k.current_stream;
            console.log("mmmmmmmmmmmmmmmmmmmmmmmmmm");
          }}
        >
          click
        </button>
      </div>
      <div className="sender">
        <video autoPlay playsInline controls={true}></video>
      </div>
    </div>
  );
}

export default VideoCall;
