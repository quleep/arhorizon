import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SidebarDash from "../components/SidebarDash";
import Tilt from "react-tilt";
import "leaflet/dist/leaflet.css";
import HeatmapLayer from "react-leaflet-heatmap-layer";
import { Navbar } from "../components";
import osm from "../service/osm-providers";

import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-16 mt-10">
          <div className="w-full h-full">
            <div className="text-gray-100 font-semibold text-lg w-full text-center py-3">
              User by location (Heatmap)
            </div>

            <LeafletMap
              center={state.position}
              zoom={state.zoom}
              style={{ height: "70vh", width: "100%", zIndex: 10 }}>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full p-10">
            <div className="xs:w-[250px] w-full">
              <div className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card">
                <div className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[200px] flex justify-evenly items-center flex-col">
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
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
