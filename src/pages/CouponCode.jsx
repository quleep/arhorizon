import React, { useState, useEffect } from "react";
import { Logo } from "../assets/index";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Spinner } from "@material-tailwind/react";
import { useStateContext } from "../contexts/ContextProvider";

function CouponCode() {
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
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    var markerStatus = localStorage.getItem("markerStatus");

    if (markerStatus === "found") {
      console.log("Marker was found on the previous page.");
    } else {
      window.location.href = `https://arhorizon.arnxt.com/ar/index.html?id=${param.id}`;
    }
  }, []);
  const localStorageAdd = () => {
    localStorage.setItem("markerStatus", "found");
  };
  const localStorageDelete = () => {
    localStorage.removeItem("markerStatus");
  };
  useEffect(() => {
    setProductId(param.id);
    console.log(productId);
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
                type="number"
                pattern="[0-9]{10}"
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
      </div>
    </div>
  );
}

export default CouponCode;
