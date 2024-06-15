import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components";

function VideoUpload() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [campaignName, setCampaignName] = useState("");
  const [mindFile, setMindFile] = useState(null);
  const [imagefile, setImageFile] = useState(null);
  const [videofile, setVideoFile] = useState(null);
  const [formdata, setFormData] = useState({ brandname: "" });

  const handleSubmit = async () => {
    setLoading(true); // Set loading state to true
    try {
      const imageres = await handlesubmitimagefile();
      const videores = await handlesubmitvideo();
      const mindfile = await handleSubmitMindFile();

      if (imageres.res && videores.res) {
        const body = {
          Id: new Date().getTime().toString(),
          TargetImageFile: imageres.item,
          videofile: videores.item,
          campaignName: formdata.brandname,
          mindfile: mindfile,
          AR_Link: `https://arhorizon.in/arvideo/index.html?id=${new Date()
            .getTime()
            .toString()}`,
          regtime: new Date().getTime(),
        };

        const response = await axios.post(submitformurl, body);
        console.log(response);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false); // Set loading state to false after submission
    }
  };

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

      const formData = new FormData();
      formData.append("markerPattern", mindFile);

      const uploadResponse = await axios.post(
        "https://gsrhol3xd0.execute-api.ap-south-1.amazonaws.com/prod/file-upload-mindfile",
        formData
      );

      const uploadedFileUrl = uploadResponse.data.response.fileUrl;
      console.log(uploadedFileUrl);
      return uploadedFileUrl;
    } catch (error) {
      console.error("Error uploading mind file:", error);
    }
  };

  const handleuploadimagefile = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handlesubmitimagefile = async () => {
    try {
      const formData = new FormData();
      formData.append("file", imagefile);

      const response = await axios.post(imageuploadurl, formData);
      const uploadResponse = await axios.put(
        response.data.uploadURL,
        imagefile,
        {
          headers: { "Content-Type": "image/jpeg" },
        }
      );

      if (uploadResponse.status === 200) {
        const imgurl = uploadResponse.config.url.split("?")[0];
        return { item: imgurl, res: true };
      }
    } catch (error) {
      console.error("Error uploading image file:", error);
      return { res: false };
    }
  };

  const handleuploadvideofile = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
  };

  const handlesubmitvideo = async () => {
    try {
      const formData = new FormData();
      formData.append("file", videofile);

      const response = await axios.post(videouploadurl, formData);
      const uploadResponse = await axios.put(
        response.data.uploadURL,
        videofile,
        {
          headers: { "Content-Type": "video/mp4" },
        }
      );

      if (uploadResponse.status === 200) {
        const videourl = uploadResponse.config.url.split("?")[0];
        return { item: videourl, res: true };
      }
    } catch (error) {
      console.error("Error uploading video file:", error);
      return { res: false };
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formdata, [name]: value });
  };

  useEffect(() => {
    const userInfo = localStorage.getItem("user");
    if (!userInfo) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12 mt-20">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                  Upload Your Video
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="flex flex-col">
                    <label htmlFor="brandname" className="leading-loose">
                      Name
                    </label>
                    <input
                      type="text"
                      id="brandname"
                      name="brandname"
                      onChange={handleInputChange}
                      className="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="mindfile" className="leading-loose">
                      Mind File (.mind)
                    </label>
                    <input
                      type="file"
                      id="mindfile"
                      accept=".mind"
                      onChange={handleUploadMindFile}
                      className="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="imagefile" className="leading-loose">
                      Image File
                    </label>
                    <input
                      type="file"
                      id="imagefile"
                      onChange={handleuploadimagefile}
                      className="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="videofile" className="leading-loose">
                      Video File
                    </label>
                    <input
                      type="file"
                      id="videofile"
                      onChange={handleuploadvideofile}
                      className="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded"
                    />
                  </div>
                  <div className="flex justify-center">
                    <button
                      onClick={handleSubmit}
                      className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={loading}>
                      {loading ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoUpload;
