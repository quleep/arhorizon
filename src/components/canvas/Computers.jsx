import React, { Suspense, useEffect, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Preload, Stage, useGLTF } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  // Move the useLoader hook call inside the Computers component
  const computer = useLoader(
    GLTFLoader,
    "https://res.cloudinary.com/dd3c4j1sm/image/upload/v1703659500/dron_explorer_001_nkwtue.glb"
  );

  return (
    <mesh>
      <Stage environment="city" intensity={0.5} castShadow={false}>
        <primitive
          object={computer.scene}
          scale={isMobile ? 1.3 : 2}
          position={isMobile ? [0.5, -1, 5] : [-2, -1, 5]}
          rotation={[-0.01, -1.5, 0]}
        />
      </Stage>
    </mesh>
  );
};
const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}>
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} />

        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
