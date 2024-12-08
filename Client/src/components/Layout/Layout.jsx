import React from "react";
import Header from "./Header";
import SideNav from "./SideNav";
function Layout(props) {
  return (
    <div className="w-full h-full">
      <Header />
      <div className="w-full h-[calc(100dvh-80px)] flex mt-20">
        <SideNav />
        <div className="w-full h-full">
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
