import React from "react";

function TapToPlaceAR() {
  return (
    <div>
      <div id="loading-screen">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
      <div id="error-screen">
        <span id="error-title"></span>
        <span id="error-message"></span>
      </div>
    </div>
  );
}

export default TapToPlaceAR;
