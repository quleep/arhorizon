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

function VideoUpload() {
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
  const videouploadurl =
    "https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/arhorizonvideocontentupload";
  const imageuploadurl =
    "https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/arhorizonimagefileupload";
  const submitformurl =
    "https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/submitformvideoarhorizon";

  const [videofile, setVideoFile] = useState();
  const [imagefile, setImageFile] = useState();
  const [mindFile, setMindFile] = useState(null);

  const [formdata, setFormData] = useState({
    imagefile: "",
  });
  const handleUploadMindFile = (e) => {
    const file = e.target.files[0];
    setMindFile(file);
  };
  const handleSubmitMindFile = async () => {
    try {
      if (!mindFile) {
        console.error("No mind file selected.");
        return;
      }
      console.log(mindFile);

      // Assuming you're using FormData to upload files
      const formData = new FormData();
      formData.append("markerPattern", mindFile);
      const readAsDataURL = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      };

      const base64Content = await readAsDataURL(mindFile);
      const uploadFormData = new FormData();
      uploadFormData.append(
        `markerPattern${now.getTime().toString()}`,
        base64Content
      );
      const uploadResponse = await axios.post(
        "https://gsrhol3xd0.execute-api.ap-south-1.amazonaws.com/prod/file-upload-mindfile",
        uploadFormData
      );

      const uploadedFileUrl = uploadResponse.data.fileUrl;
      console.log(uploadedFileUrl);
      return uploadedFileUrl;
    } catch (error) {
      console.error("Error uploading mind file:", error);
    }
  };
  const handleDiscountChange = (e) => {
    let inputDiscount = e.target.value;

    // Ensure the input is a valid number
    if (inputDiscount === "" || isNaN(inputDiscount)) {
      // If the input is empty or not a number, set it to an empty string
      setDiscount("");
    } else {
      // Otherwise, ensure the input is less than 100
      const clampedDiscount = Math.min(parseFloat(inputDiscount), 100);
      setDiscount(clampedDiscount);
    }
  };
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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCampaignNameChange = (event) => {
    setCampaignName(event.target.value);
  };

  const publish = async () => {
    if (!campaignName) return alert("Please, add Campaign Name.");
    if (!selectedGlb) return alert("Please, Select 3D Model.");
    const user = localStorage.getItem("user");
    setLoading(true); // Set loading to true when starting the async operation

    try {
      const newApplicant = {
        Id: now.getTime().toString(),
        AR_Link: `https://arhorizon.in/tap_to_place/index.html?id=${now
          .getTime()
          .toString()}`,

        TargetGlbFile: selectedGlb,
        couponCode: couponCode,
        discountPercentage: discount,
        campaignName: campaignName,
        email: user,
        TargetImageFile: selectedModel.animationimage,
        tapToPlace: "yes",
      };
      const applicantResponse = await axios.post(
        "https://3ef9gn5kk2.execute-api.ap-south-1.amazonaws.com/arnxt_prod/ar-horizon/uploadtargetimage",
        newApplicant
      );
      setQRCode(
        `https://arhorizon.in/tap_to_place/index.html?id=${applicantResponse.data.Item.Id}`
      );
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false); // Set loading to false after the async operation completes (success or error)
    }
    handleOpen3();
  };

  const handleuploadvideofile = (e) => {
    // let val= document.getElementById(`imagefile_${len}`).value;

    // let indx = val.lastIndexOf(".") + 1;
    // let filetype = val.substr(indx, val.length).toLowerCase();

    let files = Array.from(e.target.files);

    files.forEach((file) => {
      setVideoFile(file);

      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleuploadimagefile = (e) => {
    let val = document.getElementById(`imagefile`).value;

    let indx = val.lastIndexOf(".") + 1;
    let filetype = val.substr(indx, val.length).toLowerCase();

    let files = Array.from(e.target.files);

    files.forEach((file) => {
      setImageFile(file);

      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
        }
      };

      reader.readAsDataURL(file);
    });
  };
  const handlesubmitimagefile = async () => {
    try {
      const url = imageuploadurl;
      const response = await fetch(url, {
        method: "POST",
        body: imagefile.name,
      });
      const data = await response.json();

      const uploadResponse = await fetch(data.uploadURL, {
        method: "PUT",
        headers: {
          "Content-Type": "image/jpeg",
        },
        body: imagefile,
      });

      if (uploadResponse.status === 200) {
        let resnew = uploadResponse.url.split("?");
        let imgurl = resnew[0];
        const returndata = {
          item: imgurl,
          res: true,
        };
        return returndata;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handlesubmitvideo = async () => {
    try {
      const url = videouploadurl;
      const response = await fetch(url, {
        method: "POST",
        body: videofile.name,
      });
      const data = await response.json();

      const uploadResponse = await fetch(data.uploadURL, {
        method: "PUT",
        headers: {
          "Content-Type": "video/mp4",
        },
        body: videofile,
      });

      if (uploadResponse.status === 200) {
        let resnew = uploadResponse.url.split("?");
        let imgurl = resnew[0];

        const returndata = {
          item: imgurl,
          res: true,
        };
        return returndata;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handleinputchange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formdata,
      [name]: value,
    });
  };

  console.log(formdata);

  const handlesubmit = async () => {
    const imageres = await handlesubmitimagefile();

    const videores = await handlesubmitvideo();
    const mindfile = await handleSubmitMindFile();
    console.log(mindfile);
    if (imageres.res && videores.res) {
      const body = {
        Id: new Date().getTime().toString(),
        TargetImageFile: imageres.item,
        videofile: videores.item,
        campaignName: formdata.brandname,
        mindfile: mindfile,
        AR_Link: `https://arhorizon.in/arvideo/index.html?id=${now
          .getTime()
          .toString()}`,
        regtime: new Date().getTime(),
      };

      try {
        const response = await axios.post(submitformurl, body).then((res) => {
          console.log(res);
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div>
      <Navbar />
      <div class="pages-content bg-blue-gray-50 mt-24">
        {" "}
        <div>
          <label>Name</label>
          <input name="brandname" onChange={handleinputchange} />
          <input type="file" accept=".mind" onChange={handleUploadMindFile} />
          <label>Imagefile</label>
          <input onChange={handleuploadimagefile} id="imagefile" type="file" />
          <label>video file</label>
          <input type="file" onChange={handleuploadvideofile} />

          <button onClick={handlesubmit}>submit</button>
        </div>
      </div>
    </div>
  );
}

export default VideoUpload;
