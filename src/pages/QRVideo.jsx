import React from "react";
import { useLocation } from "react-router-dom";

function QRVideo() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const videoUrl = queryParams.get("url");

  return (
    <div className="flex items-center justify-center min-h-screen bg-lightdark bg-hero-pattern bg-cover bg-no-repeat bg-center">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-xl w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Video Preview
        </h2>
        <div className="w-full aspect-w-16 aspect-h-9 shadow-md">
          <video className="rounded-lg w-full" controls autoPlay>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}

export default QRVideo;
