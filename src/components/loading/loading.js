import React from "react";

function Loading() {
  return (
    <div>
      <img
        src={process.env.PUBLIC_URL + "/images/loading.gif"}
        style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}
        alt="loading..."
      />
    </div>
  );
}

export default Loading;
