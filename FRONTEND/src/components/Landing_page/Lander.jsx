import "./Lander.css";

function Lander() {
  return (
    <div className="no_nav">
      <div className="lander">
        <div className="s0">
          <h1>WELCOME TO WECONNECT</h1>
          <h2>An instant secure Connecting App</h2>
        </div>
        <div className="lline"></div>
        <div className="s1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
            viewBox="0 0 48 48"
          >
            <g
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeidth="4"
            >
              <path
                fill="#2F88FF"
                d="M44.0001 24C44.0001 35.0457 35.0458 44 24.0001 44C18.0266 44 4.00006 44 4.00006 44C4.00006 44 4.00006 29.0722 4.00006 24C4.00006 12.9543 12.9544 4 24.0001 4C35.0458 4 44.0001 12.9543 44.0001 24Z"
              />
              <path stroke="#fff" d="M14 18L32 18" />
              <path stroke="#fff" d="M14 26H32" />
              <path stroke="#fff" d="M14 34H24" />
            </g>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
            viewBox="0 0 512 512"
          >
            <path
              fill="#2F88FF"
              d="m426.7 453.8l-38.1-79.1c-8.2-16.9-18.8-29.2-37.1-21.7l-36.1 13.4c-28.9 13.4-43.3 0-57.8-20.2l-65-147.9c-8.2-16.9-3.9-32.8 14.4-40.3l50.5-20.2c18.3-7.6 15.4-23.4 7.2-40.3l-43.3-80.6c-8.2-16.9-25-21-43.3-13.5c-36.6 15.1-66.9 38.8-86.6 73.9c-24 42.9-12 102.6-7.2 127.7c4.8 25.1 21.6 69.1 43.3 114.2c21.7 45.2 40.7 80.7 57.8 100.8c17 20.1 57.8 75.1 108.3 87.4c41.4 10 86.1 1.6 122.7-13.5c18.4-7.2 18.4-23.1 10.3-40.1z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
            viewBox="0 0 24 24"
          >
            <path
              fill="#2F88FF"
              d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM15 16H5V8h10v8zm-6-1h2v-2h2v-2h-2V9H9v2H7v2h2z"
            />
          </svg>
        </div>
        <div className="lline"></div>
      </div>
      <div className="m_lander">
        <img
          src="https://ik.imagekit.io/arbaazhussain/1753449456664.png?updatedAt=1753449545547"
          alt=""
        />
        <div className="li">
          <h2>Voice Calls (VoIP)</h2>
          <h4>Talk Anywhere</h4>
          <p>
            Make crystal-clear voice calls over the internet using advanced VoIP
            technology. Fast, secure, and completely free, no matter where you
            are.
          </p>
        </div>
      </div>
      <div className="m_lander">
        <div>
          {" "}
          <h2>Video Calls (WebRTC)</h2>
          <h4>Face-to-Face, Anywhere</h4>
          <p>
            Connect in real time with smooth, high-quality video powered by
            WebRTC. No downloads, no hassle, just private, secure video calls
            from your browser or app.
          </p>
        </div>
        <img src="https://ik.imagekit.io/arbaazhussain/1753449158533.png?updatedAt=1753449545689" />
      </div>
      <div className="m_lander">
        <img src="https://ik.imagekit.io/arbaazhussain/1753449223762.png?updatedAt=1753449545414" />
        <div>
          {" "}
          <h2>Instant Messaging (Socket.IO)</h2>
          <h4>Chat in Real Time</h4>
          <p>
            Send and receive messages instantly with real-time Socket.IO-powered
            chat. Fast, reliable, and always in sync—whether it's one-on-one or
            in groups.
          </p>
        </div>
      </div>

      <div className="footer-container">
        <div>
          <h2 className="footer-title">WECONNNECT— Private, Fast & Simple</h2>
          <p className="footer-description">
            Welcome to WECONNNECT — the all-in-one platform for messaging, voice
            and video calls. We prioritize privacy with industry-grade
            end-to-end encryption while offering a fast and elegant user
            experience.
          </p>
        </div>
        <div className="footer-section">
          <h4 className="footer-heading">Explore</h4>
          <div className="footer-links">
            <a href="#">Privacy</a> |<a href="#">Terms</a> |
            <a href="#">Security</a> |<a href="#">Status</a> |
          </div>
        </div>
        <div className="footer-section">
          <h4 className="footer-heading">Contact</h4>
          <p>
            Support:{" "}
            <a href="mailto:mdarbaazhussain666@gmail.com">
              mdarbaazhussain666@gmail.com
            </a>
            <br />
            Press:{" "}
            <a href="mdarbaazhussain555@gmail.com.com">
              mdarbaazhussain555@gmail.com
            </a>
          </p>
        </div>
        <div className="footer-section footer-legal">
          <p>
            All communications are encrypted. Your data stays with you. We do
            not sell or share your personal information with third parties.
          </p>
        </div>
        <div className="footer-meta">
          v1.0.0 &nbsp;|&nbsp; Language: English (India)
        </div>
        <div className="footer-copy">
          © 2025 WECONNNECTInc. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default Lander;
