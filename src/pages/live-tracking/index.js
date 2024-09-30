import React, { useRef, useEffect, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  useJsApiLoader,
  OverlayView,
} from "@react-google-maps/api";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import { Accordion } from "react-bootstrap";
import axios from "axios";
import classnames from "classnames";
import Loading from "../../components/loading/loading.js";
import Echo from "laravel-echo";

import "./style.css";
import mapStyles from "./mapStyles.js";
import LightControl from "../../components/lightControl/lightControl.js";
import ElectricConsumption from "../../components/ElectricConsumption/electricConsumption.js";
import LampModal from "../../components/Modals/LampDataModal/lampDataModal.js";
import { getEnergyLight } from "../../Redux/actions/EnergyConsumption/getEnergyConsumption.js";
import { useDispatch } from "react-redux";
import StreetLightModal from "../../components/Modals/StreetLightData/streetLightData.js";
import { formLabelClasses } from "@mui/material";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function LiveTracking() {
  const [tabFoucsed, setTabFocused] = useState("1");
  const [activeTab, setActiveTab] = useState("1");
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const [loading, setLoading] = useState(false); //need to ture
  const [message, setMessage] = useState("");
  const [checkPoint, setCheckPoint] = useState(false);

  const google = window.google;
  const bounds = new google.maps.LatLngBounds({ lat: 33.72148, lng: 73.04329 });
  const dispatch = useDispatch();

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDsNytQySdV_bOGyy7BPJBHJf5aRAKZmh8",
  });
  const mapRef = useRef(null);
  const [listOfActiveUsers, setListOfActiveUsers] = useState([]);
  const [listOfInActiveUsers, setListOfInActiveUsers] = useState([]);
  const [data, setData] = useState([]);
  const [centerPoint, setCenterPoint] = useState([]);

  const [liveDeviceData, setLiveDeviceData] = useState({});
  const [selectedDevice, setSelectedDevice] = useState(null);
  console.log(
    "🚀 ~ file: index.js:2218 ~ LiveTracking ~ selectedVehicle:",
    selectedDevice
  );
  // const [center, setCenter] = useState(null);
  const [map, setMap] = React.useState(null);
  const [selectedZoomed, setSelectedZoomed] = useState(false);
  const [selectedzoomedReg, setSelectedZoomedReg] = useState(null);
  const [selectedZoomedVehicle, setSelectedZoomedVehicle] = useState(null);

  const hasButtonClicked = useRef(false);

  const selectedZoomedVehicle1 = useRef(null);

  const containerStyle = {
    width: "100%",
    height: "100%",
    minHeight: "100vh", // 100% of the viewport height
    minWidth: "100vw",
  };
  //  const containerStyle = {
  //     width: "100%",
  //     height: "100%",
  //     minHeight: windowDimensions.height - 65,
  //   };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [streetLightOpen, setStreetLightOpen] = useState(false);

  // street light modal
  // const StreetlightDataModal = (item) => {
  //   setLiveDeviceData(item);
  //   setStreetLightOpen(true);
  //   setModalIsOpen(false);
  // };

  // cabinet data
  const openModal = (item) => {
    setLiveDeviceData(item);
    setModalIsOpen(true);
    // setStreetLightOpen(false);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const center = {
    lat: 33.72148,
    lng: 73.04329,
  };

  const options = {
    // zoom: 8, // Zoom level
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: false,
    fullscreenControl: true,
  };

  const onLoad = React.useCallback(function callback(map) {
    console.log("bounds==>", bounds);

    console.log("🚀 ~ onLoad ~ map:", map);
    map?.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  // function connectSocket(token) {
  //   return new Echo({
  //     broadcaster: "pusher",
  //     key: "s3cr3t",
  //     wsHost: "server.localiveiot.com",
  //     wsPort: 6006,
  //     wssPort: 6006,
  //     forceTLS: true,
  //     cluster: "mt1",
  //     disableStats: true,
  //     encrypted: true,
  //     authorizer: (channel, options) => {
  //       console.log(options);
  //       return {
  //         authorize: (socketId, callback) => {
  //           axios({
  //             method: "POST",
  //             url: "http://192.168.0.240:8500/api/broadcasting/auth",
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //               Accept: "application/json",
  //             },
  //             data: {
  //               socket_id: socketId,
  //               channel_name: channel.name,
  //             },
  //           })
  //             .then((response) => {
  //               callback(false, response.data);
  //             })
  //             .catch((error) => {
  //               console.log(error);
  //               callback(true, error);
  //             });
  //         },
  //       };
  //     },
  //   });
  // }

  // useEffect(() => {
  //   const token = localStorage.getItem("TrackerToken");
  //   const id = localStorage.getItem("TrackerUserId");

  //   if (token && id && checkPoint === true) {
  //     let echo = connectSocket(token);

  //     echo
  //       .private(`App.Models.User.${id}`)
  //       .listen(".live_location", (message) => {
  //         let payload = JSON.parse(message.payload);
  //         console.log(payload);
  //         setData(payload);
  //         // let center = response.data[0].geometry.coordinates
  //         // setCenter(center);

  //         if (hasButtonClicked.current == true) {
  //           const bounds = new google.maps.LatLngBounds();
  //           console.log("zoomed", selectedZoomedVehicle1.current);

  //           payload.forEach((element) => {
  //             if (
  //               element.properties.registration_number ==
  //               selectedZoomedVehicle1.current
  //             ) {
  //               console.log("found it", selectedZoomedVehicle1.current);
  //               const newPoint = new google.maps.LatLng(
  //                 element.geometry.coordinates.lat,
  //                 element.geometry.coordinates.lng
  //               );
  //               bounds.extend(newPoint);
  //               const extendPoint1 = new google.maps.LatLng(
  //                 bounds.getNorthEast().lat() + 0.01,
  //                 bounds.getNorthEast().lng() + 0.01
  //               );
  //               const extendPoint2 = new google.maps.LatLng(
  //                 bounds.getNorthEast().lat() - 0.01,
  //                 bounds.getNorthEast().lng() - 0.01
  //               );

  //               bounds.extend(extendPoint1);
  //               bounds.extend(extendPoint2);
  //             }
  //           });
  //           console.log(bounds);
  //           map.fitBounds(bounds);
  //         } else {
  //           for (let i = 0; i < payload.length; i++) {
  //             const marker = payload[i];
  //             const newPoint = new google.maps.LatLng(
  //               marker.geometry.coordinates.lat,
  //               marker.geometry.coordinates.lng
  //             );
  //             bounds.extend(newPoint);
  //           }
  //           console.log(bounds);
  //           setLoading(false);
  //         }
  //       });

  //     echo
  //       .private(`App.Models.User.${id}`)
  //       .listen(".vehicle_status", (message) => {
  //         let payload = JSON.parse(message.payload);
  //         console.log(payload);
  //         setListOfActiveUsers(payload.ACTIVE);
  //         setListOfInActiveUsers(payload.IN_ACTIVE);
  //       });

  //     echo.connector.pusher.connection.bind("connect", () => {
  //       console.log("Connecting...");
  //     });

  //     echo.connector.pusher.connection.bind("connected", () => {
  //       console.log("It is connected");
  //     });

  //     echo.connector.pusher.connection.bind("disconnected", () => {
  //       console.log("It is disconnected");
  //       // const timer = setTimeout(() => {
  //       //   setCheckDisconnect(true);
  //       // }, 5000);
  //       // return () => clearTimeout(timer);
  //     });
  //     echo.connector.pusher.connection.bind("reconnecting", () => {
  //       console.log("Reconnecting...");
  //     });
  //   }
  // }, [checkPoint]);
  // live Data  of street light
  // const tokenData = useSelector((state) => state?.auth?.providedData);
  const Newtoken = localStorage.getItem("CabinetToken");
  console.log("🚀 ~ file: index.js:2388 ~ LiveTracking ~ Newtoken:", Newtoken);

  // const tokenDataString = JSON.stringify(Newtoken);
  // const token = JSON.parse(tokenDataString)?.token || "";
  // const [tokenId, setTokenId] = useState(token);

  // useEffect(() => {
  //   streetLightData();
  //   dispatch(getEnergyLight());
  // }, [Newtoken]);

  useEffect(() => {
    // Define the function to call your API
    const callApi = () => {
      streetLightData();
      dispatch(getEnergyLight());
    };

    // Initial API call
    callApi();

    // Set up an interval to call the API every 30 seconds
    const apiCallInterval = setInterval(callApi, 1000); // 10 seconds in milliseconds

    // Cleanup the interval if the component unmounts
    return () => {
      clearInterval(apiCallInterval);
    };
  }, [Newtoken, onLoad, selectedZoomed]);
  // const getPixelPositionOffset = (x, y, { x: offsetX, y: offsetY }) => ({
  //   x: x + offsetX,
  //   y: y + offsetY,
  // });

  // for local use  http://59.103.233.57:9000
  const streetLightData = () => {
    axios({
      method: "GET",
      url: "http://192.168.0.24:9000/livedata/latest",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${Newtoken}`,
      },
    })
      .then((response) => {
        let initialData = response.data.data;
        console.log("data ===> ", initialData);
        setData(initialData);
        dispatch(getEnergyLight());
        for (let i = 0; i < initialData.length; i++) {
          const marker = initialData[i];
          const newPoint = new google.maps.LatLng(
            marker.latitude,
            marker.longitude
          );

          bounds.extend(newPoint);
        }
        console.log("bounds", bounds);
        setLoading(false);
        mapRef?.current?.fitBounds(bounds);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const SelectedVehicleZoom = (selectedDevice) => {
    openModal(selectedDevice);

    // StreetlightDataModal(selectedVehicle);
    console.log(
      "🚀 ~ file: index.js:2540 ~ SelectedVehicleZoom ~ selectedVehicle:",
      selectedDevice
    );
    const bounds = new google.maps.LatLngBounds();
    setSelectedZoomed(true);
    setSelectedZoomedVehicle(selectedDevice.deviceId);
    selectedZoomedVehicle1.current = selectedDevice.deviceId;
    hasButtonClicked.current = true;
    console.log(hasButtonClicked.current);
    console.log(selectedDevice, "=====>");
    data.forEach((element) => {
      if (element?.deviceId == selectedDevice.deviceId) {
        const newPoint = new google.maps.LatLng(
          element.latitude,
          element.longitude
        );
        bounds.extend(newPoint);
        console.log("found it", selectedDevice.deviceId);
        const extendPoint1 = new google.maps.LatLng(
          bounds.getNorthEast().lat() + 0.01,
          bounds.getNorthEast().lng() + 0.01
        );
        const extendPoint2 = new google.maps.LatLng(
          bounds.getNorthEast().lat() - 0.1,
          bounds.getNorthEast().lng() - 0.1
        );

        bounds.extend(extendPoint1);
        bounds.extend(extendPoint2);
      }
    });
    console.log(bounds);
    map.fitBounds(bounds);
  };

  useEffect(() => console.log(tabFoucsed), [tabFoucsed]);

  const focusedTab = (i) => {
    if (tabFoucsed !== i) {
      setTabFocused(i);
    }
  };

  const toggleTab = (i) => {
    if (activeTab !== i) {
      setActiveTab(i);
    }
  };

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div style={{ position: "relative" }}>
      {console.log("loading == ", data)}
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div>
          <section id="main">
            <div className="container-fluid">
              <GoogleMap
                mapContainerStyle={containerStyle}
                options={options}
                ref={mapRef}
                center={center}
                onLoad={onLoad}
                onUnmount={onUnmount}>
                {data?.map((item, index) => {
                  return (
                    <div
                      onClick={() => {
                        openModal(item);
                        // selectedDevice(item);
                      }}>
                      {/* <LampModal
                    // isOpen={modalIsOpen}
                    // closeModalReq={closeModal}
                    // deviceName={item.name}
                    // deviceId={item.deviceId}
                     /> */}
                      <Marker
                        key={item.deviceId}
                        position={{
                          lng: item.longitude,
                          lat: item.latitude,
                        }}
                        // getPixelPositionOffset={(x, y) =>
                        //   getPixelPositionOffset(x, y, { x: -100, y: -100 })
                        // }
                        onClick={() => {
                          setSelectedDevice(item);
                          setActiveTab("1");
                          SelectedVehicleZoom(item);
                        }}
                        icon={{
                          url: item.deviceState ? "/pin2.png" : "/pin1.png",
                          scaledSize: new window.google.maps.Size(30, 30),
                        }}
                      />

                      <OverlayView
                        key="mwl"
                        position={{
                          lng: item.longitude,
                          lat: item.latitude,
                        }}
                        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                        // getPixelPositionOffset={(x, y) => getPixelPositionOffset(x, y, {     x: -30, y: -15 })}
                      >
                        <div
                          style={{
                            background: `#000435 `,
                            padding: `7px 12px`,
                            fontSize: "11px",
                            color: `#fff`,
                            borderRadius: "4px",
                            width: "max-content",
                            boxShadow: " 0 0px 18px rgba(221, 221, 62, 1)",
                          }}>
                          {item.deviceId} | {item.name}
                        </div>
                      </OverlayView>
                    </div>
                  );
                })}
              </GoogleMap>
            </div>
          </section>
          <div className="right-tabs-hist" ng-show="currentState=='liveTrack'">
            <div className="pull-right width-outer-box">
              <LightControl />
              <ElectricConsumption />

              <div className="tab-content ng-scope" ng-if="!isPopUpOpened">
                <TabContent
                  className="p-15 rounded bg-white mb-4"
                  activeTab={tabFoucsed}></TabContent>

                <div role="tabpanel" className="tab-pane fade" id="tabb-2">
                  <div className="drop-box-right">
                    <div className="search-drob-head full-width-float">
                      <div className="search-drob-wrap livetracksearch">
                        <input
                          type="text"
                          className="form-control ng-pristine ng-untouched ng-valid ng-empty"
                          placeholder="Search Vehicle"
                          ng-model="search"
                        />
                        <button type="submit">
                          <span className="cn_item ">
                            <i className="sprite-icon-all search-icon" />
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="clear" />
                    <div
                      className="panel-group"
                      id="accordion2"
                      role="tablist"
                      aria-multiselectable="true">
                      <li
                        ng-show="groups.length <= 0"
                        className="text-center ng-binding">
                        No data found
                      </li>
                    </div>
                  </div>
                </div>
                <div role="tabpanel" className="tab-pane  fade  " id="tabb-4">
                  <div className="drop-box-right">
                    <div className="full-width-inblocks text-center mar-top-min2">
                      <div className="gauge-speed">
                        <div
                          id="gauge2"
                          className="gauge-first jqx-widget"
                          aria-valuenow={0}
                          aria-valuemin={0}
                          aria-valuemax={220}
                          aria-disabled="false"
                          style={{ width: 120, height: 120 }}>
                          <div style={{ width: 120, height: 120 }}>
                            <table
                              className="tblChart"
                              cellSpacing={0}
                              cellPadding={0}
                              border={0}
                              align="left"
                              valign="top">
                              <tbody>
                                <tr>
                                  <td colSpan={2} className="tdTop" />
                                </tr>
                                <tr>
                                  <td className="tdLeft" />
                                  <td>
                                    <div
                                      className="chartContainer"
                                      style={{
                                        position: "relative",
                                        width: 120,
                                        height: 120,
                                        overflow: "hidden",
                                      }}
                                      onselectstart="return false;">
                                      <svg
                                        id="svgChart"
                                        version="1.1"
                                        width="100%"
                                        height="100%"
                                        overflow="hidden">
                                        <defs>
                                          <linearGradient
                                            x1="0%"
                                            y1="0%"
                                            x2="0%"
                                            y2="100%"
                                            id="grd1590249897300BABABAv">
                                            <stop
                                              offset="0%"
                                              style={{ stopColor: "#BABABA" }}
                                            />
                                            <stop
                                              offset="25%"
                                              style={{
                                                stopColor: "#CDCDCD",
                                              }}></stop>
                                            <stop
                                              offset="50%"
                                              style={{
                                                stopColor: "#FFFFFF",
                                              }}></stop>
                                            <stop
                                              offset="100%"
                                              style={{
                                                stopColor: "#BABABA",
                                              }}></stop>
                                          </linearGradient>
                                          <linearGradient
                                            x1="0%"
                                            y1="0%"
                                            x2="0%"
                                            y2="100%"
                                            id="grd1590249897300ffffffv"
                                          />
                                        </defs>
                                        <circle
                                          cx="57.5"
                                          cy="57.5"
                                          r={57}
                                          stroke="#000"
                                          fill="url(http://fleet.zong.com.pk/corpdashboard/liveTrack#grd1590249897300BABABAv)"></circle>
                                        <circle
                                          cx="57.5"
                                          cy="57.5"
                                          r={56}
                                          stroke="#ffffff"
                                          strokeWidth="1px"
                                          fill="#ffffff"
                                        />
                                        <line
                                          x1="10.73462819564029"
                                          y1="84.49999999999997"
                                          x2="15.064755214562489"
                                          y2="81.99999999999997"
                                          stroke="#898989"
                                          strokeWidth={1}
                                          className="jqx-gauge-tick-major"
                                        />
                                        <line
                                          x1="5.022175310528759"
                                          y1="44.769017482490895"
                                          x2="9.881233152146464"
                                          y2="45.94781216003804"
                                          stroke="#898989"
                                          strokeWidth={1}
                                          className="jqx-gauge-tick-major"
                                        />
                                        <line
                                          x1="6.469955789407898"
                                          y1="75.16167001914076"
                                          x2="8.359957426837234"
                                          y2="74.50753409250592"
                                          stroke="#898989"
                                          strokeWidth={1}
                                          className="jqx-gauge-tick-minor"
                                        />
                                        <line
                                          x1="28.305395857397748"
                                          y1="12.0723092271162"
                                          x2="31.008599944675737"
                                          y2="16.27857689127211"
                                          stroke="#898989"
                                          strokeWidth={1}
                                          className="jqx-gauge-tick-major"
                                        />
                                        <line
                                          x1="4.049642138429633"
                                          y1="65.18500126675738"
                                          x2="6.029285022191495"
                                          y2="64.90037159021081"
                                          stroke="#898989"
                                          strokeWidth={1}
                                          className="jqx-gauge-tick-minor"
                                        />
                                        <line
                                          x1="67.71956719546216"
                                          y1="4.4758503478138465"
                                          x2="66.77331097366012"
                                          y2="9.385493834127374"
                                          stroke="#898989"
                                          strokeWidth={1}
                                          className="jqx-gauge-tick-major"
                                        />
                                        <line
                                          x1="3.5611636841175667"
                                          y1="54.930576545517894"
                                          x2="5.558898362483589"
                                          y2="55.02574037716538"
                                          stroke="#898989"
                                          strokeWidth={1}
                                          className="jqx-gauge-tick-minor"
                                        />
                                        <line
                                          x1="101.48710141071817"
                                          y1="26.176926883155343"
                                          x2="97.41422165046649"
                                          y2="29.077211431011328"
                                          stroke="#898989"
                                          strokeWidth={1}
                                          className="jqx-gauge-tick-major"
                                        />
                                        <line
                                          x1="110.95035786157037"
                                          y1="65.18500126675742"
                                          x2="106.00125065216571"
                                          y2="64.47342707539099"
                                          stroke="#898989"
                                          strokeWidth={1}
                                          className="jqx-gauge-tick-major"
                                        />
                                        <line
                                          x1="8.379872250856025"
                                          y1="35.067589297898095"
                                          x2="10.199136241565064"
                                          y2="35.89841932390187"
                                          stroke="#898989"
                                          strokeWidth={1}
                                          className="jqx-gauge-tick-minor"
                                        />
                                        <line
                                          x1="13.512898589281875"
                                          y1="26.176926883155293"
                                          x2="15.142050493382548"
                                          y2="27.337040702297692"
                                          stroke="#898989"
                                          strokeWidth={1}
                                          className="jqx-gauge-tick-minor"
                                        />
                                        <line
                                          x1="20.235733379965964"
                                          y1="18.4183619423262"
                                          x2="21.61589140293019"
                                          y2="19.865830018536343"
                                          stroke="#898989"
                                          strokeWidth={1}
                                          className="jqx-gauge-tick-minor"
                                        />
                                        <line
                                          x1="37.430227394342346"
                                          y1="7.3681316171320645"
                                          x2="38.173552305663"
                                          y2="9.22486748316421"
                                          stroke="#898989"
                                          strokeWidth={1}
                                          className="jqx-gauge-tick-minor"
                                        />
                                        <line
                                          x1="47.28043280453787"
                                          y1="4.475850347813832"
                                          x2="47.65893529325869"
                                          y2="6.439707742339245"
                                          stroke="#898989"
                                          strokeWidth={1}
                                          className="jqx-gauge-tick-minor"
                                        />
                                        <line
                                          x1="57.50000000000003"
                                          y1="3.5"
                                          x2="57.50000000000003"
                                          y2="5.5"
                                          stroke="#898989"
                                          strokeWidth={1}
                                          className="jqx-gauge-tick-minor"
                                        />
                                        <line
                                          x1="77.56977260565773"
                                          y1="7.3681316171321"
                                          x2="76.82644769433708"
                                          y2="9.224867483164246"
                                          stroke="#898989"
                                          strokeWidth={1}
                                          className="jqx-gauge-tick-minor"
                                        />
                                        <line
                                          x1="86.6946041426023"
                                          y1="12.072309227116236"
                                          x2="85.6133225076911"
                                          y2="13.754816292778592"
                                          stroke="#898989"
                                          strokeWidth={1}
                                          className="jqx-gauge-tick-minor"
                                        />
                                        <line
                                          x1="94.76426662003408"
                                          y1="18.418361942326243"
                                          x2="93.38410859706985"
                                          y2="19.86583001853638"
                                          stroke="#898989"
                                          strokeWidth={1}
                                          className="jqx-gauge-tick-minor"
                                        />
                                        <line
                                          x1="106.620127749144"
                                          y1="35.06758929789815"
                                          x2="104.80086375843496"
                                          y2="35.89841932390192"
                                          stroke="#898989"
                                          strokeWidth={1}
                                          className="jqx-gauge-tick-minor"
                                        />
                                        <line
                                          x1="109.97782468947125"
                                          y1="44.76901748249095"
                                          x2="108.03420155282417"
                                          y2="45.24053535350981"
                                          stroke="#898989"
                                          strokeWidth={1}
                                          className="jqx-gauge-tick-minor"
                                        />
                                        <line
                                          x1="111.43883631588244"
                                          y1="54.93057654551795"
                                          x2="109.44110163751641"
                                          y2="55.025740377165434"
                                          stroke="#898989"
                                          strokeWidth={1}
                                          className="jqx-gauge-tick-minor"
                                        />
                                        <line
                                          x1="108.53004421059208"
                                          y1="75.1616700191408"
                                          x2="106.64004257316276"
                                          y2="74.50753409250595"
                                          stroke="#898989"
                                          strokeWidth={1}
                                          className="jqx-gauge-tick-minor"
                                        />
                                        <line
                                          x1="104.26537180435966"
                                          y1="84.50000000000003"
                                          x2="102.53332099679079"
                                          y2="83.50000000000003"
                                          stroke="#898989"
                                          strokeWidth={1}
                                          className="jqx-gauge-tick-minor"
                                        />
                                        <text
                                          className="jqx-gauge-label"
                                          cursor="default"
                                          x={21}
                                          y={68}
                                          width={0}
                                          height={0}>
                                          0
                                        </text>
                                        <text
                                          className="jqx-gauge-label"
                                          cursor="default"
                                          x={17}
                                          y={38}
                                          width={0}
                                          height={0}>
                                          40
                                        </text>
                                        <text
                                          className="jqx-gauge-label"
                                          cursor="default"
                                          x={35}
                                          y={12}
                                          width={0}
                                          height={0}>
                                          80
                                        </text>
                                        <text
                                          className="jqx-gauge-label"
                                          cursor="default"
                                          x={65}
                                          y={6}
                                          width={0}
                                          height={0}>
                                          120
                                        </text>
                                        <text
                                          className="jqx-gauge-label"
                                          cursor="default"
                                          x={92}
                                          y={23}
                                          width={0}
                                          height={0}>
                                          160
                                        </text>
                                        <text
                                          className="jqx-gauge-label"
                                          cursor="default"
                                          x={99}
                                          y={53}
                                          width={0}
                                          height={0}>
                                          200
                                        </text>
                                        <text
                                          className="jqx-gauge-caption"
                                          cursor="default"
                                          x={58}
                                          y={76}
                                          width={0}
                                          height={0}>
                                          90
                                        </text>
                                        <path
                                          d="M 58,58.732050807568875 L 56,55.267949192431125 L 13.698729810778048,81.99999999999997"
                                          z-index={0}
                                          stroke="#7FD13B"
                                          fill="#7FD13B"
                                          strokeWidth={1}
                                          style={{ visibility: "visible" }}
                                        />
                                        <circle
                                          cx="57.5"
                                          cy="57.5"
                                          r={2}
                                          fill="#7FD13B"
                                          strokeWidth="1px"
                                          stroke="#7FD13B"
                                          z-index={30}
                                          style={{ visibility: "visible" }}
                                        />
                                      </svg>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <span
                          className="km-speed ng-binding"
                          style={{ display: "block" }}>
                          km/hr
                        </span>
                        <span
                          className="title-guage ng-binding"
                          style={{ display: "block" }}>
                          SPEED
                        </span>
                      </div>
                      <div
                        className="gauge-rpmsh"
                        ng-hide="devType=='2' || devType=='3'">
                        <div
                          id="gauge-rpm2"
                          className="gauge-second jqx-widget"
                          aria-valuenow={0}
                          aria-valuemin={0}
                          aria-valuemax={220}
                          aria-disabled="false"
                          style={{ width: 100, height: 100 }}>
                          <div style={{ width: 100, height: 100 }}>
                            <table
                              className="tblChart"
                              cellSpacing={0}
                              cellPadding={0}
                              border={0}
                              align="left"
                              valign="top">
                              <tbody>
                                <tr>
                                  <td colSpan={2} className="tdTop" />
                                </tr>
                                <tr>
                                  <td className="tdLeft" />
                                  <td>
                                    <div
                                      className="chartContainer"
                                      style={{
                                        position: "relative",
                                        width: 100,
                                        height: 100,
                                        overflow: "hidden",
                                      }}
                                      onselectstart="return false;">
                                      <svg
                                        id="svgChart"
                                        version="1.1"
                                        width="100%"
                                        height="100%"
                                        overflow="hidden">
                                        <defs>
                                          <linearGradient
                                            x1="0%"
                                            y1="0%"
                                            x2="0%"
                                            y2="100%"
                                            id="grd1590249897319ffffffv"
                                          />
                                        </defs>
                                        <circle
                                          cx="47.5"
                                          cy="47.5"
                                          r={43}
                                          stroke="transparent"
                                          strokeWidth="3px"
                                          fill="transparent"
                                        />
                                        <path
                                          // d="M11.992958444838003,67.99999999999997 A41,41 100 0,1 8.754966432698588,60.909786496014284 L 13.479970526271934,59.27444667942717 A36,36 100 0,0 16.323085463760194,65.49999999999997 L 11.992958444838003,67.99999999999997 z"
                                          fill="#94c11c"
                                          stroke="#94c11c"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M8.754966432698588,60.909786496014284 A41,41 100 0,1 7.655725698734784,57.16611635588649 L 12.51478354035249,55.987321678339356 A36,36 100 0,0 13.479970526271934,59.27444667942717 L 8.754966432698588,60.909786496014284 z"
                                          fill="#fff"
                                          stroke="#fff"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M7.655725698734784,57.16611635588649 A41,41 100 0,1 6.546439093496673,49.45085854877344 L 11.540775789411711,49.212948969654725 A36,36 100 0,0 12.51478354035249,55.987321678339356 L 7.655725698734784,57.16611635588649 z"
                                          fill="#94c11c"
                                          stroke="#94c11c"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M6.546439093496673,49.45085854877344 A41,41 100 0,1 6.546439093496673,45.54914145122655 L 11.540775789411711,45.78705103034526 A36,36 100 0,0 11.540775789411711,49.212948969654725 L 6.546439093496673,49.45085854877344 z"
                                          fill="#fff"
                                          stroke="#fff"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M6.546439093496673,45.54914145122655 A41,41 100 0,1 7.655725698734798,37.833883644113456 L 12.514783540352504,39.0126783216606 A36,36 100 0,0 11.540775789411711,45.78705103034526 L 6.546439093496673,45.54914145122655 z"
                                          fill="#94c11c"
                                          stroke="#94c11c"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M7.655725698734798,37.833883644113456 A41,41 100 0,1 8.754966432698595,34.0902135039857 L 13.479970526271941,35.725553320572814 A36,36 100 0,0 12.514783540352504,39.0126783216606 L 7.655725698734798,37.833883644113456 z"
                                          fill="#fff"
                                          stroke="#fff"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M8.754966432698595,34.0902135039857 A41,41 100 0,1 11.992958444838024,26.999999999999982 L 16.323085463760215,29.499999999999986 A36,36 100 0,0 13.479970526271941,35.725553320572814 L 8.754966432698595,34.0902135039857 z"
                                          fill="#94c11c"
                                          stroke="#94c11c"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M11.992958444838024,26.999999999999982 A41,41 100 0,1 14.102385965936243,23.71766670758087 L 18.175265726187916,26.617951255436864 A36,36 100 0,0 16.323085463760215,29.499999999999986 L 11.992958444838024,26.999999999999982 z"
                                          fill="#fff"
                                          stroke="#fff"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M14.102385965936243,23.71766670758087 A41,41 100 0,1 19.206760529233417,17.826904437692118 L 22.657155586643974,21.445574628217468 A36,36 100 0,0 18.175265726187916,26.617951255436864 L 14.102385965936243,23.71766670758087 z"
                                          fill="#94c11c"
                                          stroke="#94c11c"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M19.206760529233417,17.826904437692118 A41,41 100 0,1 22.15548156495521,15.271823115545693 L 25.246276496058233,19.202088589259635 A36,36 100 0,0 22.657155586643974,21.445574628217468 L 19.206760529233417,17.826904437692118 z"
                                          fill="#fff"
                                          stroke="#fff"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M22.15548156495521,15.271823115545693 A41,41 100 0,1 28.71271260917618,11.05774660514814 L 31.00384521781323,15.501923848422756 A36,36 100 0,0 25.246276496058233,19.202088589259635 L 22.15548156495521,15.271823115545693 z"
                                          fill="#94c11c"
                                          stroke="#94c11c"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M28.71271260917618,11.05774660514814 A41,41 100 0,1 32.2618393179266,9.43691474634101 L 34.12015159622823,14.078754411421379 A36,36 100 0,0 31.00384521781323,15.501923848422756 L 28.71271260917618,11.05774660514814 z"
                                          fill="#fff"
                                          stroke="#fff"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M32.2618393179266,9.43691474634101 A41,41 100 0,1 39.7406989812232,7.240923412229023 L 40.68695520302525,12.150566898542557 A36,36 100 0,0 34.12015159622823,14.078754411421379 L 32.2618393179266,9.43691474634101 z"
                                          fill="#919191"
                                          stroke="#919191"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M39.7406989812232,7.240923412229023 A41,41 100 0,1 43.60270222452853,6.685651174503526 L 44.07798244104944,11.663010787368954 A36,36 100 0,0 40.68695520302525,12.150566898542557 L 39.7406989812232,7.240923412229023 z"
                                          fill="#fff"
                                          stroke="#fff"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M43.60270222452853,6.685651174503526 A41,41 100 0,1 51.397297775471515,6.685651174503533 L 50.9220175589506,11.663010787368954 A36,36 100 0,0 44.07798244104944,11.663010787368954 L 43.60270222452853,6.685651174503526 z"
                                          fill="#919191"
                                          stroke="#919191"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M51.397297775471515,6.685651174503533 A41,41 100 0,1 55.25930101877683,7.24092341222903 L 54.31304479697478,12.150566898542564 A36,36 100 0,0 50.9220175589506,11.663010787368954 L 51.397297775471515,6.685651174503533 z"
                                          fill="#fff"
                                          stroke="#fff"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M55.25930101877683,7.24092341222903 A41,41 100 0,1 62.73816068207346,9.436914746341039 L 60.879848403771824,14.0787544114214 A36,36 100 0,0 54.31304479697478,12.150566898542564 L 55.25930101877683,7.24092341222903 z"
                                          fill="#919191"
                                          stroke="#919191"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M62.73816068207346,9.436914746341039 A41,41 100 0,1 66.28728739082386,11.057746605148154 L 63.99615478218681,15.50192384842277 A36,36 100 0,0 60.879848403771824,14.0787544114214 L 62.73816068207346,9.436914746341039 z"
                                          fill="#fff"
                                          stroke="#fff"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M66.28728739082386,11.057746605148154 A41,41 100 0,1 72.84451843504485,15.271823115545729 L 69.75372350394181,19.202088589259667 A36,36 100 0,0 63.99615478218681,15.50192384842277 L 66.28728739082386,11.057746605148154 z"
                                          fill="#919191"
                                          stroke="#919191"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M72.84451843504485,15.271823115545729 A41,41 100 0,1 75.79323947076662,17.826904437692143 L 72.34284441335606,21.445574628217493 A36,36 100 0,0 69.75372350394181,19.202088589259667 L 72.84451843504485,15.271823115545729 z"
                                          fill="#fff"
                                          stroke="#fff"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M75.79323947076662,17.826904437692143 A41,41 100 0,1 80.89761403406379,23.717666707580907 L 76.82473427381211,26.617951255436893 A36,36 100 0,0 72.34284441335606,21.445574628217493 L 75.79323947076662,17.826904437692143 z"
                                          fill="#919191"
                                          stroke="#919191"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M80.89761403406379,23.717666707580907 A41,41 100 0,1 83.00704155516199,27.00000000000001 L 78.67691453623979,29.500000000000007 A36,36 100 0,0 76.82473427381211,26.617951255436893 L 80.89761403406379,23.717666707580907 z"
                                          fill="#fff"
                                          stroke="#fff"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M83.00704155516199,27.00000000000001 A41,41 100 0,1 86.24503356730142,34.09021350398573 L 81.52002947372807,35.725553320572836 A36,36 100 0,0 78.67691453623979,29.500000000000007 L 83.00704155516199,27.00000000000001 z"
                                          fill="#919191"
                                          stroke="#919191"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M86.24503356730142,34.09021350398573 A41,41 100 0,1 87.34427430126522,37.8338836441135 L 82.4852164596475,39.01267832166064 A36,36 100 0,0 81.52002947372807,35.725553320572836 L 86.24503356730142,34.09021350398573 z"
                                          fill="#fff"
                                          stroke="#fff"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M87.34427430126522,37.8338836441135 A41,41 100 0,1 88.45356090650333,45.549141451226596 L 83.45922421058829,45.7870510303453 A36,36 100 0,0 82.4852164596475,39.01267832166064 L 87.34427430126522,37.8338836441135 z"
                                          fill="#919191"
                                          stroke="#919191"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M88.45356090650333,45.549141451226596 A41,41 100 0,1 88.45356090650333,49.450858548773446 L 83.45922421058829,49.21294896965473 A36,36 100 0,0 83.45922421058829,45.7870510303453 L 88.45356090650333,45.549141451226596 z"
                                          fill="#fff"
                                          stroke="#fff"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M88.45356090650333,49.450858548773446 A41,41 100 0,1 87.3442743012652,57.16611635588654 L 82.48521645964749,55.9873216783394 A36,36 100 0,0 83.45922421058829,49.21294896965473 L 88.45356090650333,49.450858548773446 z"
                                          fill="#919191"
                                          stroke="#919191"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M87.3442743012652,57.16611635588654 A41,41 100 0,1 86.2450335673014,60.90978649601431 L 81.52002947372806,59.2744466794272 A36,36 100 0,0 82.48521645964749,55.9873216783394 L 87.3442743012652,57.16611635588654 z"
                                          fill="#fff"
                                          stroke="#fff"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M86.2450335673014,60.90978649601431 A41,41 100 0,1 83.00704155516198,68.00000000000003 L 78.67691453623978,65.50000000000003 A36,36 100 0,0 81.52002947372806,59.2744466794272 L 86.2450335673014,60.90978649601431 z"
                                          fill="#919191"
                                          stroke="#919191"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <text
                                          className="jqx-gauge-caption"
                                          cursor="default"
                                          x={58}
                                          y={81}
                                          width={0}
                                          height={0}>
                                          0
                                        </text>
                                        <path
                                          d="M 47.5,47.86602540378444 L 46.5,46.13397459621556 L 14.091034656191319,65.99999999999997"
                                          z-index={0}
                                          stroke="#7FD13B"
                                          fill="#7FD13B"
                                          strokeWidth={1}
                                          style={{ visibility: "visible" }}
                                        />
                                        <circle
                                          cx="47.5"
                                          cy="47.5"
                                          r={1}
                                          fill="#7FD13B"
                                          strokeWidth="1px"
                                          stroke="#7FD13B"
                                          z-index={30}
                                          style={{ visibility: "visible" }}
                                        />
                                      </svg>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <span style={{ display: "block" }}>RPM</span>
                      </div>
                      <div
                        className="gauge-temsh"
                        ng-hide="devType=='2' || devType=='3'">
                        <div
                          id="gauge-temp2"
                          className="gauge-third jqx-widget"
                          aria-valuenow={0}
                          aria-valuemin={0}
                          aria-valuemax={220}
                          aria-disabled="false"
                          style={{ width: 100, height: 100 }}>
                          <div style={{ width: 100, height: 100 }}>
                            <table
                              className="tblChart"
                              cellSpacing={0}
                              cellPadding={0}
                              border={0}
                              align="left"
                              valign="top">
                              <tbody>
                                <tr>
                                  <td colSpan={2} className="tdTop" />
                                </tr>
                                <tr>
                                  <td className="tdLeft" />
                                  <td>
                                    <div
                                      className="chartContainer"
                                      style={{
                                        position: "relative",
                                        width: 100,
                                        height: 100,
                                        overflow: "hidden",
                                      }}
                                      onselectstart="return false;">
                                      <svg
                                        id="svgChart"
                                        version="1.1"
                                        width="100%"
                                        height="100%"
                                        overflow="hidden">
                                        <defs>
                                          <linearGradient
                                            x1="0%"
                                            y1="0%"
                                            x2="0%"
                                            y2="100%"
                                            id="grd1590249897410ffffffv"
                                          />
                                        </defs>
                                        <circle
                                          cx="47.5"
                                          cy="47.5"
                                          r={43}
                                          stroke="transparent"
                                          strokeWidth="3px"
                                          fill="transparent"
                                        />
                                        <path
                                          d="M11.126933041053562,68.49999999999997 A42,42 100 0,1 6.683914130411239,57.40187529139592 L 9.599348835381868,56.69459848486764 A39,39 100 0,0 13.725009252406878,66.99999999999997 L 11.126933041053562,68.49999999999997 z"
                                          fill="#919191"
                                          stroke="#919191"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M6.683914130411239,57.40187529139592 A42,42 100 0,1 5.927499441000819,53.47722320747796 L 8.896963766643623,53.05027869265811 A39,39 100 0,0 9.599348835381868,56.69459848486764 L 6.683914130411239,57.40187529139592 z"
                                          fill="#fff"
                                          stroke="#fff"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M5.927499441000819,53.47722320747796 A42,42 100 0,1 5.927499441000833,41.52277679252198 L 8.89696376664363,41.94972130734184 A39,39 100 0,0 8.896963766643623,53.05027869265811 L 5.927499441000819,53.47722320747796 z"
                                          fill="#919191"
                                          stroke="#919191"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M5.927499441000833,41.52277679252198 A42,42 100 0,1 6.683914130411253,37.59812470860403 L 9.599348835381882,38.30540151513232 A39,39 100 0,0 8.89696376664363,41.94972130734184 L 5.927499441000833,41.52277679252198 z"
                                          fill="#fff"
                                          stroke="#fff"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M6.683914130411253,37.59812470860403 A42,42 100 0,1 11.126933041053583,26.499999999999982 L 13.725009252406899,27.999999999999982 A39,39 100 0,0 9.599348835381882,38.30540151513232 L 6.683914130411253,37.59812470860403 z"
                                          fill="#94c11c"
                                          stroke="#94c11c"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M11.126933041053583,26.499999999999982 A42,42 100 0,1 13.287810013885903,23.137609798009674 L 15.73153787003691,24.877780526723267 A39,39 100 0,0 13.725009252406899,27.999999999999982 L 11.126933041053583,26.499999999999982 z"
                                          fill="#fff"
                                          stroke="#fff"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M13.287810013885903,23.137609798009674 A42,42 100 0,1 21.537322578734607,14.485770020802903 L 23.39179953739642,16.84392930503127 A39,39 100 0,0 15.73153787003691,24.877780526723267 L 13.287810013885903,23.137609798009674 z"
                                          fill="#94c11c"
                                          stroke="#94c11c"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M21.537322578734607,14.485770020802903 A42,42 100 0,1 24.79308566686492,12.167351621090383 L 26.415008119231707,14.691112219583921 A39,39 100 0,0 23.39179953739642,16.84392930503127 L 21.537322578734607,14.485770020802903 z"
                                          fill="#fff"
                                          stroke="#fff"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M24.79308566686492,12.167351621090383 A42,42 100 0,1 35.667232612659966,7.201295108191104 L 36.51243028318425,10.079774029034596 A39,39 100 0,0 26.415008119231707,14.691112219583921 L 24.79308566686492,12.167351621090383 z"
                                          fill="#e71515"
                                          stroke="#e71515"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M35.667232612659966,7.201295108191104 A42,42 100 0,1 39.551447736862784,6.258994714966313 L 40.11920146994402,9.204780806754435 A39,39 100 0,0 36.51243028318425,10.079774029034596 L 35.667232612659966,7.201295108191104 z"
                                          fill="#fff"
                                          stroke="#fff"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M39.551447736862784,6.258994714966313 A42,42 100 0,1 51.4923538187757,5.690179251930445 L 51.20718568886315,8.676595019649703 A39,39 100 0,0 40.11920146994402,9.204780806754435 L 39.551447736862784,6.258994714966313 z"
                                          fill="#e71515"
                                          stroke="#e71515"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M51.4923538187757,5.690179251930445 A42,42 100 0,1 55.44855226313724,6.25899471496632 L 54.88079853005601,9.204780806754442 A39,39 100 0,0 51.20718568886315,8.676595019649703 L 51.4923538187757,5.690179251930445 z"
                                          fill="#fff"
                                          stroke="#fff"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M55.44855226313724,6.25899471496632 A42,42 100 0,1 66.74551391255127,10.16891115649323 L 65.37083434736904,12.835417502458 A39,39 100 0,0 54.88079853005601,9.204780806754442 L 55.44855226313724,6.25899471496632 z"
                                          fill="#e83380"
                                          stroke="#e83380"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M66.74551391255127,10.16891115649323 A42,42 100 0,1 70.20691433313512,12.167351621090404 L 68.58499188076833,14.691112219583943 A39,39 100 0,0 65.37083434736904,12.835417502458 L 66.74551391255127,10.16891115649323 z"
                                          fill="#fff"
                                          stroke="#fff"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M70.20691433313512,12.167351621090404 A42,42 100 0,1 79.24148212287886,19.99584917429806 L 76.97423339981609,21.96043137613391 A39,39 100 0,0 68.58499188076833,14.691112219583943 L 70.20691433313512,12.167351621090404 z"
                                          fill="#e83380"
                                          stroke="#e83380"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M66.74551391255127,10.16891115649323 A42,42 100 0,1 70.20691433313512,12.167351621090404 L 68.58499188076833,14.691112219583943 A39,39 100 0,0 65.37083434736904,12.835417502458 L 66.74551391255127,10.16891115649323 z"
                                          fill="#fff"
                                          stroke="#fff"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M70.20691433313512,12.167351621090404 A42,42 100 0,1 79.24148212287886,19.99584917429806 L 76.97423339981609,21.96043137613391 A39,39 100 0,0 68.58499188076833,14.691112219583943 L 70.20691433313512,12.167351621090404 z"
                                          fill="#e83380"
                                          stroke="#e83380"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M79.24148212287886,19.99584917429806 A42,42 100 0,1 81.71218998611413,23.13760979800971 L 79.26846212996311,24.877780526723303 A39,39 100 0,0 76.97423339981609,21.96043137613391 L 79.24148212287886,19.99584917429806 z"
                                          fill="#fff"
                                          stroke="#fff"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M81.71218998611413,23.13760979800971 A42,42 100 0,1 87.19003438601608,33.763145540668305 L 84.35503192987207,34.744349430620574 A39,39 100 0,0 79.26846212996311,24.877780526723303 L 81.71218998611413,23.13760979800971 z"
                                          fill="#e83380"
                                          stroke="#e83380"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M87.19003438601608,33.763145540668305 A42,42 100 0,1 88.31608586958876,37.598124708604075 L 85.40065116461813,38.30540151513236 A39,39 100 0,0 84.35503192987207,34.744349430620574 L 87.19003438601608,33.763145540668305 z"
                                          fill="#fff"
                                          stroke="#fff"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M88.31608586958876,37.598124708604075 A42,42 100 0,1 89.45242824568633,49.49844046459719 L 86.45582622813731,49.355694717125964 A39,39 100 0,0 85.40065116461813,38.30540151513236 L 88.31608586958876,37.598124708604075 z"
                                          fill="#e83380"
                                          stroke="#e83380"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M89.45242824568633,49.49844046459719 A42,42 100 0,1 89.07250055899917,53.47722320747799 L 86.10303623335638,53.05027869265814 A39,39 100 0,0 86.45582622813731,49.355694717125964 L 89.45242824568633,49.49844046459719 z"
                                          fill="#fff"
                                          stroke="#fff"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <path
                                          d="M89.07250055899917,53.47722320747799 A42,42 100 0,1 83.87306695894641,68.50000000000003 L 81.2749907475931,67.00000000000003 A39,39 100 0,0 86.10303623335638,53.05027869265814 L 89.07250055899917,53.47722320747799 z"
                                          fill="#e83380"
                                          stroke="#e83380"
                                          visibility="visible"
                                          className="jqx-gauge-range"
                                        />
                                        <text
                                          className="jqx-gauge-caption"
                                          cursor="default"
                                          x={48}
                                          y={71}
                                          width={0}
                                          height={0}
                                        />
                                        <path
                                          d="M 47,47 L 47,47 L 21.01923788646683,61.99999999999998"
                                          z-index={0}
                                          stroke="#7FD13B"
                                          fill="#7FD13B"
                                          strokeWidth={1}
                                          style={{ visibility: "hidden" }}
                                        />
                                        <circle
                                          cx="47.5"
                                          cy="47.5"
                                          r={1}
                                          fill="#7FD13B"
                                          strokeWidth="1px"
                                          stroke="#7FD13B"
                                          z-index={30}
                                          style={{ visibility: "visible" }}
                                        />
                                      </svg>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <span className="title-temp ng-binding">
                          <span className="tempvalue_ ng-binding">-</span>°C
                          TEMP
                        </span>
                        <div className="guage-tembarsh">
                          <canvas width={23} height={58} />
                        </div>
                        <span className="cool-temp ng-binding">C</span>
                        <span className="hot-temp ng-binding">H</span>
                      </div>
                    </div>
                  </div>
                  <div className="clear" />
                </div>
              </div>
            </div>
            <div
              style={{
                // background: "red",
                background:
                  " linear-gradient(135deg, rgba(0, 4, 53, 0.8) 0%, rgba(0, 4, 53, 0.8) 100%)",
                position: "relative",
                right: 850,
                top: 200,
                borderRadius: "10px",

                boxShadow: " 0 0px 18px rgba(221, 221, 62, 1)",
              }}>
              <LampModal
                isOpen={modalIsOpen}
                closeModal={closeModal}
                closeModalReq={setModalIsOpen}
                liveDeviceData={liveDeviceData}
              />
              {/* <StreetLightModal
                isOpen={streetLightOpen}
                // isOpen={modalIsOpen}
                closeModalReq={setStreetLightOpen}
                // closeModalReq={setModalIsOpen}
                liveDeviceData={liveDeviceData}
              /> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
