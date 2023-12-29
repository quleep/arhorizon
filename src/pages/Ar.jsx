import React from "react";

function Ar() {
  return (
    <div className="w-full h-full flex flex-1">
      <button
        onClick={() => {
          window.close();
        }}>
        close!
      </button>
    </div>
  );
}

export default Ar;
