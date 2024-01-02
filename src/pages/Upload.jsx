import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import QRCode from "react-qr-code";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import Tilt from "react-tilt";
import { TbAugmentedReality } from "react-icons/tb";
import { FaVideo } from "react-icons/fa";
import { MdAudiotrack } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components";

function Upload() {
  const { MarkerModule, Package } = ARjsStudioBackend;

  const data = [
    {
      label: "3D Model",
      value: "model",
      icon: TbAugmentedReality,
      desc: `It really matters and then like it really doesn't matter.
      What matters is the people who are sparked by it. And the people
      who are like offended by it, it doesn't matter.`,
    },
    {
      label: "Video",
      value: "video",
      icon: FaVideo,

      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },
    {
      label: "Audio",
      value: "audio",
      icon: MdAudiotrack,

      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
  ];
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedModel, setSelectedModel] = useState(null);

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);

  const [model, setModel] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [campaignName, setCampaignName] = useState("");
  const [pattFile, setPattFile] = useState(null);
  const [selectedGlb, setSelectedGlb] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [qrcode, setQRCode] = useState("");

  const now = new Date();

  const handleOpen = () => setOpen(!open);
  const handleOpen1 = () => setOpen1(!open1);
  const handleOpen2 = () => setOpen2(!open2);
  const handleOpen3 = () => setOpen3(!open3);

  useEffect(() => {
    const userInfo = localStorage.getItem("user");
    if (!userInfo) {
      // User is not authenticated, redirect to login
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/getarhorizondata"
        );

        setModel(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleItemClick = (item) => {
    // Perform actions with the selected item's Id
    setSelectedModel(item);

    setSelectedGlb(item.animationglb);
  };
  const handleCampaignNameChange = (event) => {
    setCampaignName(event.target.value);
    console.log(event.target.value);
  };
  const handle3DModelUpload = (event) => {
    const file = event.target.files[0];
    window.assetType = getFileType(file); // set the assetType according to the file extension.
    window.assetParam.scale = 1.0;
    window.assetParam.size = { width: 1.0, height: 1.0, depth: 1.0 };
    console.log(window.assetType);

    if (isValidFile(window.assetType, file, "content-error")) {
      switch (window.assetType) {
        case "image":
          handleImageUpload(file);
          break;
        case "audio":
          handleAudioUpload(file);
          break;
        case "video":
          handleVideoUpload(file);
          break;
        case "3d":
          handleModelUpload(file);
          break;
      }
    }
    event.target.value = ""; // Reset required for re-upload
  };
  function handleImageUpload(file) {
    const fileName = file.name;
    const fileURL = URL.createObjectURL(file);
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = function () {
      window.assetFile = reader.result.split(",")[1];
      window.assetName = file.type.replace("image/", "asset.");
      checkUserUploadStatus();
    };

    let preview = document.getElementById("content-preview");
    preview.innerHTML = previewImageTemplate(fileURL, fileName);
  }

  function handleAudioUpload(file) {
    const fileName = file.name;
    const fileURL = URL.createObjectURL(file);
    const reader = new FileReader();

    reader.readAsArrayBuffer(file);
    reader.onloadend = function () {
      //for backend api asset needs only base64 part
      window.assetFile = Array.from(new Uint8Array(reader.result));
      console.log(window.assetFile);
      window.assetName = file.type.replace("audio/", "asset.");
      checkUserUploadStatus();
    };

    let preview = document.getElementById("content-preview");
    preview.innerHTML = previewAudioTemplate(fileURL, fileName);
  }

  function handleVideoUpload(file) {
    const fileName = file.name;
    const fileURL = URL.createObjectURL(file);
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = function () {
      //for backend api asset needs only base64 part
      window.assetFile = Array.from(new Uint8Array(reader.result));
      console.log(window.assetFile);
      window.assetName = file.type.replace("video/", "asset.");
      checkUserUploadStatus();
    };
    let preview = document.getElementById("content-preview");
    preview.innerHTML = previewVideoTemplate(fileURL, fileName);

    var video = document.querySelector("#video");
    video.addEventListener("canplay", () => {
      if (video.videoWidth > video.videoHeight) {
        video.style.width = "100%";
      } else {
        video.style.height = "100%";
      }

      window.assetParam.size = {
        width: video.videoWidth,
        height: video.videoHeight,
      };

      video.parentElement.style.backgroundColor = "black";
      document.querySelector("#videoFrame").style.opacity = 1;
    });
  }

  function handleModelUpload(file) {
    let fileType = file.name.split(".").slice(-1)[0];
    if (fileType === "glb") {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function () {
        //for backend api asset needs only base64 part
        window.assetFile = reader.result.split(",")[1];
        window.assetName = "asset.glb";
        console.log(window.assetFile);
        checkUserUploadStatus();
        let preview = document.getElementById("content-preview");
        preview.innerHTML = previewModelTemplate(reader.result, file.name);
      };
    } else if (fileType === "gltf") {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onloadend = function () {
        const previewError = document.getElementById("content-error");
        try {
          let gltf = JSON.parse(reader.result);
          let buffers = gltf.buffers || [];
          let images = gltf.images || [];
          let uri;

          for (let i = 0; i < buffers.length; i++) {
            uri = buffers[i].uri;
            if (!reg4Base64.test(uri)) {
              // need a related file: data:application/octet-stream;base64,
              previewError.innerHTML =
                '*Please pack all related files to zip file and try again, consult <a class="link" target="_blank" href="https://github.com/AR-js-org/studio/blob/master/how-to-upload-gltf.md">this guide on uploading gltf.</a>';

              return;
            }
          }
          for (let i = 0; i < images.length; i++) {
            uri = images[i].uri;
            if (!reg4Base64.test(uri)) {
              // need a related file
              previewError.innerHTML =
                '*Please pack all related files to zip file and try again, consult <a class="link" target="_blank" href="https://github.com/AR-js-org/studio/blob/master/how-to-upload-gltf.md">this guide on uploading gltf.</a>';
              return;
            }
          }
          // need to load again
          const reader2 = new FileReader();
          reader2.readAsDataURL(file);
          reader2.onloadend = function () {
            //for backend api asset needs only base64 part
            window.assetFile = reader2.result.split(",")[1];
            window.assetName = "asset.gltf";
            checkUserUploadStatus();
            let preview = document.getElementById("content-preview");
            preview.innerHTML = previewModelTemplate(reader2.result, file.name);
          };
        } catch (error) {
          previewError.innerHTML = "*The gltf file is corrupted.";
          return;
        }
      };
    } else if (fileType == "zip") {
      handleZip(file, (err, result) => {
        if (err) {
          const previewError = document.getElementById("content-error");
          previewError.innerHTML =
            err === true ? "*Please check the zip file is correct" : err;
          return;
        }
        window.assetFile = result.split(",")[1];
        window.assetName = "asset.gltf";
        checkUserUploadStatus();
        let preview = document.getElementById("content-preview");
        preview.innerHTML = previewModelTemplate(result, file.name);
      });
    }
  }
  function handleMarkerUpload(event) {
    const file = event.target.files[0];
    console.log(event);

    if (!isValidFile("image", file, "marker-error")) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      const base64Data = reader.result;
      window.markerImage = base64Data;
      setPattFile(base64Data);
      MarkerModule.getFullMarkerImage(base64Data, 0.5, 512, "black").then(
        (fullMarkerImage) => {
          window.fullMarkerImage = fullMarkerImage;
          const blob = dataURItoBlob(fullMarkerImage);
          const fileURL = URL.createObjectURL(blob);

          const preview = document.getElementById("marker-preview");
          preview.innerHTML = previewImageTemplate(fileURL, file.name, true);
          checkUserUploadStatus();
        }
      );
    };
    event.target.value = ""; // Reset required for re-upload
  }
  const publish = async () => {
    if (!campaignName) return alert("Please, add Campaign Name.");
    if (!pattFile) return alert("Please, Select Marker Image.");
    if (!selectedGlb) return alert("Please, Select 3D Model.");
    const user = localStorage.getItem("user");
    setLoading(true); // Set loading to true when starting the async operation

    try {
      const markerPattern = await MarkerModule.getMarkerPattern(pattFile);
      const blob = new Blob([markerPattern], { type: "text/plain" });
      const file = new File([blob], "marker.patt", {
        type: "text/plain",
      });

      const formData = new FormData();
      formData.append("markerPattern", file);

      const readAsDataURL = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      };

      const base64Content = await readAsDataURL(file);
      const uploadFormData = new FormData();
      const uploadFormData1 = new FormData();

      uploadFormData.append(
        `markerPattern${now.getTime().toString()}`,
        base64Content
      );
      uploadFormData1.append(
        `markerImagw${now.getTime().toString()}`,
        window.fullMarkerImage
      );
      const uploadResponse = await axios.post(
        "https://gsrhol3xd0.execute-api.ap-south-1.amazonaws.com/prod/file-upload",
        uploadFormData
      );
      const uploadedFileUrl = uploadResponse.data.fileUrl;
      const uploadImageResponse = await axios.post(
        "https://gsrhol3xd0.execute-api.ap-south-1.amazonaws.com/prod/image-upload",
        uploadFormData1
      );
      const uploadedImageUrl = uploadImageResponse.data.fileUrl;
      const newApplicant = {
        Id: now.getTime().toString(),
        TargetImagePattFile: uploadedFileUrl,
        TargetImageFile: uploadedImageUrl,
        AR_Link: `https://arhorizon.arnxt.com/ar/index.html?id=${now
          .getTime()
          .toString()}`,

        TargetGlbFile: selectedGlb,
        couponCode: couponCode,
        discountPercentage: discount,
        campaignName: campaignName,
        email: user,
      };
      const applicantResponse = await axios.post(
        "https://3ef9gn5kk2.execute-api.ap-south-1.amazonaws.com/arnxt_prod/ar-horizon/uploadtargetimage",
        newApplicant
      );
      console.log(applicantResponse);
      console.log(applicantResponse.data.Item.Id);
      setQRCode(
        `https://arhorizon.arnxt.com/ar/index.html?id=${applicantResponse.data.Item.Id}`
      );
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false); // Set loading to false after the async operation completes (success or error)
    }
    handleOpen3();
  };
  const supportedFileMap = {
    "3d": {
      types: ["gltf", "glb", "zip"],
      maxSize: 50 * 1024 * 1024,
      maxSizeText: "50MB",
    },
    image: {
      types: ["image/png", "image/jpeg", "image/jpg", "image/gif"],
      maxSize: 15 * 1024 * 1024,
      maxSizeText: "15MB",
    },
    audio: {
      types: ["audio/wav", "audio/mp3"],
      maxSize: 10 * 1024 * 1024,
      maxSizeText: "10MB",
    },
    video: {
      types: ["video/mp4"],
      maxSize: 25 * 1024 * 1024,
      maxSizeText: "25MB",
    },
  };

  function getFileType(file) {
    let type = file.name.split(".").pop().toLocaleLowerCase();

    if (supportedFileMap["3d"].types.indexOf(type) > -1) return "3d";
    if (supportedFileMap["image"].types.indexOf("image/" + type) > -1)
      return "image";
    if (supportedFileMap["audio"].types.indexOf("audio/" + type) > -1)
      return "audio";
    if (supportedFileMap["video"].types.indexOf("video/" + type) > -1)
      return "video";
  }

  function isValidFile(type, file, errorId) {
    const supportedFile = supportedFileMap[type];
    const previewError = document.getElementById(errorId);

    if (!type || !isValidFileType(type, file)) {
      previewError.innerHTML = "*Please select a supported file listed above.";
      return false;
    }
    if (!isValidFileSize(type, file)) {
      previewError.innerHTML = `*The file is too large. Max size is ${supportedFile.maxSizeText}.`;
      return false;
    }
    if (!isValidFileExt(type, file)) {
      previewError.innerHTML = `*The file is not supported. Supported file types are ${supportedFile.types.join(
        ", "
      )}.`;
      return false;
    }

    previewError.innerHTML = "";
    return true;
  }

  /** Checks whether file is uploaded and its type exists in the supportedFileMap. */
  function isValidFileType(type, file) {
    const supportedFile = supportedFileMap[type];
    return supportedFile && file;
  }

  /** Checks whether file size is correct based on its type. */
  function isValidFileSize(type, file) {
    const supportedFile = supportedFileMap[type];
    return file.size < supportedFile.maxSize;
  }

  /** Checks whether file extention is correct based on its type. */
  function isValidFileExt(type, file) {
    const supportedFile = supportedFileMap[type];
    const fileType =
      type === "3d" ? file.name.split(".").slice(-1)[0] : file.type;
    return supportedFile.types.includes(fileType);
  }

  function dataURItoBlob(dataURI) {
    const mime = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const binary = atob(dataURI.split(",")[1]);
    let array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: mime });
  }
  const unloadFileStyle = `
    .crossmark {
        vertical-align: middle;
        font-size: 2.25em;
    }
    .download-marker {
        display: flex;
    }
    .download-marker span {
        display: flex;
        padding: 0.25em 0em;
    }
    .filename {
        vertical-align: middle;
        font-style: italic;
        font-weight: bold;
        font-size: 18px;
    }`;
  const previewImageStyle = `
    .imageFrame {
        display: flex;
        position:relative;
        width: 23.75em;
        height: 23.75em;
        object-fit: contain;
        font-size: 1.25em;
        text-align: center;
    }
    #marker-preview .imageFrame {
        border: 1px solid black;
    }
    img {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        max-width: 100%;
        max-height: 100%;
    }
    .filename-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
    }`;

  const previewAudioStyle = `
    .audioFrame {
        width: 23.75em;
        height: 23.75em;
        object-fit: contain;
        font-size: 1.25em;
        text-align: center;
        border: 1px solid var(--passive-color-dark);
    }
    audio {
        width: 18em;
        height: 3em;
        margin-left: 3em;
        margin-top: 8em;
    }
    .filename-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
    }`;

  const previewVideoStyle = `
    .videoFrame {
        width: 23.75em;
        height: 23.75em;
        display: flex;
        flex-direction: column;
        justify-content: center;
        object-fit: contain;
        font-size: 1.25em;
        text-align: center;
        border: 1px solid var(--passive-color-dark);
    }
    .filename-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
    }
    .remove-marker {
        display: flex;
        align-items: center;
    }
    video {
        object-fit: cover;
    }`;

  const previewModelStyle = `
    .modelFrame {
        width: 23.75em;
        height: 23.75em;
        object-fit: contain;
        font-size: 1.25em;
        text-align: center;
    }
    .filename-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
    }`;

  const unloadFileTemplate = (fileName, fileURL) => `
    <div class="filename-container">
        <div class="remove-marker">
            <span class="crossmark" onclick="handleUnload(this)">&times;</span>
            <span class="filename">Remove</span>
        </div>
    </div>`;

  const unloadMarkerTemplate = (fileName, fileURL) => `
    <div class="filename-container">
        <div class="remove-marker">
            <span class="crossmark" onclick="handleUnload(this, true)">&times;</span>
            <span class="filename">Remove</span>
        </div>
        <div class="download-marker">
            <span>
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none">
                    <path d="M16.5 8L15.09 6.59L9.5 12.17V0H7.5V12.17L1.92 6.58L0.5 8L8.5 16L16.5 8Z" fill="black"/>
                </svg>
            </span>
            <a class="filename" style="text-decoration: none; color: black;" href="${fileURL}" download>Download marker</button>
        </div>
    </div>`;

  /**
   *
   * @param {string} fileURL
   * @param {string} fileName
   * @param {boolean} isMarker
   */
  const previewImageTemplate = (fileURL, fileName, isMarker) => `
    <style>
        ${previewImageStyle}
        ${unloadFileStyle}
    </style>

    <div class="imageFrame">
        <img id="img" src=${fileURL} alt="${fileName}">
    </div>
    ${
      isMarker
        ? unloadMarkerTemplate(fileName, fileURL)
        : unloadFileTemplate(fileName, fileURL)
    }`;

  const previewAudioTemplate = (fileURL, fileName) => `
    <style>
        ${previewAudioStyle}
        ${unloadFileStyle}
    </style>
    <div class="audioFrame">
        <audio controls src=${fileURL} alt="${fileName}"></audio>
    </div>
    ${unloadFileTemplate(fileName, fileURL)}`;

  const previewVideoTemplate = (fileURL, fileName) => `
    <style>
        ${previewVideoStyle}
        ${unloadFileStyle}
    </style>
    <div id="videoFrame" class="videoFrame" style="opacity:0">
        <video id="video" controls src=${fileURL} alt="${fileName}"></video>
    </div>
    ${unloadFileTemplate(fileName, fileURL)}`;

  const previewModelTemplate = (fileURL, fileName) => `
    <style>
        ${previewModelStyle}
        ${unloadFileStyle}
    </style>
    <div class="modelFrame" id="modelFrame">
        <a-scene
            renderer="logarithmicDepthBuffer: true;"
            embedded
            loading-screen="enabled: false;"
            vr-mode-ui="enabled: false">
            <a-assets>
                <a-asset-item id="model" src="${fileURL}"></a-asset-item>
            </a-assets>

            <a-entity position="0 0.9 -2">
                <a-entity animation-mixer="loop: repeat" model-controller="target:#modelFrame" gltf-model="#model"></a-entity>
            </a-entity>

            <a-sky color="#ECECEC"></a-sky>
            <a-entity camera position="0 1 0">
            </a-entity>
        </a-scene>
    </div>
    ${unloadFileTemplate(fileName, fileURL)}`;
  return (
    <div>
      <Navbar />
      <div class="pages-content bg-blue-gray-50 mt-12">
        <div class="pages-content-container">
          <div class="pages-content-element">
            <p class="title">Marker-based</p>
            <p class="paragraph">
              A marker-based AR experience uses a black and white image to
              anchor the AR content. Your scene will appear when the marker is
              in the field of view of your camera.
            </p>
            <p class="paragraph">
              You can print a paper version of your marker (which we recommend),
              or display it on a screen.
            </p>
          </div>
        </div>
        <hr className="my-6" style={{ color: "black" }} />
        <div class="pages-content-container">
          <div
            class="pages-content-element"
            style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
            <p class="lead">1. Add Campaign Name</p>
            <p class="paragraph">
              Create a distinctive campaign name by clicking the button below.
            </p>

            <div class="coupon-code-container">
              <a class="button2" rel="noopener" onClick={handleOpen1}>
                Add Campaign Name
              </a>
            </div>
          </div>
          {/* Display entered campaign name outside the popup */}
          {campaignName && (
            <div>
              <p className="lead bg-yellow-400">
                Entered Campaign Name: {campaignName}
              </p>
            </div>
          )}
        </div>

        <hr className="bg-black" />

        <Dialog open={open1} handler={handleOpen1}>
          <DialogBody>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "2em" }}>
              <p class="lead">Add Campaign Name</p>
              <div class="coupon-code-container">
                <label for="couponCode" class="lead">
                  Campaign Name
                </label>
                <input
                  type="text"
                  id="campaignName"
                  name="campaignName"
                  placeholder="Enter Campaign Name"
                  value={campaignName}
                  onChange={handleCampaignNameChange}
                />
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen1}
              className="mr-1">
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="green" onClick={handleOpen1}>
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
        <div className="pages-content-container mt-12">
          <div className="pages-content-element">
            <p className="lead">2. Use a premade marker or upload your own</p>
            <p className="paragraph">
              Here is a sample marker for you. Feel free to use it as the marker
              for your project. Alternatively, click “Upload image” to use a
              custom one. Not sure what makes a good marker? Check out
              <a
                className="link"
                target="_blank"
                href="https://github.com/AR-js-org/studio/blob/master/what-makes-a-good-marker.md">
                this guide
              </a>
              .
            </p>
            <label className="passive-button">
              <input
                id="marker-file"
                type="file"
                accept="image/png, image/jpeg"
                hidden
                onChange={(e) => handleMarkerUpload(e)}
              />
              Upload image
            </label>
            <p id="marker-error" className="error"></p>
          </div>
          <div id="marker-preview" target="marker-file">
            <div className="marker">
              <img src="./assets/default-marker.png" alt="Default marker png" />
            </div>
            <div
              className="download-marker"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "1em 0",
              }}>
              <div className="download-default-marker">
                <span>
                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none">
                    <path
                      d="M16.5 8L15.09 6.59L9.5 12.17V0H7.5V12.17L1.92 6.58L0.5 8L8.5 16L16.5 8Z"
                      fill="black"
                    />
                  </svg>
                </span>
                <a
                  className="filename"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    justifySelf: "flex-end",
                  }}
                  href="./assets/default-marker.png"
                  download>
                  Download marker
                </a>
              </div>
            </div>
          </div>
        </div>

        <hr />
        <p class="lead my-10">3. Choose from library</p>

        <div className="flex justify-center items-center my-20">
          <div className="xs:w-[600px] w-full" onClick={handleOpen}>
            <div className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-2xl cursor-pointer transition hover:scale-105 ease-in-out duration-300">
              <div
                options={{
                  max: 45,
                  scale: 0.1,
                  speed: 850,
                }}
                className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
                <h3 className="text-white text-[20px] font-bold text-center">
                  Select or Upload from the 3D Library
                </h3>
              </div>
            </div>
          </div>
        </div>
        {selectedModel && (
          <div className="">
            <p className="lead my-5 bg-yellow-500 max-w-fit">
              Selected 3D Model: {selectedModel.name}
            </p>
            <img
              className="w-52 h-auto rounded-md "
              src={selectedModel.animationimage}
              alt={selectedModel.name}
            />
            {/* Add additional details or actions if needed */}
          </div>
        )}
        <Dialog open={open} handler={handleOpen} size={"lg"}>
          <DialogBody>
            <Typography>
              <Tabs value="model">
                <TabsHeader>
                  {data.map(({ label, value, icon }) => (
                    <Tab key={value} value={value}>
                      <div className="flex items-center gap-2">
                        {React.createElement(icon, { className: "w-5 h-5" })}
                        {label}
                      </div>
                    </Tab>
                  ))}
                </TabsHeader>
                <TabsBody>
                  <TabPanel value="model">
                    <div class="flex flex-col items-center justify-center w-full scroll-auto">
                      <label class="flex flex-col rounded-lg border-4 border-dashed w-2/3 h-40 p-10 group text-center passive-button file-input">
                        <div class="h-full w-full text-center flex flex-col items-center justify-center ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-10 h-10 text-blue-400 group-hover:text-blue-600 "
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>

                          <p class="pointer-none text-gray-500 ">
                            <a id="" class="text-blue-600 hover:underline">
                              select a 3D Model
                            </a>{" "}
                            from your computer
                          </p>
                        </div>
                        <input
                          id="content-file"
                          accept=".glb, .gltf"
                          type="file"
                          hidden
                          onChange={handle3DModelUpload}
                        />
                      </label>
                      <div class="py-4 font-bold">OR</div>

                      <div class="grid grid-cols-4 md:grid-cols-5 gap-4 content-center">
                        {model ? (
                          model.map((item) => (
                            <div
                              key={item.Id}
                              className={`flex justify-center items-center ${
                                selectedGlb === item.animationglb
                                  ? "border-solid border-4 border-indigo-500/50 rounded-md "
                                  : ""
                              }`}
                              onClick={() => handleItemClick(item)}>
                              <img
                                class="h-auto max-w-full rounded-lg"
                                src={item.animationimage}
                                alt=""
                              />
                            </div>
                          ))
                        ) : (
                          <p></p>
                        )}
                      </div>
                    </div>
                    <p id="content-error" class="error"></p>
                  </TabPanel>
                  <TabPanel value="video">
                    <div class="flex items-center justify-center w-full px-12">
                      <label class="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center passive-button file-input">
                        <div class="h-full w-full text-center flex flex-col items-center justify-center ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-10 h-10 text-blue-400 group-hover:text-blue-600 "
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>

                          <p class="pointer-none text-gray-500 ">
                            <a id="" class="text-blue-600 hover:underline">
                              select a Video
                            </a>{" "}
                            from your computer
                          </p>
                        </div>
                        <input
                          id="content-file"
                          accept="video/*"
                          type="file"
                          hidden
                          onChange={handle3DModelUpload}
                        />
                      </label>
                    </div>
                  </TabPanel>
                  <TabPanel value="audio">
                    <div class="flex items-center justify-center w-full px-12">
                      <label class="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center passive-button file-input">
                        <div class="h-full w-full text-center flex flex-col items-center justify-center ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-10 h-10 text-blue-400 group-hover:text-blue-600 "
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>

                          <p class="pointer-none text-gray-500 ">
                            <a id="" class="text-blue-600 hover:underline">
                              Select a Audio
                            </a>{" "}
                            from your computer
                          </p>
                        </div>
                        <input
                          id="content-file"
                          accept="audio/*"
                          type="file"
                          hidden
                          onChange={handle3DModelUpload}
                        />
                      </label>
                    </div>
                  </TabPanel>
                </TabsBody>
              </Tabs>
            </Typography>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1">
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="green" onClick={handleOpen}>
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
        <hr />
        <div>
          <div class="row my-12">
            <p class="lead">4. Coupon & Discount (Optional)</p>
            <a class="button2" rel="noopener" onClick={handleOpen2}>
              Add Coupon
            </a>
          </div>
          {/* Display selected coupon code and discount outside the coupon code dialog */}
          {couponCode && discount && (
            <div>
              <p className=" my-10 bg-yellow-400 max-w-fit">
                Selected Coupon Code: {couponCode}, Discount: {discount}
              </p>
              {/* Add additional details or actions if needed */}
            </div>
          )}
          <div class="buttons py-2">
            <button
              id="github-publish"
              class="primary-button publish-disabled"
              onClick={publish}>
              Publish
            </button>
          </div>
          <Dialog open={open2} handler={handleOpen2}>
            <DialogBody>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p class="lead">Choose Coupon Code and Add Discount</p>
                <div class="coupon-code-container">
                  <label for="couponCode" class="lead">
                    Coupon Code
                  </label>
                  <input
                    type="text"
                    id="couponCode"
                    name="couponCode"
                    placeholder="Enter Coupon Code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    aria-labelledby="couponCodeLabel"
                  />
                </div>
                <div class="coupon-code-container">
                  <label for="couponCode" class="lead">
                    Discount
                  </label>

                  <div class="select">
                    <select
                      name="format"
                      id="format"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                      aria-labelledby="discountLabel">
                      <option value="5%">5%</option>
                      <option value="10%">10%</option>
                      <option value="15%">15%</option>
                      <option value="20%">20%</option>
                      <option value="25%">25%</option>
                    </select>
                  </div>
                </div>
              </div>
            </DialogBody>
            <DialogFooter>
              <Button
                variant="text"
                color="red"
                onClick={handleOpen2}
                className="mr-1">
                <span>Cancel</span>
              </Button>
              <Button variant="gradient" color="green" onClick={handleOpen2}>
                <span>Confirm</span>
              </Button>
            </DialogFooter>
          </Dialog>
        </div>
        <Dialog open={open3} handler={handleOpen3} size={"lg"}>
          <DialogBody>
            <div className="flex flex-col justify-center items-center gap-5 md:flex-row">
              <div className="flex flex-col">
                <div className="font-bold">QR Code:</div>
                <div
                  className="h-96 w-full rounded-lg object-contain object-center shadow-xl shadow-blue-gray-900/50"
                  src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                  alt="nature image">
                  <QRCode
                    size={256}
                    style={{
                      height: "100%",
                      maxWidth: "100%",
                      width: "100%",
                      padding: "1rem",
                    }}
                    value={qrcode}
                    viewBox={`0 0 256 256`}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="font-bold">Target Image:</div>
                <img
                  className="h-96 w-full rounded-lg object-contain object-center shadow-xl shadow-blue-gray-900/50"
                  src={window.fullMarkerImage}
                  alt="nature image"
                />
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen3}
              className="mr-1">
              <span>Close</span>
            </Button>
          </DialogFooter>
        </Dialog>
        {loading && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full h-full flex justify-center items-center">
            <div className="backdrop-blur-sm bg-white/30 absolute inset-0  opacity-75"></div>
            <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-8 h-64 w-64"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Upload;
