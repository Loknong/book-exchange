import * as React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
// import TestPanel from "./components/testing/TestPanel.tsx";

document.title = "Turnix Book Exchange";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      {/* <TestPanel /> */}
      <App />
    </Router>
  </React.StrictMode>
);
