import React, { useState, useEffect } from "react";
import { Logo } from "../assets/index";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
function CouponCode() {
  const [open, setOpen] = React.useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const apiUrl =
    "https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/sendotparhorizon";
  const [loading, setLoading] = useState(false);
  const param = useParams();
  const { user, productId, setProductId } = useStateContext();
  const handleOpen = () => setOpen(!open);
  const handleClose = () => {
    window.close();
  };
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
    var markerStatus = localStorage.getItem("markerStatus");

    if (markerStatus === "found") {
    } else {
      window.location.href = `https://arhorizon.arnxt.com`;
    }
  }, []);
  useEffect(() => {
    var markerStatus = localStorage.getItem("ArUserDetected");

    if (markerStatus === "found") {
      handleOpen();
    } else {
    }
  }, []);
  const localStorageAdd = () => {
    localStorage.setItem("ArUserDetected", "found");
  };
  const localStorageDelete = () => {
    localStorage.removeItem("ArUserDetected");
    location.reload();
  };
  useEffect(() => {
    setProductId(param.id);
  }, [param]);

  return (
    <div className="relative flex min-h-screen flex-col justify-start overflow-hidden bg-lightdark py-12">
      <div class="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm ">
          <img class="mx-auto h-20 w-auto" src={Logo} alt="Your Company" />
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Enter Your Phone Number to Avail Coupon
          </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
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
        {/* <button onClick={localStorageAdd}>ADD</button>
        <button onClick={localStorageDelete}>Dlete</button> */}
      </div>
      <Dialog open={open} handler={handleOpen} size={"md"}>
        <DialogBody>
          <div class="w-full mx-auto">
            <div class="flex flex-col p-5 rounded-lg bg-white">
              <div class="flex flex-col items-center text-center">
                <div class="inline-block p-4 bg-yellow-50 rounded-full">
                  <svg
                    class="w-12 h-12 fill-current text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" />
                  </svg>
                </div>
                <h2 class="mt-2 font-semibold text-gray-800">
                  Coupon Code Already Registered
                </h2>
                <p class="mt-2 text-sm text-gray-600 leading-relaxed">
                  You have already registered the coupon code from this device.
                  Please use another device if you want to register the coupon
                  code again.
                </p>
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="gradient"
            color="green"
            onClick={handleClose}
            className="mr-1">
            <span>Go Back</span>
          </Button>
          <Button
            variant="gradient"
            color="yellow"
            onClick={localStorageDelete}
            className="mr-1">
            <span>Dev Try</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <ToastContainer />
    </div>
  );
}

export default CouponCode;
