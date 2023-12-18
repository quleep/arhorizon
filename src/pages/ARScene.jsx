import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ARScene = () => {
  const [responseData, setResponseData] = useState(null);
  const param = useParams();
  console.log(param.id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://3ef9gn5kk2.execute-api.ap-south-1.amazonaws.com/arnxt_prod/ar-horizon/uploadtargetimage?id=${param.id}`
        );
        setResponseData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Fetch data when component mounts

    return () => {
      // Cleanup or additional logic when component unmounts
    };
  }, []); // Empty dependency array to mimic componentDidMount

  useEffect(() => {
    const handleBeforeUnload = async () => {
      // Handle before unload logic
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []); // Empty dependency array to mimic componentWillUnmount

  const renderAScene = () => {
    if (responseData) {
      return (
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
          <a-assets>
            <audio
              id="sound"
              src="assets/AudioSource.mp3"
              preload="auto"></audio>
          </a-assets>
          <a-marker
            id="animated-marker"
            type="pattern"
            preset="custom"
            url={responseData.TargetImagePattFile}
            raycaster="objects: .clickable"
            emitevents="true"
            cursor="fuse: false; rayOrigin: mouse;">
            <a-box id="loadingEl" color="yellow"></a-box>

            <a-entity
              id="bowser-model"
              scale="1 1 1"
              animation-mixer="loop: repeat"
              gltf-model="#animated-asset"
              class="clickable"
              gesture-handler
              loader></a-entity>

            <a-entity
              raycaster="objects: .clickable"
              cursor="fuse: false; rayOrigin: mouse;"></a-entity>
          </a-marker>

          <a-entity camera></a-entity>
        </a-scene>
      );
    }
  };

  return <div style={{ margin: 0, overflow: "hidden" }}>{renderAScene()}</div>;
};

export default ARScene;
