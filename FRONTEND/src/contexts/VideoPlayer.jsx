
import { createContext } from "react";
const inital_state = {video_elm_local:null, video_elm_remote:null, current_local_stream:null, current_remote_stream:null, remove_video:null};
export const isVideo = createContext(inital_state);
