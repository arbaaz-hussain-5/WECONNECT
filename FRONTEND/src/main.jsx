
import { createRoot } from "react-dom/client";
import Login from "./pages/login/Login.jsx";
import SignUp from "./pages/sign_up/SignUp.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import ChatPage from "./pages/chat_page/ChatPage.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Notification from "./components/notification/Notification.jsx";
import ProfileUpload from "./pages/profile_upload/ProfileUpload.jsx";
import VideoCall from "./components/video_call/VideoCall.jsx";
import Home from "./pages/home/Home.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/profileupload" element={<ProfileUpload />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/:id" element={<ChatPage />} />
       <Route path="/notifications/:ids" element={<Notification />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/video_call/:id" element={<VideoCall />} />
    </Routes>
  </BrowserRouter>
);
