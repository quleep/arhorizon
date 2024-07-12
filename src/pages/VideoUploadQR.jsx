import React, { useEffect, useState } from "react";
import { TbAugmentedReality } from "react-icons/tb";
import { FaVideo } from "react-icons/fa";
import { MdAudiotrack } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components";

function VideoUploadQR() {
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
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
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

      const uploadedFileUrl = uploadResponse.data.response.fileUrl;
      console.log(uploadResponse.data.response.fileUrl);
      return uploadedFileUrl;
    } catch (error) {
      console.error("Error uploading mind file:", error);
    }
  };

  const handleDiscountChange = (e) => {
    let inputDiscount = e.target.value;

    if (inputDiscount === "" || isNaN(inputDiscount)) {
      setDiscount("");
    } else {
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

  const handleuploadvideofile = (e) => {
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
        Id: now.getTime().toString(),
        TargetImageFile: imageres.item,
        videofile: videores.item,
        campaignName: formdata.brandname,
        mindfile: mindfile,
        AR_Link: `https://arhorizon.in/arvideo/index.html?id=${now
          .getTime()
          .toString()}`,
        regtime: new Date().getTime(),
        qr_image: "yes",
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
      <div className="pages-content bg-blue-gray-50 mt-24 p-6">
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Upload Your Campaign</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              name="brandname"
              onChange={handleinputchange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Mind file
            </label>
            <input
              type="file"
              accept=".mind"
              onChange={handleUploadMindFile}
              className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Image file
            </label>
            <input
              onChange={handleuploadimagefile}
              id="imagefile"
              type="file"
              className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Video file
            </label>
            <input
              type="file"
              onChange={handleuploadvideofile}
              className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
            />
          </div>
          <button
            onClick={handlesubmit}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoUploadQR;
