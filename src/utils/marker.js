const { MarkerModule, Package } = ARjsStudioBackend;

window.assetParam = {
  scale: 1.0,
  size: {
    width: 1.0,
    height: 1.0,
    depth: 1.0,
  },
};

/**
 * Initialize the default marker image on page load.
 */
const setDefaultMarker = () => {
  const c = document.createElement("canvas");
  const img = document.querySelector(".default-marker-hidden");
  c.height = img.naturalHeight;
  c.width = img.naturalWidth;
  const ctx = c.getContext("2d");

  ctx.drawImage(img, 0, 0, c.width, c.height);
  const base64String = c.toDataURL();
  window.markerImage = base64String;

  MarkerModule.getFullMarkerImage(base64String, 0.5, 512, "black").then(
    (fullMarkerImage) => {
      window.fullMarkerImage = fullMarkerImage;
      img.remove();
    }
  );
};

const checkUserUploadStatus = () => {
  enablePageFooter(window.markerImage && window.assetFile);
};
