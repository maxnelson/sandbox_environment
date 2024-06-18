import React, { useState, useRef } from "react";
import { available } from "./data";
import { SubComponent } from "./components/SubComponent";
import { PageContainer } from "./components/PageContainer";

const App = () => {
  return (
    <React.StrictMode>
      <PageContainer />
    </React.StrictMode>
  );
};

export default App;
