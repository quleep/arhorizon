import React, { useEffect, useState } from "react";
import Div100vh from "react-div-100vh";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Spinner,
} from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { Logo } from "../assets/index";
import { ToastContainer, toast } from "react-toastify";

function AR_Video() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleMessage = (event) => {
      // Ensure the message is from a trusted source
      if (event.origin !== "https://arhorizon.in") return;

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

  const handleOpen = () => setOpen(!open);

  const [phoneNumber, setPhoneNumber] = useState("");
  const apiUrl =
    "https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/sendotparhorizon";
  const [loading, setLoading] = useState(false);
  const param = useParams();
  const { user, productId, setProductId } = useStateContext();

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const requestData = {
      phoneno: phoneNumber,
    };
    setLoading(true);

    axios
      .post(apiUrl, requestData)
      .then((response) => {
        console.log("Response:", response.data);

        navigate(`/couponCodeOTP/${phoneNumber}`);
      })
      .catch((error) => {
        console.error("Error:", error);
        if (error.response && error.response.status === 401) {
          // Handle 401 Unauthorized error
          toast.error(`${error.response.data}`, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          // Handle other errors
          toast.error("An error occurred. Please try again.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    var markerStatus = localStorage.getItem("ArUserDetected");

    if (markerStatus === "found") {
      handleOpen();
    } else {
    }
  }, []);

  useEffect(() => {
    setProductId(param.id);
  }, [param]);

  return (
    <>
      <Div100vh>
        {/* {open && <Popup onClose={closePopup} />} */}
        <Dialog open={open} handler={handleOpen}>
          <DialogBody>
            <div className="flex justify-end text-black cursor-pointer p-1">
              <button
                type="button"
                class="bg-blue-gray-50 rounded-md p-2 inline-flex items-center justify-center text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                onClick={handleOpen}>
                <span class="sr-only">Close menu</span>
                <svg
                  class="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div class="sm:mx-auto sm:w-full sm:max-w-sm ">
              <img class="mx-auto h-20 w-auto" src={Logo} alt="Your Company" />
              <h2 class="py-2 text-center text-lg font-bold text-gray-900">
                Enter Your Phone Number to Avail Coupon
              </h2>
            </div>
            <div class="py-7 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div class="w-full inline-flex">
                  <div class="flex justify-center items-center px-2 bg-gray-100 rounded-sm">
                    <div className="text-gray-500">+91</div>
                  </div>
                  <input
                    id="phone"
                    required
                    type="text"
                    pattern="[0-9]{10}"
                    maxLength="10"
                    inputMode="numeric"
                    className="text-base flex-1 px-4 py-3 focus:ring-blue-500 focus:border-blue-500 rounded-r-md w-full  rounded-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset"
                    placeholder="Phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-4 mt-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    {loading ? <Spinner /> : "Verify OTP"}
                  </button>
                </div>
              </form>
            </div>
          </DialogBody>
        </Dialog>
        <iframe
          id="myIframe"
          src={`https://arhorizon.in/arvideo/1.html?id=${param.id}`}
          style={{ height: "100%", width: "100%" }}
          title="Iframe Example"></iframe>
      </Div100vh>
      <ToastContainer />
    </>
  );
}

export default AR_Video;
