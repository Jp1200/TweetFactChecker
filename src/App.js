import React, { useState, useEffect } from "react";
// import Async, { useAsync } from "react-async";
// import Source from "./sourceDiv";
import AsyncHooks from "./asyncLoad";
// OKAY

function App() {
  return (
    // switched below className to info from "container"
    <div className="info">
      <h1>
        <i className="fab fa-twitter twitter-icon"></i>Tweet Source Fact Check
        Helper
      </h1>
      <header>
        Copy and paste Tweets in the Search Bar to find related articles
      </header>
      <header>Press Enter to Search</header>
      <AsyncHooks />
    </div>
  );
}

export default App;
