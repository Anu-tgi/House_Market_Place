import React from "react";

const spinner = () => {
  return (
    <div classname="text-align-center mt-10 p-5 spinner-border text-primary" role="status">
        <span classname="visually-hidden">Loading...</span>
    </div>
  );
};

export default spinner;