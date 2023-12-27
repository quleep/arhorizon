import React, { useState } from "react";
import { Logo } from "../assets/index";
import { useNavigate } from "react-router-dom";

function CouponCode() {
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/couponCodeOTP/${phoneNumber}`);
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-start overflow-hidden bg-lightdark py-12">
      <div class="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm ">
          <img class="mx-auto h-20 w-auto" src={Logo} alt="Your Company" />
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Enter Your Phone Number
          </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <div class="mt-2">
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
            </div>

            <div>
              <button
                type="submit"
                class="flex w-full justify-center rounded-md bg-indigo-600 p-3 mt-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Get OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CouponCode;
