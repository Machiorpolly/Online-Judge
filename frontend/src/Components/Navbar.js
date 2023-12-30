import React from "react";
import "../App.css";
import logo from "../download.jpeg";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const username = localStorage.getItem("email");
  const navigate = useNavigate();
  console.log(username);

  return (
    <>
      <nav className="navbar">
        <img className="image" src={logo} alt="Online Judge" />
        <div>
          <span className="navbar__logo">
            <a href="/Home">Online Judge</a>
          </span>
        </div>
        <ul className="navbar__links">
          <li>
            <a href="/problems/all">Problems</a>
          </li>
          <li>
            <a href="/Learn">Learn</a>
          </li>
          <li>
            <a href="/About">About</a>
          </li>
          <li>
            {username !== "None" ? (
              <div className="user_name">{username}</div>
            ) : (
              <button
                className="navbar__add-button"
                onClick={() => {
                  navigate("/Signup");
                }}
              >
                Log In
              </button>
            )}
          </li>
          {username !== "None" ? (
            <li>
              <button
                className="navbar__logout"
                onClick={() => {
                  localStorage.setItem("email", "None");
                  localStorage.setItem("token", undefined);
                  navigate("/Signup");
                }}
              >
                Log Out
              </button>
            </li>
          ) : (
            <></>
          )}
        </ul>
      </nav>
    </>
  );
}
