import React, {
  useState,
  useEffect,
  useRef,
  createRef,
  useCallback,
} from "react";
import {
  GoogleMap,
  useLoadScript,
  Polyline,
  Marker,
} from "@react-google-maps/api";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import { Accordion } from "react-bootstrap";
import { RadialGauge } from "react-canvas-gauges";
import axios from "axios";
import classnames from "classnames";
import { ToastContainer, toast } from "react-toastify";

// import html2canvas from 'html2canvas';
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

import useMoveMarker from "./useMoveMarker";

import styles from "./style.module.css";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function ReplayHistory() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDsNytQySdV_bOGyy7BPJBHJf5aRAKZmh8",
  });
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const [listOfAllDevices, setListOfAllDevices] = useState([]);
  const [listOfAllTrips, setListOfAllTrips] = useState([]);
  const [markerStart, setMarkerStart] = useState();
  const [coor, setCoor] = useState({ lat: 33.698123, lng: 72.971461 });
  const [center, setCenter] = useState({ lat: 33.698123, lng: 72.971461 });
  const [activeTab, setActiveTab] = useState();
  const [activeTabSlected, setActiveTabSelected] = useState();
  const [openTracks, setOpenTracks] = useState(false);
  const [openListDevices, setOpenListDevices] = useState(true);
  const [screenShot, setScreenShot] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState();
  const [selectedTrackId, setSelectedTrackId] = useState();
  const [playTrack, setPlayTrack] = useState(false);
  const [pathData, setPathData] = useState();
  const [mapLine, setMapLine] = useState([]);
  const [vehicle, setVehicle] = useState("");
  const [IMEI, setIMEI] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [speed, setSpeed] = useState(0);
  const [mileage, setMileage] = useState("");
  const [alarms, setAlarms] = useState("");
  const [playing, setPlaying] = useState("Pause");
  const [sliderValue, setSliderValue] = useState(0);
  const [slidermaxValue, setSlidermaxValue] = useState(0);
  const [trackSpeed, setTrackSpeed] = useState(100);
  const [map, setMap] = React.useState(null);

  const [mapCheck, setMapCheck] = useState(null);

  const mapRef = useRef(null);

  // const handleCaptureClick = useCallback(() => {
  //   if (!mapRef.current) {
  //     return;
  //   }
  //   setTimeout(() => {
  //     html2canvas(mapRef.current).then(canvas => {
  //       const link = document.createElement('a');
  //       link.download = 'map-screenshot.png';
  //       link.href = canvas.toDataURL();
  //       link.click();
  //     });
  //   }, 100);
  // }, [mapRef]);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const [ButtonText, SetButtonText] = useState("Play");

  const buttonTextRef = useRef();

  const ref = createRef(null);

  function handleMapLoad(map) {
    setMapCheck(map);
  }

  // function handleScreenshot() {
  //   const mapCanvas = mapCheck && mapCheck.getDiv();
  //   html2canvas(mapCanvas).then(canvas => {
  //     const imgData = canvas.toDataURL('image/png');
  //     const link = document.createElement('a');
  //     link.download = 'map-screenshot.png';
  //     link.href = imgData;
  //     link.click();
  //   });
  // }

  // useEffect(() => {
  //   buttonTextRef.current = playing;
  // }, [playing]);

  useEffect(() => {
    buttonTextRef.current = ButtonText;
  }, [ButtonText]);

  const print = async () => {
    for (var i = 0; i < 100; i++) {
      await delay(1000);
      if (buttonTextRef.current === "Play") {
        break;
      }
      console.log(buttonTextRef.current + " " + ButtonText + " " + i);
    }
  };

  const ToggleButtonText = () => {
    if (ButtonText == "Play") {
      SetButtonText("Pause");
      //print();
    }

    if (ButtonText == "Pause") SetButtonText("Play");

    console.log("button changed to " + buttonTextRef.current + ButtonText);
  };

  const google = window.google;
  const bounds = new google.maps.LatLngBounds();

  const containerStyle = {
    width: "100%",
    height: "100%",
    minHeight: windowDimensions.height - 65,
  };

  const optionMap = {
    disableDefaultUI: true,
    zoomControl: true,
    fullscreenControl: false,
  };

  const onLoad = (polyline) => {
    console.log("polyline: ", polyline);
  };

  const fetchDataDevices = React.useCallback(() => {
    const token = localStorage.getItem("TrackerToken");
    axios({
      method: "GET",
      url: "https://server.localiveiot.com/api/vehicles",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        let initialData = response.data.data;
        setListOfAllDevices(initialData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchDataDevices();
  }, [fetchDataDevices]);

  const fetchData = React.useCallback(() => {
    axios({
      method: "GET",
      url: "http://localhost:5002/map-path",
    })
      .then((response) => {
        setPathData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // useEffect(() => {
  //   fetchData()
  // }, [fetchData])

  const Pause = ({ onPlayerClick }) => {
    return (
      <svg
        className="button"
        viewBox="0 0 60 60"
        onClick={onPlayerClick}
        style={{ width: "30px" }}>
        <polygon points="0,0 15,0 15,60 0,60" />
        <polygon points="25,0 40,0 40,60 25,60" />
      </svg>
    );
  };

  const Play = ({ onPlayerClick }) => {
    return (
      <svg
        className="button"
        viewBox="0 0 60 60"
        onClick={onPlayerClick}
        style={{ width: "30px" }}>
        <polygon points="0,0 50,30 0,60" />
      </svg>
    );
  };

  const handlePlayerClick = () => {
    if (playing == "Pause") {
      setPlaying("Play");
      console.log(buttonTextRef.current);
    } else {
      setPlaying("Pause");
      console.log(buttonTextRef.current);
    }
  };

  const handleMoving = (track) => {
    setSelectedTrackId(track);

    const token = localStorage.getItem("TrackerToken");

    axios({
      method: "POST",
      url: "https://server.localiveiot.com/api/devices/trips/replay",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        device_id: selectedDeviceId.toString(),
        trip_id: track,
      },
    })
      .then(async (response) => {
        let initialData = response.data.data;
        setPathData(initialData);
        let arr = [];
        initialData.forEach((element) => {
          arr.push(element.coordinates);
        });
        setMapLine(arr);

        setMarkerStart(initialData[0].coordinates);
        let array = [...initialData];
        setSlidermaxValue(array.length);
        SetButtonText("Play");
        // testing(array);
        checkForDuplicates(array);
        setOpenTracks(false);
        setOpenListDevices(false);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log("This is error: ", error.response);
      });
  };

  function checkForDuplicates(array) {
    let valuesAlreadySeen = [];
    let valuechecklat = null;
    let valuechecklng = null;

    for (let i = 0; i < array.length; i++) {
      let value = array[i];
      if (
        value.coordinates.lat !== valuechecklat ||
        value.coordinates.lng !== valuechecklng
      ) {
        valuesAlreadySeen.push(value);
        valuechecklat = value.coordinates.lat;
        valuechecklng = value.coordinates.lng;
      } else {
        valuechecklat = value.coordinates.lat;
        valuechecklng = value.coordinates.lng;
      }
    }
    console.log("look", valuesAlreadySeen);
    testing(valuesAlreadySeen);
    return false;
  }

  //{"lat":33.7112, "lng": 73.1316}
  const testing = async (array) => {
    for (var x = 0, ln = array.length; x < ln; x++) {
      await delay(trackSpeed);
      // var result = (array[x].coordinates);
      //   transition(result);
      setCoor(array[x].coordinates);
      setCurrentCoordinates([
        array[x].coordinates.lat,
        array[x].coordinates.lng,
      ]);
      // console.log("here",array[x].coordinates);
      setCenter(array[x].coordinates);
      setVehicle(array[x].vehicle);
      setIMEI(array[x].imei);
      setDate(array[x].date);
      setTime(array[x].time);
      setLongitude(array[x].coordinates.lng);
      setLatitude(array[x].coordinates.lat);
      setSpeed(array[x].speed);
      setMileage(array[x].mileage);
      setAlarms(array[x].alarms);
      setSliderValue(x);
      if (x === array.length - 1) {
        console.log("done");
        // setPlayTrack(false);
        // setOpenTracks(true);
        setScreenShot(true);
      }
      if (buttonTextRef.current === "Pause") {
        setScreenShot(true);

        break;
      }
      // if (buttonTextRef.current === "Play") {
      //   break;
      // }
    }
  };

  //       var numDeltas = 100;
  // var delay1 = 10; //milliseconds
  // var i = 0;
  // var deltaLat;
  // var deltaLng;

  // function transition(result){
  //     i = 0;
  //     deltaLat = (result.lat - coor.lat)/numDeltas;
  //     deltaLng = (result.lng - coor.lng)/numDeltas;
  //     moveMarker();
  // }

  // function moveMarker(){
  //     const lat1 = coor.lat + deltaLat;
  //     const lng1 = coor.lng + deltaLng;
  //     setCoor({"lat": lat1, "lng": lng1 })
  //     if(i!=numDeltas){
  //         i++;
  //         setTimeout(moveMarker, delay1);
  //     }
  //     console.log("reach", {"lat": lat1, "lng": lng1 })
  // }

  // useEffect(() => {

  //   if (pathData) {
  //    let array = [...pathData];

  //     if (playing === false) {
  //     for (var x = 0, ln = array.length; x < ln; x++) {

  //       let timer =  setTimeout(function(y) {
  //         setCoor(array[y].coordinates);
  //         setCenter(array[y].coordinates);
  //         setVehicle(array[y].vehicle);
  //         setIMEI(array[y].imei);
  //         setDate(array[y].date);
  //         setTime(array[y].time);
  //         setLongitude(array[y].coordinates.lng);
  //         setLatitude(array[y].coordinates.lat);
  //         setSpeed(array[y].speed);
  //         setMileage(array[y].mileage);
  //         setAlarms(array[y].alarms);
  //         setSliderValue(y);
  //         console.log(playing)
  //     }, x * trackSpeed, x); // we're passing x

  //     }}}

  // }, [pathData, trackSpeed,playing, selectedTrackId])

  // const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const trackCycle = (x, array) => {
    setTimeout(
      function (y) {
        //setCoor(array[y].coordinates);
        setCenter(array[y].coordinates);
        setVehicle(array[y].vehicle);
        setIMEI(array[y].imei);
        setDate(array[y].date);
        setTime(array[y].time);
        setLongitude(array[y].coordinates.lng);
        setLatitude(array[y].coordinates.lat);
        setSpeed(array[y].speed);
        setMileage(array[y].mileage);
        setAlarms(array[y].alarms);
        setSliderValue(y);
        if (x === array.length - 1) {
          console.log("done");
          // setPlayTrack(false);
          // setOpenTracks(true);
          setScreenShot(true);
        }
      },
      x * trackSpeed,
      x
    ); // we're passing x
  };

  const tracksData = (device) => {
    setSelectedDeviceId(device);

    const token = localStorage.getItem("TrackerToken");

    axios({
      method: "POST",
      url: "https://server.localiveiot.com/api/devices/trips",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        device_id: device.toString(),
      },
    })
      .then((response) => {
        let initialData = response.data.data;
        initialData.forEach((element, index) => {
          if (index === 2) {
            element.selectedTab = true;
          } else {
            element.selectedTab = false;
          }
        });
        const updatedMainArray = initialData.map((obj) => {
          const uniqueObjects = {};
          const resultTracks = [];

          obj.day_tracks.forEach((track) => {
            const tripId = track.trip_id;
            if (!uniqueObjects[tripId]) {
              uniqueObjects[tripId] = true;
              resultTracks.push(track);
            }
          });

          return {
            ...obj,
            day_tracks: resultTracks,
          };
        });
        setListOfAllTrips(updatedMainArray);
        console.log("final array", updatedMainArray);
        setOpenTracks(true);
        setOpenListDevices(false);
        console.log(initialData);
      })
      .catch((error) => {
        console.log("This is error: ", error.response);
        toast(`${error.response.data.message}`);
      });
  };

  const onLoadMap = React.useCallback(function callback(map) {
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const toggleTab = (i, tab, index) => {
    if (activeTab !== i) {
      setActiveTab(i);
      setActiveTabSelected(tab);
      console.log(tab, index);
    }
  };

  const controlSpeed = (value) => {
    if (value === "1") {
      let newVal = trackSpeed + 100;
      setTrackSpeed(newVal);
      console.log("new", newVal);
    }

    if (value === "-1") {
      let newVal = trackSpeed - 100;
      setTrackSpeed(newVal);
      console.log("new", newVal);
    }
  };
  let [currentCoordinates, setCurrentCoordinates] = useState([
    33.698123, 72.971461,
  ]);

  const options = {
    strokeColor: "#E93380",
    strokeOpacity: 0.8,
    strokeWeight: 5,
    fillColor: "#E93380",
    fillOpacity: 0.5,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    zIndex: 1,
  };

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";
  return (
    <section id="main" ref={ref}>
      <div className="container-fluid">
        <ToastContainer />
        <GoogleMap
          id="marker-example"
          mapContainerStyle={containerStyle}
          zoom={14}
          center={center}
          options={optionMap}
          onLoad={handleMapLoad}
          ref={mapRef}

          // onClick={e => {
          //   setCurrentCoordinates([e.latLng.lat(), e.latLng.lng()]);
          // }}
        >
          <Polyline onLoad={onLoad} path={mapLine} options={options} />

          {/* <TravellingMarker

            position={{
              lat: currentCoordinates[0],
              lng: currentCoordinates[1]
            }}
          /> */}

          <Marker
            key="start"
            position={markerStart}
            icon={{
              url: "/start-icon.png",
              scaledSize: new window.google.maps.Size(20, 20),
            }}
          />
          <Marker
            key="end"
            position={coor}
            animation={2}
            icon={{
              url: "/pin1.png",
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        </GoogleMap>
      </div>
      <div className="trackReplyScreen ng-scope">
        {playTrack && (
          <div
            className={styles.boxpop}
            style={{ backgroundColor: "transparent", boxShadow: "none" }}>
            <div className="arrow" />

            {screenShot == false ? (
              <div>
                <div className={styles.dropboxrightback}>
                  <div>
                    <div className="clear" />
                    <div
                      className="row"
                      style={{ marginTop: "10px", marginLeft: "10px" }}>
                      <div className="col-4">
                        <button
                          className="btn btn-primary"
                          onClick={() => ToggleButtonText()}>
                          {ButtonText === "Play" ? "Stop" : "Play"}
                        </button>
                      </div>
                      <div className="col-8">
                        <span
                          style={{
                            color: "#E93380",
                            display: "block",
                            fontSize: "20px",
                            fontWeight: "500",
                            textAlign: "center",
                          }}>
                          Current Value : {sliderValue}
                        </span>
                      </div>
                      {/* <div className= 'col-5' >
                    <Autocomplete>
                  <Box width={200}  style={{index: 999}}>
                  
                    <Slider min={0} max={slidermaxValue} value= {sliderValue} aria-label="Default"/>
                 
                  </Box>
                  </Autocomplete>
                  </div> */}
                      {/* <div className='row col-4'>
                    <span className='col-3'><AiFillStepBackward size={25} onClick = {() => {controlSpeed('-1')}}/></span>
                    <div className='col'>
                    <span className="pull-right" style = {{display: 'block', fontSize: '14px', fontWeight: '500', textAlign: 'center'}}>
                              Replay
                              <span style = {{color:'#0986FF', display: 'block', fontSize: '20px', fontWeight: '500', textAlign: 'center'}}>
                              Speed
                              
                      </span>
                      </span>
                     
                      </div>
                      <span className='col-3'><AiFillStepForward size={25} onClick = {() => {controlSpeed('1')}}/></span>
                    </div> */}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className={styles.dropboxrightback}>
                  <div className="search-drob-head full-width-float">
                    <div className="clear" />
                    <div className="row">
                      <div className="col">
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            setPlayTrack(false);
                            setOpenTracks(true);
                          }}>
                          Back
                        </button>
                      </div>
                      {/* <div className="col" >
                  <button className='btn btn-primary' onClick={handleCaptureClick}>Share</button>
                  </div> */}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {openListDevices && (
          <div
            className="box-pop fade right in displayBlock"
            style={{
              backgroundColor: "transparent",
              boxShadow: "none",
              left: "0px",
              top: "-10px",
            }}>
            <div className="arrow" />
            <div>
              <div className={styles.dropboxright}>
                <div className="search-drob-head full-width-float">
                  <div className="clear" />
                  <Accordion
                    className="panel panel-default"
                    defaultActiveKey="0">
                    <Accordion.Item
                      eventKey="0"
                      style={{
                        borderColor: "transparent",
                        borderRadius: "50px",
                      }}>
                      <Accordion.Header
                        style={{
                          margin: "0",
                          paddingTop: "10px",
                          borderRadius: "25px",
                        }}>
                        <h4 className={styles.paneltitle}>
                          <span className="ng-binding">MY DEVICES</span>
                        </h4>
                      </Accordion.Header>
                      <Accordion.Body>
                        <div
                          className="panel-body max-height-panel-sub content1 ng-isolate-scope mCustomScrollbar _mCS_18 mCS-autoHide mCS_no_scrollbar"
                          ng-m-custom-scroll
                          data-mcs-theme="minimal-dark"
                          style={{ position: "relative", overflow: "visible" }}>
                          <div
                            id="mCSB_18"
                            className="mCustomScrollBox mCS-minimal-dark mCSB_vertical_horizontal mCSB_outside"
                            style={{ maxHeight: "none" }}
                            tabIndex={0}>
                            <div
                              id="mCSB_18_container"
                              className="mCSB_container mCS_x_hidden mCS_no_scrollbar_x mCS_y_hidden mCS_no_scrollbar_y"
                              style={{
                                position: "relative",
                                top: 0,
                                left: 0,
                                width: "100%",
                              }}
                              dir="ltr">
                              {listOfAllDevices.map((item, index) => (
                                <li className="carLabel" key={index}>
                                  <span
                                    style={{ paddingRight: "10px" }}
                                    className="cn_item">
                                    <i className="sprite-icon-all car-icon" />
                                  </span>

                                  <span
                                    className="span-de ng-binding"
                                    style={{
                                      color: "#ADADB1",
                                      fontSize: "14px",
                                    }}>
                                    {item.registration_number}
                                  </span>

                                  <span
                                    className="pull-right"
                                    style={{
                                      color: "#A2A2A1",
                                      fontSize: "14px",
                                      cursor: "pointer",
                                      fontFamily: "Geogrotesque",
                                    }}
                                    onClick={() => tracksData(item.device_id)}>
                                    VIEW DETAILS
                                  </span>

                                  <hr style={{ margin: 5 }} />
                                </li>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        )}
        {openTracks && (
          <div
            className="box-pop"
            style={{
              backgroundColor: "transparent",
              boxShadow: "none",
              left: "0px",
              top: "-10px",
            }}>
            <div className="arrow" />
            <div>
              <div className={styles.dropboxright}>
                <div className="search-drob-head full-width-float">
                  <div className="clear" />
                  <div>
                    <div style={{ maxHeight: "500px" }} tabIndex={0}>
                      <div id="mCSB_18_container" dir="ltr">
                        <div class="head-track-data trackdata-content displayNone showdiv">
                          <a
                            onClick={() => {
                              setOpenListDevices(true);
                              setOpenTracks(false);
                            }}
                            class="cursorPointer"
                            tooltip="Back To Search"
                            tooltip-append-to-body="true"
                            tooltip-placement="top">
                            <i class="fa fa-angle-left" aria-hidden="true"></i>
                          </a>
                          <span class="data-titletr ng-binding">
                            Tracks data
                            <span class="text-secondary ng-binding">
                              ({selectedDeviceId})
                            </span>
                          </span>
                        </div>

                        {listOfAllTrips.map((item, index) => (
                          <div key={index}>
                            <div
                              id="mCSB_6"
                              className="mCustomScrollBox mCS-minimal-dark mCSB_vertical_horizontal mCSB_outside"
                              dir="ltr">
                              <div>
                                <div>
                                  <div className="track-data-sh-list">
                                    <div>
                                      <div className="float-left-left trak-left-cn">
                                        <div className="date-track">
                                          {item.date} -{" "}
                                          <strong>{item.day}</strong>
                                        </div>
                                        <div className="date-track-km">
                                          <span className="cn_item">
                                            <i
                                              uib-tooltip="Full Track"
                                              tooltip-append-to-body="true"
                                              tooltip-placement="right"
                                              className="sprite-icon-all trackplay-icon"></i>
                                          </span>{" "}
                                          {item.total_distance === null ? (
                                            <span>Coming Soon </span>
                                          ) : (
                                            item.total_distance
                                          )}
                                          <span className="ng-binding">
                                            kms
                                          </span>
                                        </div>
                                      </div>
                                      <div className="float-right-right trak-right-cn">
                                        <Nav tabs>
                                          <NavItem>
                                            <NavLink
                                              className={classnames({
                                                active:
                                                  activeTab === `1${index}`,
                                              })}
                                              onClick={() => {
                                                toggleTab(`1${index}`);
                                              }}>
                                              <span className="cn_item">
                                                <i className="sprite-icon-all distance1-icon" />
                                              </span>
                                              <span className="ng-binding">
                                                Track
                                                <br /> details
                                              </span>
                                            </NavLink>
                                          </NavItem>
                                          <NavItem>
                                            <NavLink
                                              className={classnames({
                                                active:
                                                  activeTab === `2${index}`,
                                              })}
                                              onClick={() => {
                                                toggleTab(`2${index}`);
                                              }}>
                                              <span className="cn_item">
                                                <i className="sprite-icon-all activity-icon" />
                                              </span>
                                              <span className="ng-binding">
                                                My
                                                <br /> activity
                                              </span>
                                            </NavLink>
                                          </NavItem>
                                        </Nav>
                                      </div>
                                      <TabContent activeTab={activeTab}>
                                        <TabPane tabId={`1${index}`}>
                                          <div className="tab-content all-status-sh-track full-width-float">
                                            <div className="tab-pane fade in active">
                                              <div className="row">
                                                <div className="col-4">
                                                  <div>
                                                    <div>
                                                      <span className="cn_item">
                                                        <i className="sprite-icon-all totaltime1-icon" />
                                                      </span>
                                                    </div>
                                                    <div className="status-track">
                                                      <span className="ng-binding">
                                                        Total time
                                                      </span>
                                                    </div>
                                                    <div>
                                                      <span
                                                        style={{
                                                          fontSize: "18px",
                                                        }}>
                                                        {item.total_time} hrs
                                                      </span>
                                                    </div>
                                                  </div>
                                                </div>

                                                <div className="col-4">
                                                  <div>
                                                    <div className="icon-mr">
                                                      <span className="cn_item ">
                                                        <i className="sprite-icon-all distance1-icon" />
                                                      </span>
                                                    </div>
                                                    <div className="status-track">
                                                      <span className="ng-binding">
                                                        Distance
                                                      </span>
                                                    </div>
                                                    <div className="status-track-time">
                                                      <span
                                                        style={{
                                                          fontSize: "18px",
                                                        }}>
                                                        {item.total_distance}
                                                        <span className="interval">
                                                          Kms
                                                        </span>
                                                      </span>
                                                    </div>
                                                  </div>
                                                </div>

                                                <div className="col-4">
                                                  <div>
                                                    <div className="icon-mr">
                                                      <span className="cn_item ">
                                                        <i className="sprite-icon-all avgspeed1-icon" />
                                                      </span>
                                                    </div>
                                                    <div className="status-track">
                                                      <span className="ng-binding">
                                                        Avg. speed
                                                      </span>
                                                    </div>
                                                    <div className="status-track-time">
                                                      <span
                                                        style={{
                                                          fontSize: "18px",
                                                        }}>
                                                        {item.avg_speed}
                                                        <span className="interval ng-binding">
                                                          km/hr
                                                        </span>
                                                      </span>
                                                    </div>
                                                  </div>
                                                </div>
                                                {/* <ul className="all-tracks-de">
                                                      <li className={styles.width10} >
                                                        <div className={styles.iconmr}>
                                                          <span className="cn_item ">
                                                            <i className="sprite-icon-all totaltime1-icon" />
                                                          </span>
                                                        </div>
                                                        <div className="status-track">
                                                          <span className="ng-binding">Total time</span>
                                                        </div>
                                                        <div className="status-track-time">
                                                          <span className="ng-binding">{item.total_time} hrs</span>
                                                        </div>
                                                      </li>
                                                      <li className="width1">
                                                        <div className="icon-mr">
                                                          <span className="cn_item "><i className="sprite-icon-all distance1-icon" /></span>
                                                        </div>
                                                        <div className="status-track">
                                                          <span className="ng-binding">Distance</span>
                                                        </div>
                                                        <div className="status-track-time">
                                                          <span className="ng-binding">
                                                            {item.total_distance}
                                                            <span className="interval">Kms</span>
                                                          </span>
                                                        </div>
                                                      </li>
                                                      <li className="width2">
                                                        <div className="icon-mr">
                                                          <span className="cn_item ">
                                                            <i className="sprite-icon-all avgspeed1-icon" />
                                                          </span>
                                                        </div>
                                                        <div className="status-track">
                                                          <span className="ng-binding">Avg. speed</span>
                                                        </div>
                                                        <div className="status-track-time">
                                                          <span className="ng-binding ng-scope">
                                                            {item.avg_speed}
                                                            <span className="interval ng-binding">km/hr</span>
                                                          </span>
                                                        </div>
                                                      </li>
                                                    </ul> */}
                                              </div>
                                            </div>
                                          </div>
                                        </TabPane>
                                        <TabPane tabId={`2${index}`}>
                                          <div>
                                            <div>
                                              <div>
                                                <ul
                                                  className={styles.alltracksde}
                                                  style={{
                                                    height: "200px",
                                                    overflowY: "auto",
                                                    overflowX: "hidden",
                                                    width: "100%",
                                                  }}>
                                                  {item.day_tracks.map(
                                                    (item2, index) => (
                                                      <div
                                                        style={{
                                                          marginTop: "30px",
                                                        }}>
                                                        <li>
                                                          <div>
                                                            <span className="text-primary">
                                                              Trip{" "}
                                                              {item2.trip_id}
                                                            </span>
                                                            <span className="cn_item">
                                                              <i
                                                                uib-tooltip="Play Track"
                                                                tooltip-append-to-body="true"
                                                                tooltip-placement="right"
                                                                className="sprite-icon-all trackplay-icon"
                                                                onClick={() => {
                                                                  handleMoving(
                                                                    item2.trip_id
                                                                  );
                                                                  setPlayTrack(
                                                                    true
                                                                  );
                                                                  setScreenShot(
                                                                    false
                                                                  );
                                                                }}
                                                              />
                                                            </span>
                                                          </div>
                                                        </li>

                                                        <div className="row">
                                                          <div className="col-4">
                                                            <div className="activity-time-track">
                                                              <span className="text-secondary ng-binding">
                                                                {
                                                                  item2.start_time
                                                                }
                                                              </span>
                                                            </div>
                                                            <div className="activity-starttime-track ng-binding">
                                                              Start time
                                                            </div>
                                                          </div>

                                                          <div className="col-4">
                                                            <div className="activity-time-track">
                                                              <span className="text-secondary ng-binding">
                                                                {item2.end_time}
                                                              </span>
                                                            </div>
                                                            <div className="activity-starttime-track ng-binding">
                                                              End time
                                                            </div>
                                                          </div>

                                                          <div className="col-4">
                                                            <div className="activity-time-track">
                                                              <span className="text-secondary ng-binding">
                                                                {
                                                                  item2.trip_distance
                                                                }{" "}
                                                                Km
                                                              </span>
                                                            </div>
                                                            <div className="activity-starttime-track ng-binding">
                                                              Trip Distance
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    )
                                                  )}
                                                </ul>
                                              </div>
                                            </div>
                                          </div>
                                        </TabPane>
                                      </TabContent>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {playTrack && (
        <div>
          <div className={styles.boxpopoverfooter}>
            <div className="row">
              <div className="col square">
                <div className="footer-heading">Vehicle</div>
                <div className="footer-text"> {vehicle} </div>
              </div>
              <div className="col square">
                <div className="footer-heading">IMEI</div>
                <div className="footer-text">{IMEI}</div>
              </div>
              <div className="col square">
                <div className="footer-heading">Date</div>
                <div className="footer-text">{date}</div>
              </div>
              <div className="col square">
                <div className="footer-heading">Time</div>
                <div className="footer-text"> {time}</div>
              </div>
              <div className="col square">
                <div className="footer-heading">Longitude</div>
                <div className="footer-text">{longitude}</div>
              </div>
              <div className="col square">
                <div className="footer-heading">Latitude</div>
                <div className="footer-text">{latitude}</div>
              </div>
              <div className="col square">
                <div className="footer-heading">Speed</div>
                <div className="footer-text">{speed} Km/h</div>
              </div>
              <div className="col square">
                <div className="footer-heading">Mileage</div>
                <div className="footer-text">{mileage}</div>
              </div>
              <div className="col square">
                <div className="footer-heading">Alarms</div>
                <div className="footer-text">{alarms}</div>
              </div>
            </div>
          </div>
          <div className={styles.boxpopoverspeedometer}>
            <RadialGauge
              type="radial-gauge"
              width="180"
              height="180"
              units="Km/h"
              title="Speed"
              value={speed}
              animateOnInit={true}
              animatedValue={true}
              minValue={0}
              maxValue={220}
              majorTicks={[
                0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220,
              ]}
              minorTicks={2}
              strokeTicks="true"
              highlights={[
                { from: 0, to: 50, color: "rgba(0,255,0,.5)" },
                { from: 50, to: 100, color: "rgba(255,255,0,.5)" },
                { from: 100, to: 150, color: "rgba(255,30,0,.5)" },
                { from: 150, to: 200, color: "rgba(255,0,225,.5)" },
                { from: 200, to: 220, color: "rgba(0,0,255,.5)" },
              ]}
              colorPlate="transparent"
              colorMajorTicks="#000000"
              colorMinorTicks="#000000"
              colorTitle="#000"
              colorUnits="#000"
              colorNumbers="#000"
              colorNeedleStart="rgba(240, 128, 128, 1)"
              colorNeedleEnd="rgba(255, 160, 122, .9)"
              valueBox="true"
              animationRule="linear"
              animationDuration="300"
              borderOuterWidth={3}
              borderMiddleWidth={3}
              borderInnerWidth={3}></RadialGauge>
          </div>
        </div>
      )}
    </section>
  );
}

function TravellingMarker({ position, ...rest }) {
  let [coordinates, setDestination] = useMoveMarker([
    position.lat,
    position.lng,
  ]);

  useEffect(() => {
    setDestination([position.lat, position.lng]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);

  return (
    <Marker
      position={{
        lat: coordinates[0],
        lng: coordinates[1],
      }}
      icon={{
        url: "/pin1.png",
        scaledSize: new window.google.maps.Size(30, 30),
      }}
      // {...rest}
    />
  );
}
