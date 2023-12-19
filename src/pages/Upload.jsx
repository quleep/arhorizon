import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
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

function Upload() {
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
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const handleOpen = () => setOpen(!open);
  const handleOpen1 = () => setOpen1(!open1);
  const handleOpen2 = () => setOpen2(!open2);

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
  return (
    <div class="pages-content">
      <div class="pages-content-container">
        <div class="pages-content-element">
          <p class="title">Marker-based</p>
          <p class="paragraph">
            A marker-based AR experience uses a black and white image to anchor
            the AR content. Your scene will appear when the marker is in the
            field of view of your camera.
          </p>
          <p class="paragraph">
            You can print a paper version of your marker (which we recommend),
            or display it on a screen.
          </p>
        </div>
      </div>
      <hr className="my-6" />
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
            <div id="selectedCampaignDiv" class="hiddenCampaign">
              Campaign Name: <span id="selectedCampaignValue"></span>
            </div>
          </div>
        </div>
      </div>
      <hr />

      <Dialog open={open1} handler={handleOpen1}>
        <DialogBody>
          <div style={{ display: "flex", flexDirection: "column", gap: "2em" }}>
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
            <img
              src="./public/assets/default-marker.png"
              alt="Default marker png"
            />
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
                href="./public/assets/default-marker.png"
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
          <div className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card cursor-pointer transition hover:scale-105 ease-in-out duration-300">
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

      <Dialog open={open} handler={handleOpen} size={"lg"}>
        <DialogBody>
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
                          Select a 3D Model
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
                          Select a Video
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
          <p class="lead">4. Publish the project</p>
          <a class="button2" rel="noopener" onClick={handleOpen2}>
            Add Coupon
          </a>
          <div id="selectedDiscountDiv" class="hidden">
            Selected Discount: <span id="selectedDiscountValue"></span> Coupon
            Code: <span id="selectedCouponCodeValue"></span>
          </div>
        </div>

        <div class="buttons">
          <button
            id="github-publish"
            class="primary-button publish-disabled"
            onclick="publish()">
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
                />
              </div>
              <div class="coupon-code-container">
                <label for="couponCode" class="lead">
                  Discount
                </label>

                <div class="select">
                  <select name="format" id="format">
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
    </div>
  );
}

export default Upload;
