import React from "react";

const NonAuthLayout = React.memo((props) => {


  return <>{props.children}</>
});

export default NonAuthLayout;
