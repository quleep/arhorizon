import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);
  const urlParams = new URLSearchParams(window.location.search);
  const paramValue = urlParams.get("");
  console.log(paramValue); // Output: "dcd"
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request using Axios
        const response = await axios.get(
          `https://3ef9gn5kk2.execute-api.ap-south-1.amazonaws.com/arnxt_prod/ar-horizon/uploadtargetimage?id=${paramValue}`
        );
        console.log(response.data);
        // Set the response data in state
        setResponseData(response.data);
        setLoading(false);
      } catch (error) {
        // Handle errors
        console.error("Error fetching data:", error);
        setError("Error fetching data");
        setLoading(false);
      }
    };

    // Call the fetchData function
    fetchData();
  }, [paramValue]);
  return (
    <>
      {responseData && (
        <a-scene
          vr-mode-ui="enabled: false;"
          loading-screen="enabled: false;"
          renderer="logarithmicDepthBuffer: true;"
          arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false;"
          id="scene"
          embedded
          gesture-detector>
          <a-assets>
            <a-entity
              id="animated-asset"
              src={responseData.TargetGlbFile}></a-entity>
          </a-assets>

          <a-marker
            id="animated-marker"
            type="pattern"
            preset="custom"
            url={responseData.TargetImagePattFile}
            raycaster="objects: .clickable"
            emitevents="true"
            cursor="fuse: false; rayOrigin: mouse;">
            <a-entity
              id="bowser-model"
              scale="2.078150572818595 2.078150572818595 2.078150572818595"
              animation-mixer1="loop: repeat"
              gltf-model="#animated-asset"
              class="clickable"
              gesture-handler></a-entity>
          </a-marker>

          <a-entity camera></a-entity>
        </a-scene>
      )}
    </>
  );
}

export default App;
