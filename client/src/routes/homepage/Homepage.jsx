import { Link } from "react-router-dom";
import "./homepage.css";
import { TypeAnimation } from "react-type-animation";
import { useState } from "react";

const Homepage = () => {
  const [typingStatus, setTypingStatus] = useState("human1");

  return (
    <div className="homepage">
      <img src="/orbital.png" alt="" className="orbital" />
      <div className="left">
        <h1>ASSka AI</h1>
        <h2>Your AI Coding Mentor & Study Assistant</h2>
        <h3>
          Master coding concepts with personalized explanations, solve DSA problems,
          analyze code complexity, and learn faster with AI-powered mentorship.
          Now with image analysis and generation! 🎨
        </h3>
        <Link to="/dashboard">Get Started</Link>
      </div>
      <div className="right">
        <div className="imgContainer">
          <div className="bgContainer">
            <div className="bg"></div>
          </div>
          <img src="/bot.png" alt="" className="bot" />
          <div className="chat">
            <img
              src={
                typingStatus === "human1"
                  ? "/human1.jpeg"
                  : typingStatus === "human2"
                  ? "/human2.jpeg"
                  : "bot.png"
              }
              alt=""
            />
            <TypeAnimation
              sequence={[
                "Student: Explain Newton's laws of motion",
                2000,
                () => { setTypingStatus("bot"); },
                "ASSka: Newton's 1st law: an object stays at rest unless acted upon...",
                2000,
                () => { setTypingStatus("human2"); },
                "Student: Help me solve this math problem",
                2000,
                () => { setTypingStatus("bot"); },
                "ASSka: Sure! Let's break it down step by step...",
                2000,
                () => { setTypingStatus("human1"); },
              ]}
              wrapper="span"
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
      <div className="terms">
        <img src="/logo.png" alt="" />
        <div className="links">
          <Link to="/terms">Terms of Service</Link>
          <span>|</span>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
