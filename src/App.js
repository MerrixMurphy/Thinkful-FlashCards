import React from "react";
import Header from "./Layout/Header";
import Layout from "./Layout/index";

/**
 * App is a wrapper for <Layout>, you should not need to change this file.
 */

function App() {
  return (
    <div className="app-routes">
      <Header />
      <div className="container">
        <Layout />
      </div>
    </div>
  );
}

export default App;
