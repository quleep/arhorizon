import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components";
import toast, { Toaster } from "react-hot-toast";
import { Spinner } from "@material-tailwind/react";

function VideoUpload() {
  const navigate = useNavigate();
  const [model, setModel] = useState(null);
  const [videofile, setVideoFile] = useState(null);
  const [imagefile, setImageFile] = useState(null);
  const [mindFile, setMindFile] = useState(null);
  const [formdata, setFormData] = useState({
    brandname: "",
  });
  const [loading, setLoading] = useState(false);

  const videouploadurl =
    "https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/arhorizonvideocontentupload";
  const imageuploadurl =
    "https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/arhorizonimagefileupload";
  const submitformurl =
    "https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/submitformvideoarhorizon";

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
        toast.error("Error fetching data.");
      }
    };

    fetchData();
  }, []);

  const handleUploadMindFile = (e) => {
    const file = e.target.files[0];
    setMindFile(file);
  };

  const handleSubmitMindFile = async () => {
    try {
      if (!mindFile) {
        toast.error("No mind file selected.");
        return null;
      }

      const formData = new FormData();
      formData.append("markerPattern", mindFile);

      const response = await axios.post(
        "https://gsrhol3xd0.execute-api.ap-south-1.amazonaws.com/prod/file-upload-mindfile",
        formData
      );

      return response.data.response.fileUrl;
    } catch (error) {
      toast.error("Error uploading mind file.");
      return null;
    }
  };

  const handleUploadVideoFile = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleUploadImageFile = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmitImageFile = async () => {
    try {
      const url = imageuploadurl;
      const response = await axios.post(url, { filename: imagefile.name });
      await axios.put(response.data.uploadURL, imagefile, {
        headers: {
          "Content-Type": "image/jpeg",
        },
      });
      return response.data.uploadURL.split("?")[0];
    } catch (error) {
      toast.error("Error uploading image file.");
      return null;
    }
  };

  const handleSubmitVideoFile = async () => {
    try {
      const url = videouploadurl;
      const response = await axios.post(url, { filename: videofile.name });
      await axios.put(response.data.uploadURL, videofile, {
        headers: {
          "Content-Type": "video/mp4",
        },
      });
      return response.data.uploadURL.split("?")[0];
    } catch (error) {
      toast.error("Error uploading video file.");
      return null;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formdata,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const imageres = await handleSubmitImageFile();
    const videores = await handleSubmitVideoFile();
    const mindfileUrl = await handleSubmitMindFile();
    const user = localStorage.getItem("user");

    if (imageres && videores && mindfileUrl) {
      const now = new Date();
      const body = {
        Id: now.getTime().toString(),
        TargetImageFile: imageres,
        videofile: videores,
        campaignName: formdata.brandname,
        mindfile: mindfileUrl,
        AR_Link: `https://arhorizon.in/arvideo/${now.getTime().toString()}`,
        regtime: now.getTime(),
        qr_code: "yes",
        email: user,
      };

      try {
        await axios.post(submitformurl, body);
        toast.success("Campaign submitted successfully.");
      } catch (error) {
        toast.error("Error submitting campaign.");
      }
    } else {
      toast.error("Error uploading files.");
    }
    setLoading(false);
  };

  return (
    <div>
      <Navbar />
      <Toaster />
      <div className="pages-content bg-blue-gray-50 mt-24 p-6 min-h-screen flex items-center justify-center">
        <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-6 text-center text-indigo-600">
            Upload Your Campaign
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                name="brandname"
                onChange={handleInputChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-2"
                placeholder="Enter brand name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mind file
              </label>
              <input
                type="file"
                accept=".mind"
                onChange={handleUploadMindFile}
                className="w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image file
              </label>
              <input
                onChange={handleUploadImageFile}
                id="imagefile"
                type="file"
                className="w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Video file
              </label>
              <input
                type="file"
                onChange={handleUploadVideoFile}
                className="w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none p-2"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300"
              disabled={loading}>
              {loading ? <Spinner className="h-5 w-5 mx-auto" /> : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoUpload;
