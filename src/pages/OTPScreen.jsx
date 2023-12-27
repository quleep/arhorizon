import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function OTPScreen() {
  const param = useParams();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const inputRefs = useRef(
    Array(6)
      .fill(null)
      .map(() => React.createRef())
  );
  // Example phone number and OTP for demonstration
  const correctPhoneNumber = "9855117155";
  const correctOTP = "123456";

  const handleInputChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].current.focus();
    }

    setOtp(newOtp);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOTP = otp.join("");

    if (enteredOTP === correctOTP) {
      console.log("Verification successful. Allowing access.");

      handleOpen();
    } else {
      console.log(
        "Verification failed. Please check your OTP and phone number."
      );
      toast.error(
        "Verification failed. Please check your OTP and phone number.",
        {
          position: toast.POSITION.BOTTOM_CENTER,
        }
      );
    }
  };
  return (
    <div class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-800 py-12">
      <div class="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div class="flex flex-col items-center justify-center text-center space-y-2">
            <div class="font-semibold text-3xl">
              <p>OTP Verification</p>
            </div>
            <div class="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your phone Number {param.id}.</p>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit}>
              <div class="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-2xl">
                  {otp.map((digit, index) => (
                    <div key={index} className="w-16 h-16">
                      <input
                        ref={inputRefs.current[index]}
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-300 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="number"
                        name={`digit-${index}`}
                        maxLength="1"
                        value={digit}
                        onChange={(e) =>
                          handleInputChange(index, e.target.value)
                        }
                      />
                    </div>
                  ))}
                </div>

                <div class="flex flex-col space-y-5">
                  <div>
                    <button class="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                      Verify Account
                    </button>
                  </div>

                  <div class="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't recieve OTP?</p>{" "}
                    <a
                      class="flex flex-row items-center text-blue-600"
                      href="http://"
                      target="_blank"
                      rel="noopener noreferrer">
                      Resend
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Dialog open={open} handler={handleOpen} size={"md"}>
        <DialogBody>
          <div class="container bg-gradient-to-r from-indigo-500 to-indigo-300 text-white p-8 rounded-lg shadow-lg">
            <div class="text-3xl font-bold mb-4">Special Offer!</div>
            <div class="text-lg mb-4">
              Get <span class="text-yellow-400 font-bold">25% OFF</span> your
              next purchase!
            </div>
            <div class="text-base mb-4">Use coupon code:</div>
            <div class="bg-white text-gray-800 rounded-lg px-4 py-2 flex items-center justify-between">
              <span class="text-xl font-semibold">TAILOFFER25</span>
              <button class="bg-blue-800 text-white px-3 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Copy
              </button>
            </div>
            <div class="text-sm mt-4">
              <p>
                Valid until <span class="font-semibold">December 31, 2023</span>
              </p>
              <p>Terms and conditions apply.</p>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1">
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <ToastContainer />
    </div>
  );
}
export default OTPScreen;
