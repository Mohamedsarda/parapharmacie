import React from "react";
import ReactLoading from "react-loading";

const Loading = () => {
  return (
    <div className="loadingContainer">
      <ReactLoading className="loadingBar" type="bars" color="#95a595" />
    </div>
  );
};

export default Loading;
