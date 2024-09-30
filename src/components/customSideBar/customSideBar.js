import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import styles from "./customeSideBar.module.scss";
import axios from "axios";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [data, setData] = useState([]);
  // const tokenData = useSelector((state) => state?.auth?.providedData);
  const Newtoken = localStorage.getItem("CabinetToken");

  // const tokenDataString = JSON.stringify(Newtoken);
  // const token = JSON.parse(tokenDataString)?.token || "";
  // const [tokenId, setTokenId] = useState(token);

  useEffect(() => {
    fetchData();
  }, [Newtoken]);

  // const tokenData = useSelector((state) => state?.auth?.providedData);
  // const tokenDataString = JSON.stringify(tokenData);
  // const token = JSON.parse(tokenDataString)?.token || "";
  // const tokken =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTFkNDEwNWUzZGM0NTc3ZmQzMDFkMTMiLCJpYXQiOjE2OTY4NTM3MjksImV4cCI6MTY5Njg5NjkyOX0.XO_MtcShKv6CuxXjXwcbpJWPM2D0HlzGP2x884AkfbM";

  const fetchData = () => {
    axios({
      method: "GET",
      url: "http://192.168.0.24:9000/device/getAvailableDevices",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${Newtoken}`,
      },
    })
      .then((response) => {
        let initialData = response.data.data;
        setData(initialData);
        // let center = response.data[0].geometry.coordinates
        // setCenter(center);
        console.log("fetch Data Live", response.data);

        // for (let i = 0; i < initialData.length; i++) {
        //   const marker = initialData[i];
        //   const newPoint = new google.maps.LatLng(
        //     marker.geometry.coordinates.lat,
        //     marker.geometry.coordinates.lng
        //   );
        //   bounds.extend(newPoint);
        // }
        // console.log(bounds);
        // setLoading(false);
        // mapRef.current.fitBounds(bounds);

        // for (let i = 0; i < initialData.length; i++) {
        //   const marker = initialData[i];
        //   const newPoint = new google.maps.LatLng(marker.geometry.coordinates.lat, marker.geometry.coordinates.lng);
        //   bounds.extend(newPoint);

        // }
        // console.log(bounds)
        // setLoading(false);
        // mapRef.current.fitBounds(bounds);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     // const tokenData = localStorage.getItem("TrackerToken");
  //     // const tokenDataString = JSON.stringify(tokenData);
  //     // const token = JSON.parse(tokenDataString)?.token || "";
  //     let _token = `Bearer ${token}`;
  //     // console.log("🚀======2>token:", _token);
  //     try {
  //       const response = await axios({
  //         method: "GET",
  //         url: "http://192.168.0.24:9000/device/getAvailableDevices",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Accept: "application/json",
  //           Authorization: `Bearer ${_token}`, // Assuming tokenData has a "token" property
  //         },
  //       });

  //       let initialData = response.data.data;
  //       console.log("======>initialData", initialData);
  //       setData(initialData);

  //       console.log("fetch Data Live", response.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  //   console.log("log hayatattatatat");
  // }, []);

  const names = data?.map((item) => item.name);
  const handleItemClick = (index) => {
    setActiveItem(index === activeItem ? null : index);
  };

  return (
    <div className={styles.sidebar}>
      {sideBarRoute.map((item, index) => (
        <div
          key={index}
          className={`${styles["sidebar-item"]} ${
            activeItem === index ? styles["sidebar-item-active"] : ""
          }`} 
          onClick={() => handleItemClick(index)}>
          {item.icon && item.icon}
          {item.label}
          {index === activeItem && item.children.length > 0 && (
            <div className={styles.submenu}>
              {names &&
                names.map((child, childIndex) => (
                  <div
                    key={childIndex}
                    className={`${styles["sidebar-item"]} ${styles["submenu-item"]}`}>
                    <p> {child}</p>
                  </div>
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const sideBarRoute = [
  {
    label: "GlobalTest",
    link: "/globaltest/all",
    icon: <ArrowDropDownIcon style={{ color: "white" }} />,
    children: [
      {
        label: "Test",
        link: "/test",
      },
      {
        label: "Test",
        link: "/test",
      },
      {
        label: "Test",
        link: "/test",
      },
    ],
  },
];

export default Sidebar;
