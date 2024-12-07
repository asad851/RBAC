import React from "react";
import { loginPageBg } from "../../constants/images";
function LeftAuthPagePanel() {
  return (
    <div className="w-full h-full flex justify-center items-center  bg-loginpage relative">
      <img
        className="w-[90%] h-[90%] object-contain object-center"
        src={loginPageBg}
        alt=""
      />
    </div>
  );
}

export default React.memo(LeftAuthPagePanel);
