import React from "react";
import Footer from "./Footer";

function App({ children }) {
  return (
    <div className="app">
      {children}
      <Footer />
    </div>
  );
}

export default App;
