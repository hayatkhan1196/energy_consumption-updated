import React, { useState, useEffect } from 'react';
import "./style.css";
import {  BrowserRouter, Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { currentNavTab } from "../../Redux/reducers/NavTab";
// import TagIcon from "@mui/icons-material/Tag";
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import NavbarTabs from './sideBarTab';
import IconWithText from './sideBarTab';

export default function Sidebar() {
  return (
    <div
     
      id="sidebar-tab"
      className="max-height-sidebar ng-scope _mCS_8 mCS-autoHide ng-isolate-scope mCustomScrollbar _mCS_1"
      style={{ overflow: "visible" }}>
      <div
        id="mCSB_1"
        className="mCustomScrollBox mCS-minimal-dark mCSB_vertical_horizontal mCSB_outside"
        style={{ maxHeight: "none" }}
        tabIndex={0}>
        <div
          id="mCSB_1_container"
          className="mCSB_container mCS_x_hidden mCS_no_scrollbar_x"
          style={{ position: "relative", top: 0, left: 0, width: "100%" }}
          dir="ltr">
          <div>
            {" "}
            <NavbarTabs  />
          </div>

          {/* <ul className="noclass adjustableHeight"> */}
          {/* <li
              className="sidebar-list ulHeight"
              ui-sref="reportDashboard"
              ui-sref-active="active"
              ui-sref-opts="{}"
              onClick={() => dispatch(currentNavTab(1))}
              className={navTab === 1 ? "active" : ""}>
              <Link to="/dashboard">
                <span className="cn_item ">
                  <i className="sprite-icon-tab dashboard-icon"></i>
                </span>
                <span className="tab-span ng-binding">Dashboard</span>
              </Link>
            </li> */}
          {/* <li
              className="sidebar-list ulHeight"
              ui-sref-active="active"
              ui-sref-opts="{inherit: false,reload: true}"
              onClick={() => dispatch(currentNavTab(2))}
              className={navTab === 2 ? "active" : ""}>
              <Link to="/live-tracking">
                <span className="cn_item ">
                  <i className="sprite-icon-tab tab-icon7" />
                </span>
                <span className="tab-span ng-binding">
                  LIVE<span className="ng-binding">TRACKING</span>
                </span>
              </Link>
            </li> */}
          {/* <li
              ng-if="webFecture.replayTrackFreq"
              className="sidebar-list ulHeight"
              ui-sref="trackReplay"
              ui-sref-active="active"
              ui-sref-opts="{inherit: false,reload: true, notify: true,cache: false}"
              onClick={() => dispatch(currentNavTab(3))}
              className={navTab === 3 ? "active" : ""}>
              <Link to="/replay-history">
                <span className="cn_item ">
                  <i className="sprite-icon-tab tab-icon2" />
                </span>
                <span className="tab-span ng-binding">
                  REPLAY<span className="ng-binding">HISTORY</span>
                </span>
              </Link>
            </li> */}
          {/* <li
              ng-if="webFecture.AlarmNotif"
              className="sidebar-list ulHeight"
              ui-sref="alerts"
              ui-sref-active="active"
              ui-sref-opts="{}"
              onClick={() => dispatch(currentNavTab(4))}
              className={navTab === 4 ? "active" : ""}>
              <Link to="/geo-fence">
                <span className="cn_item ">
                  <PinDropOutlinedIcon
                    sx={{ fontSize: "35px", color: "#C8C8C8 " }}
                  />
                </span>
                <span className="tab-span ng-binding">GEO FENCE</span>
              </Link>
            </li> */}
          {/* <li
              ng-if="webFecture.AlarmNotif"
              className="sidebar-list ulHeight"
              ui-sref="alerts"
              ui-sref-active="active"
              ui-sref-opts="{}"
              onClick={() => dispatch(currentNavTab(5))}
              className={navTab === 5 ? "active" : ""}>
              <Link to="/alerts">
                <span className="cn_item ">
                  <i className="sprite-icon-tab tab-icon3" />
                </span>
                <span className="tab-span ng-binding">ALERTS</span>
              </Link>
            </li> */}
          {/* <li
              ng-show="webFecture.fleetReport"
              className="sidebar-list ulHeight"
              ui-sref="reports"
              ui-sref-active="active"
              ui-sref-opts="{}"
              onClick={() => dispatch(currentNavTab(6))}
              className={navTab === 6 ? "active" : ""}>
              <Link to="/reports">
                <span className="cn_item ">
                  <i className="sprite-icon-tab tab-icon6" />
                </span>
                <span className="tab-span ng-binding">
                  REPORT<span className="ng-binding">MANAGEMENT</span>
                </span>
              </Link>
            </li> */}
          {/* <li
              ng-show="webFecture.fleetReport"
              className="sidebar-list ulHeight"
              ui-sref="reports"
              ui-sref-active="active"
              ui-sref-opts="{}"
              onClick={() => dispatch(currentNavTab(7))}
              className={navTab === 7 ? "active" : ""}>
              <Link to="/vehicle-registration">
                <span className="cn_item ">
                  <DirectionsCarFilledOutlinedIcon
                    sx={{ fontSize: "30px", color: "#C8C8C8 " }}
                  />
               
                </span>
                <span className="tab-span ng-binding">
                  Vehicle<span className="ng-binding">Registration</span>
                </span>
              </Link>
            </li> */}
          {/* <li
              ng-show="webFecture.fleetReport"
              className="sidebar-list ulHeight"
              ui-sref="reports"
              ui-sref-active="active"
              ui-sref-opts="{}"
              onClick={() => dispatch(currentNavTab(8))}
              className={navTab === 8 ? "active" : ""}>
              <Link to="/driver-registration">
                <span className="cn_item ">
                  <i className="sprite-icon-tab tab-icon6" />
                </span>
                <span className="tab-span ng-binding">
                  Driver<span className="ng-binding">Registration</span>
                </span>
              </Link>
            </li> */}
          {/* </ul> */}
          <div className="clearfix" />
        </div>
      </div>
      <div
        id="mCSB_1_scrollbar_vertical"
        className="mCSB_scrollTools mCSB_1_scrollbar mCS-minimal-dark mCSB_scrollTools_vertical"
        style={{ display: "block" }}>
        <div className="mCSB_draggerContainer">
          <div
            id="mCSB_1_dragger_vertical"
            className="mCSB_dragger"
            style={{
              position: "absolute",
              minHeight: 50,
              height: 137,
              top: 0,
              display: "block",
              maxHeight: 258,
            }}>
            <div className="mCSB_dragger_bar" style={{ lineHeight: 50 }}></div>
          </div>
          <div className="mCSB_draggerRail" />
        </div>
      </div>
      <div
        id="mCSB_1_scrollbar_horizontal"
        className="mCSB_scrollTools mCSB_1_scrollbar mCS-minimal-dark mCSB_scrollTools_horizontal"
        style={{ display: "none" }}>
        <div className="mCSB_draggerContainer">
          <div
            id="mCSB_1_dragger_horizontal"
            className="mCSB_dragger"
            style={{ position: "absolute", minWidth: 50, width: 0, left: 0 }}>
            <div className="mCSB_dragger_bar" />
          </div>
          <div className="mCSB_draggerRail" />
        </div>
      </div>
    </div>
  );
}

// import React, { useState } from "react";
// import {
//   FaTh,
//   FaBars,
//   FaUserAlt,
//   FaRegChartBar,
//   FaCommentAlt,
//   FaShoppingBag,
//   FaThList,
// } from "react-icons/fa";
// import { NavLink } from "react-router-dom";

// const Sidebar = ({ children }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggle = () => setIsOpen(!isOpen);

//   const [expandedMenus, setExpandedMenus] = useState([]);

//   const handleToggleMenu = (index) => {
//     if (expandedMenus.includes(index)) {
//       setExpandedMenus(expandedMenus.filter((item) => item !== index));
//     } else {
//       setExpandedMenus([...expandedMenus, index]);
//     }
//   };

//   const isMenuExpanded = (index) => {
//     return expandedMenus.includes(index);
//   };

//   const menuItem = [
//     {
//       path: "/",
//       name: "Dashboard",
//       icon: <FaTh />,
//     },
//     {
//       path: "/about",
//       name: "About",
//       icon: <FaUserAlt />,
//       children: [
//         {
//           path: "/about/company",
//           name: "Company",
//         },
//         {
//           path: "/about/team",
//           name: "Team",
//         },
//         // Add more child menu items here
//       ],
//     },
//     {
//       path: "/analytics",
//       name: "Analytics",
//       icon: <FaRegChartBar />,
//     },
//     {
//       path: "/comment",
//       name: "Comment",
//       icon: <FaCommentAlt />,
//     },
//     {
//       path: "/product",
//       name: "Product",
//       icon: <FaShoppingBag />,
//       children: [
//         {
//           path: "/product/list",
//           name: "Product List",
//         },
//         {
//           path: "/product/add",
//           name: "Add Product",
//         },
//         // Add more child menu items here
//       ],
//     },
//     {
//       path: "/productList",
//       name: "Product List",
//       icon: <FaThList />,
//     },
//   ];

//   return (
//     <div className="container">
//       <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
//         <div className="top_section">
//           {/* <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
//             Logo
//           </h1> */}
//           <div
//             style={{ marginLeft: isOpen ? "150px" : "0px" }}
//             className="bars">
//             <FaBars onClick={toggle} />
//           </div>
//         </div>
//         {menuItem.map((item, index) => (
//           <NavLink
//             to={item.path}
//             key={index}
//             className="link"
//             activeclassName="active">
//             <div className="icon">{item.icon}</div>
//             <div
//               style={{ display: isOpen ? "block" : "none" }}
//               className="link_text">
//               {item.name}
//             </div>
//           </NavLink>
//         ))}
//       </div>
//       <main>{children}</main>
//     </div>
//   );
// };

// export default Sidebar;
