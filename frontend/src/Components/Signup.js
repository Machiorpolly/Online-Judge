import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Card, Typography } from "@mui/material";
import { useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <div
        style={{
          paddingTop: 100,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant={"h6"}>Welcome to GKOJ. Sign up below</Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card varint={"outlined"} style={{ width: 400, padding: 20 }}>
          <TextField
            helperText="Please enter your email"
            fullWidth={true}
            label="Email"
            variant="outlined"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />
          <br />
          <TextField
            helperText="Please enter your password"
            fullWidth={true}
            label="Password"
            variant="outlined"
            type={"password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <br />
          <Button
            size={"large"}
            variant="outlined"
            style={{ margin: 10 }}
            onClick={async () => {
              try {
                const response = await axios.post(
                  "http://localhost:3000/users/login",
                  {
                    email: email,
                    password: password,
                  }
                );
                const token = response.data.token;
                localStorage.setItem("email", email);
                localStorage.setItem("token", token);
                navigate("/");
              } catch (error) {
                if (error.response) {
                  console.log(error.response);
                  alert(error.response.data.message);
                }
              }
            }}
          >
            LogIN
          </Button>
          <Button
            size={"large"}
            variant="outlined"
            onClick={async () => {
              const response = await axios.post(
                "http://localhost:3000/users/signup",
                {
                  email: email,
                  password: password,
                }
              );

              //console.log(response);
              const token = response.data.token;
              const username = response.data.data.user.email;
              localStorage.setItem("token", token);
              localStorage.setItem("email", username);
              alert("Successfully Signed Up!");
              navigate("/");
            }}
          >
            Signup
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default Signup;
