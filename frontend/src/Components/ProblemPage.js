import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Circles } from "react-loader-spinner";

const ProblemPage = () => {
  const { pid } = useParams();
  const [problem, setProblem] = useState();
  const [code, setCode] = useState("");
  const [open, setOpen] = useState(false);
  const [resp, setResp] = useState(null);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  useEffect(() => {
    (async () => {
      const res = await axios.get("http://localhost:3000/problem/" + pid);
      setTimeout(() => {
        setProblem(res.data[0]);
      }, 1000);
    })();
  }, []);

  async function handleSubmit() {
    var e = document.getElementById("Language");
    const language = e.value;
    const sourceCode = code;
    const timeLimit = problem.timeLimit;
    const token = localStorage.getItem("token");
    // console.log(code);
    // console.log(token);
    const response = await axios.post(
      "http://localhost:3000/problem/" + pid + "/submit",

      {
        sourceCode: sourceCode,
        language: language,
        pid: pid,
        timeLimit: timeLimit / 1000,
      },
      {
        headers: {
          Authorization: token,
          "Content-type": "application/json",
        },
      }
    );

    const msg =
      "Status = " +
      response.data.status +
      ", Runtime = " +
      response.data.time +
      "ms";
    setResp(msg);
    handleClick();
  }

  return (
    <div>
      {problem ? (
        <>
          <div className="problem-page">
            <header className="problem-header">
              <h1>{problem.name}</h1>
            </header>
            <main className="problem-content">
              <div className="problem-description">
                <div className="problem-limits">
                  <b>Time Limit</b> : {problem.timeLimit / 1000} s<br></br>
                  <b>Memory Limit</b> : {problem.memoryLimit / (1024 * 1024)} MB
                </div>

                <pre>{problem.description}</pre>
              </div>
              <div className="input-output">
                <h2 className="problem-heading">Input</h2>
                <pre>{problem.inputDescription}</pre>
                <h2 className="problem-heading">Output</h2>
                <pre>{problem.outputDescription}</pre>
                <h2>Constraints</h2>
                <pre>{problem.constraintDescription}</pre>
                <h2>Example</h2>
                <pre>
                  <b>Input</b> : <br></br>
                  {problem.openTestCases[0].input}
                </pre>
                <pre>
                  <b>Output</b> : <br></br>
                  {problem.openTestCases[0].output}{" "}
                </pre>
              </div>
            </main>
          </div>

          <div className="file-choose">
            <h1>Submit: &nbsp;</h1>
            <pre>
              <div style={{ color: "green" }}>ac = Accepted</div>
            </pre>
            <pre style={{ color: "red", textDecoration: "bold" }}>
              wa = Wrong Answer, tle = Time Limit Exceeded, re = Runtime Error,
              mle = Memory Limit Exceeded
            </pre>
            <pre>
              Do test the code locally, on your machine, before submitting.
              <br></br>
              <br></br>Choose Language
            </pre>
            <select name="Language" id="Language">
              <option value="cpp">C++</option>
              <option value="python">Python</option>
            </select>
            <br></br>
            <br></br>
            <AceEditor
              mode="python"
              theme="monokai"
              editorProps={{ $blockScrolling: false, $showPrintMargin: false }}
              placeholder="Write your code here."
              value={code}
              onChange={(code) => setCode(code)}
              padding={10}
              fontSize={14}
              style={{
                fontFamily: "monospace",
                border: "1px solid black",
                height: "500px",
                width: "800px",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              }}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
              }}
            />
            <br></br>
            <br></br>
            <button className="button-3" role="button" onClick={handleSubmit}>
              Submit
            </button>
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              message={resp}
              action={action}
            />
          </div>
        </>
      ) : (
        <div className="loader_div">
          <Circles
            height="40"
            width="40"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
    </div>
  );
};

export default ProblemPage;
