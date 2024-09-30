import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useSelector } from "react-redux";
import HomeIcon from "@mui/icons-material/Home";
import "./style.css";
import { Link, NavLink } from "react-router-dom";
// import MiniNavbar from "./miniNavBar";
import CustomNavLink from "./customLink";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import MiniNavbar from "./MiniNavBar/miniNavBar";
import { useHistory } from "react-router-dom";
import RuleManagement from "../../pages/Rule Management/ruleManagement";

const Navbar = (props) => {
  const history = useHistory();

  const user = useSelector((state) => state.user.value);
  const isloggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [isLoggedIn, setLoggedIn] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const onLogout = () => {
    setLoggedIn(false);
  };

  const handleLogout = () => {
    onLogout();
    history.push("/");
  };
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        // Firefox
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        // Chrome, Safari and Opera
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        // IE/Edge
        document.documentElement.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        // Chrome, Safari and Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        // IE/Edge
        document.msExitFullscreen();
      }
    }

    setIsFullScreen(!isFullScreen);
  };

  return (
    <>
      <header id="header">
        <div className="main-head-top">
          <div style={{ overflow: "hidden" }}>
            {/* <div id="menu-trigger" className="visible-xs">
              <span className="cn_item"></span>
            </div> */}
            <div className=" float-left-left">
              <div className="logo">
                <a
                  ui-sref-active="active"
                  ui-sref-opts="{inherit: false,reload: true}">
                  <span className="cn_item">
                    <i />
                  </span>
                </a>
              </div>
            </div>
            <div>
              <ul
                className="col-8 float-left-left top-menu"
                style={{
                  borderRadius: "50%",
                  display: "flex",
                  marginTop: "15px",
                }}>
                <li className="nav-item" style={{ marginRight: "40px" }}>
                  <CustomNavLink to="/live-tracking" text="Dashboard" />
                </li>
                <li className="nav-item" style={{ marginRight: "40px" }}>
                  <CustomNavLink to="/ruleManagement" text="Rule Management" />
                </li>
                <li className="nav-item" style={{ marginRight: "40px" }}>
                  <CustomNavLink
                    to="StatisticalAnalysis"
                    text="Statistical Analysis"
                  />
                </li>
                <li className="nav-item" style={{ marginRight: "40px" }}>
                  <CustomNavLink to="/reports" text="Reports" />
                </li>
                {/* <li className="nav-item" style={{ marginRight: "40px" }}>
                <CustomNavLink to="/PolicyComponent" text="policy" />
              </li> */}
              </ul>
              <div
                className=" row float-right-right list-header-right hidden-xs headerRight ng-scope"
                ng-if="isAllowed">
                <div className="col-4 user-name">
                  {user.name}
                  {isFullScreen ? (
                    <span
                      className="fullscreen-exit-icon"
                      style={{ cursor: "pointer" }}
                      onClick={toggleFullScreen}>
                      <FullscreenExitIcon />
                    </span>
                  ) : (
                    <span
                      onClick={toggleFullScreen}
                      style={{ cursor: "pointer" }}>
                      <FullscreenIcon />
                    </span>
                  )}
                </div>
                <ul
                  className="col-8 "
                  style={{
                    borderRadius: "50%",
                    marginTop: "5px",
                  }}>
                  <Dropdown
                    style={{
                      zIndex: 100,
                    }}
                    isOpen={dropdownOpen}
                    toggle={toggle}>
                    <DropdownToggle
                      caret
                      color="white"
                      style={{ color: "#fff" }}>
                      <i
                        className="fas fa-2x fa-user-circle"
                        style={{ color: "#fff" }}></i>
                    </DropdownToggle>
                    {isLoggedIn && (
                      <DropdownMenu
                        onClick={handleLogout}
                        style={{
                          marginTop: "20px",
                          height: "60px",
                          marginRight: "20px",
                        }}>
                        {/* <DropdownItem>Profile</DropdownItem> */}
                        <DropdownItem>LogOut</DropdownItem>
                      </DropdownMenu>
                    )}
                  </Dropdown>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <MiniNavbar />
      </header>
    </>
  );
};

export default Navbar;
