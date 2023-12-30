import React from "react";
import "../App.css";

const About = () => {
  return (
    <>
      <div className="about-page">
        <h1>About Online Judge</h1>
        <p>
          Welcome to the Online Judge Platform. We are dedicated to providing a
          platform for programmers to practice and improve their coding skills
          through a collection of algorithmic problems and challenges.
        </p>
        <p>
          Our mission is to foster a community of passionate developers who are
          committed to continuous learning and problem-solving. Whether you're a
          beginner or an experienced coder, Online Judge offers a wide range of
          problems to help you enhance your coding abilities.
        </p>
        <p>
          Join us on this coding journey, challenge yourself, and elevate your
          programming skills to new heights!
        </p>

        <h2>Main Developers</h2>
        <ul>
          <li>
            <p>Himanshu Saini</p>
          </li>
          <li>
            <p>Mridul Gupta</p>
          </li>
        </ul>

        <h2>Mentor</h2>
        <ul>
          <li>
            <p>Prof. Nishant Munjal</p>
          </li>
        </ul>

        <h2>Contact Us</h2>
        <p>
          If you have any questions, suggestions, or feedback, feel free to
          reach out to us at
          <a href="mailto:mg.mridulgupta04@gmail.com">
            {" "}
            mg.mridulgupta04@gmail.com
          </a>
          .
          <br />
          <a href="mailto:himanshusaini5888@gmail.com">
            {" "}
            himanshusaini5888@gmail.com
          </a>
          .
        </p>
      </div>
    </>
  );
};

export default About;
