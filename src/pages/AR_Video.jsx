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
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [data, setData] = useState(false);

  const [loading, setLoading] = useState(false);
  const param = useParams();
  const { setProductId } = useStateContext();

  useEffect(() => {
    const handleMessage = (event) => {
      // if (event.origin !== "https://localhost:5173") return;
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
  const handleCopy = () => {
    const couponCode = data?.couponCode;

    if (couponCode) {
      // Copy to clipboard
      navigator.clipboard.writeText(couponCode);

      // Display toast notification
      toast.success("Coupon code copied to clipboard!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const requestData = {
          Id: result.user.email,
          firstName: result.user.displayName,
          photo: result.user.photoURL,
          productId: param.id,
        };
        axios
          .post(
            "https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/sendotparhorizon",
            requestData
          )
          .then(async (response) => {
            toast.success("Logged in successfully!", {
              position: toast.POSITION.BOTTOM_CENTER,
            });
            setOpen(false);
            setOpen1(true);

            try {
              const additionalApiResponse = await axios.get(
                `https://3ef9gn5kk2.execute-api.ap-south-1.amazonaws.com/arnxt_prod/ar-horizon/uploadtargetimage?id=${param.id}`
              );

              const additionalResponseData = additionalApiResponse.data;
              setData(additionalResponseData);
              handleOpen();
            } catch (additionalApiError) {
              console.error(
                "Error in additional API request:",
                additionalApiError
              );
            }
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
  const handleOpen1 = () => setOpen1(!open1);

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
        <Dialog open={open1} handler={handleOpen1}>
          <DialogBody>
            <div className="flex justify-end p-1">
              <button
                type="button"
                className="bg-blue-gray-50 rounded-md p-2 inline-flex items-center justify-center text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                onClick={handleOpen1}>
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
            <div class="container bg-gradient-to-r from-indigo-500 to-indigo-300 text-white p-8 rounded-lg shadow-lg mt-1">
              <div class="text-3xl font-bold mb-4">Special Offer!</div>
              <div class="text-lg mb-4">
                Get{" "}
                <span class="text-yellow-400 font-bold">
                  {data?.discountPercentage}% OFF
                </span>{" "}
                your next purchase!
              </div>
              <div class="text-base mb-4">Use coupon code:</div>
              <div class="bg-white text-gray-800 rounded-lg px-4 py-2 flex items-center justify-between">
                <span class="text-xl font-semibold">{data?.couponCode}</span>
                <button
                  class="bg-blue-800 text-white px-3 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={handleCopy}>
                  Copy
                </button>
              </div>
              <div class="text-sm mt-4">
                <p>
                  Valid until{" "}
                  <span class="font-semibold">December 31, 2024</span>
                </p>
                <p>Terms and conditions apply.</p>
              </div>
            </div>
          </DialogBody>
        </Dialog>
        <iframe
          id="myIframe"
          src={`https://localhost:5173/arvideo/1.html?id=${param.id}`}
          style={{ height: "100%", width: "100%" }}
          title="Iframe Example"></iframe>
      </Div100vh>
      <ToastContainer />
    </>
  );
}

export default AR_Video;
