import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SidebarDash from "../components/SidebarDash";
import "leaflet/dist/leaflet.css";
import HeatmapLayer from "react-leaflet-heatmap-layer";
import { Navbar } from "../components";

import { Map as LeafletMap, TileLayer } from "react-leaflet";
import BigChartBox from "../components/bigChartBox/BigChartBox";
import PieChartBox from "../components/pieCartBox/PieChartBox";
import DataTable from "../components/dataTable/DataTable";

const Stats = () => {
  const [data, setData] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [location, setLocation] = useState(null);
  const [state] = useState({
    lat: 28.652,
    lng: 77.1663,
    zoom: 3.5,
    position: [28.652, 77.5946],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const param = useParams();
  const navigate = useNavigate();
  const [center, setCenter] = useState({ lat: 13.084622, lng: 80.248357 });
  const ZOOM_LEVEL = 9;
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/getproductdetailbyidarhorizon",
          {
            Id: param.id,
          }
        );
        setData(response.data);
        const count = Array.isArray(response.data) ? response.data.length : 0;
        setCount(count);
        console.log(count);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [param]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/gethorizoncampaigndata",
          {
            productId: data?.Id,
          }
        );
        setLocationData(response.data);
        console.log("dcd", response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [data]);
  useEffect(() => {
    const userInfo = localStorage.getItem("user");
    if (!userInfo) {
      // User is not authenticated, redirect to login
      navigate("/login");
    }
  }, []);
  // Transform to GeoJSON
  const geojson = {
    type: "FeatureCollection",
    features: data?.map((item) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [
          parseFloat(item.coordinates.longitude),
          parseFloat(item.coordinates.latitude),
        ],
      },
      properties: {
        city: item.city,
        pincode: item.pincode,
        ipaddress: item.ipaddress,
        Id: item.Id,
        product_id: item.product_id,
        country: item.country,
      },
    })),
  };
  return (
    <div className="bg-lightdark h-full">
      <Navbar />
      <div className="flex mt-20">
        <SidebarDash />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full px-16 mt-10">
          <div className="w-full h-full">
            <div className="text-gray-100 font-semibold text-lg w-full text-center py-3">
              User by location (Heatmap)
            </div>

            <LeafletMap
              center={state.position}
              zoom={state.zoom}
              style={{ height: "80vh", width: "100%", zIndex: 10 }}>
              <HeatmapLayer
                points={geojson.features}
                longitudeExtractor={(m) => m.geometry.coordinates[0]}
                latitudeExtractor={(m) => m.geometry.coordinates[1]}
                intensityExtractor={(m) =>
                  parseFloat(m.geometry.coordinates[1])
                }
                max={100}
                minOpacity={0.2}
              />
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
              />
            </LeafletMap>
          </div>
          <div className="flex-col">
            <div className="flex w-full gap-4 h-fit">
              <div className="xs:w-[250px] w-1/2 flex justify-center items-center">
                <div className="w-full rounded-[20px] border border-slate-300 outline-slate-100">
                  <div className="bg-tertiary rounded-[20px] min-h-[250px] flex justify-evenly items-center flex-col">
                    <p class="text-xl font-medium tracking-wide text-white ">
                      Total users:
                    </p>
                    <div class="flex items-center justify-center">
                      <p class="mr-2 text-5xl font-semibold text-white lg:text-6xl">
                        {count}
                      </p>
                      <p class="text-base text-gray-500">users</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <PieChartBox />
              </div>
            </div>
            <div className=" w-full h-80">
              <BigChartBox />
            </div>
            {/* <SignInwithGoogle /> */}
          </div>
          <div className="w-full h-full">
            <div className="text-gray-100 font-semibold text-lg w-full text-center py-3">
              Registered Users
            </div>
            <DataTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
