import React from "react";

function Button({ onClick }) {
  return (
    <button className="Button" onClick={onClick}>
      Load more
    </button>
  );
}

export default Button;
