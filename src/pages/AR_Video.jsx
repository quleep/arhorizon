import React, { useEffect, useState } from "react";
import Div100vh from "react-div-100vh";
import { Dialog, DialogBody } from "@material-tailwind/react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../components/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axios from "axios"; // Make sure axios is imported

function AR_Video() {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const param = useParams();
  const { setProductId } = useStateContext();

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== "https://192.168.0.108:5173") return;
      if (event.data === "openPopup") {
        setOpen(true);
      } else if (event.data === "closePopup") {
        setOpen(false);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    const markerStatus = localStorage.getItem("ArUserDetected");
    if (markerStatus === "found") {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    setProductId(param.id);
  }, [param, setProductId]);

  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const requestData = {
          Id: result.user.email,
        };
        axios
          .post(
            "https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/sendotparhorizon",
            requestData
          )
          .then((response) => {
            toast.success("Logged in successfully!", {
              position: toast.POSITION.BOTTOM_CENTER,
            });
            setOpen(false);
          })
          .catch((error) => {
            console.error("Error:", error);
            toast.error(
              "Verification failed. Please check your OTP and phone number.",
              {
                position: toast.POSITION.BOTTOM_CENTER,
              }
            );
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Login failed. Please try again.", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        setLoading(false);
      });
  };

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Div100vh>
        <Dialog open={open} handler={handleOpen}>
          <DialogBody>
            <div className="flex justify-end p-1">
              <button
                type="button"
                className="bg-blue-gray-50 rounded-md p-2 inline-flex items-center justify-center text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                onClick={handleOpen}>
                <span className="sr-only">Close menu</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm p-8">
              <button
                className="group h-12 w-full px-6 border-2 border-gray-300 rounded-md transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
                onClick={googleLogin}
                disabled={loading}>
                <div className="relative flex items-center space-x-4 justify-center">
                  <img
                    src="https://tailus.io/sources/blocks/social/preview/images/google.svg"
                    className="absolute left-0 w-5"
                    alt="google logo"
                  />
                  <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                    {loading ? "Processing..." : "Continue with Google"}
                  </span>
                </div>
              </button>
            </div>
          </DialogBody>
        </Dialog>
        <iframe
          id="myIframe"
          src={`https://192.168.0.108:5173/arvideo/1.html?id=${param.id}`}
          style={{ height: "100%", width: "100%" }}
          title="Iframe Example"></iframe>
      </Div100vh>
      <ToastContainer />
    </>
  );
}

export default AR_Video;
