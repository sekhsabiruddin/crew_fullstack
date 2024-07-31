import React from "react";
import Sidebar from "./Sidebar";
import Home from "./Home";
const index = () => {
  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="h-screen w-[85%]">
        <Home />
      </div>
    </div>
  );
};

export default index;
