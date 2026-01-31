import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(() => {
        console.log("Service Worker registered");
      })
      .catch((err) => {
        console.error("Service Worker error:", err);
      });
  });
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
