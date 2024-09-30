// import React, { useState } from 'react';
// import { useHistory } from "react-router";
// import axios from 'axios';
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { login } from './../../../features/user';
// import { currentNavTab } from '../../../features/navTab';
// import './style.css';
// import { RuntimeConfig } from "../../../runTime.config";

// export default function Login() {
//   const dispatch = useDispatch();
//   const [name, setName] = useState("");
//   const [password, setPassword] = useState("");
//   const [providedData, setProvidedData] = useState();
//   const history = useHistory();

//   //http://59.103.233.57:8500

//   //http://192.168.0.240:8500 sft

//   //https://server.localiveiot.com

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     axios({
//       method: "POST",
//       url: `${RuntimeConfig.loginApi}`,
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       data: {
//         email: name,
//         password: password,
//       },
//     })
//       .then((response) => {
//         if (response.data.success === true) {
//           setProvidedData(response.data.data);
//           localStorage.setItem("TrackerToken", response.data.data.token);
//           localStorage.setItem("TrackerName", response.data.data.first_name);
//           localStorage.setItem("TrackerUserId", response.data.data.user_id);
//           dispatch(currentNavTab(2));
//           history.push("/live-tracking");
//         }
//       })
//       .catch((error) => {
//         toast(`${error.response.data.message}`);
//       });
//   };

//   return (
//     <div className="admin-login-section ">
//       <ToastContainer />
//       <div className="admin-login-section-middle">
//         <div className="admin-form-cent">
//           <div className="box-admin">
//             <div className="logo-zfms">
//               <a href>
//                 <span className="cn_item">
//                   <i className="logo" />
//                 </span>
//               </a>
//             </div>
//             <div className="admin-loginform">
//               <form
//                 className="user-sub-form user-sub-formpopup"
//                 onSubmit={handleSubmit}>
//                 <div className="row">
//                   <div className="form-group col-sm-12 fg-float logncol">
//                     <div className="fg-line lable-toggle">
//                       <input
//                         type="text"
//                         formcontrolname="email"
//                         className="form-control"
//                         name="email"
//                         onChange={(e) => setName(e.target.value)}
//                         required
//                       />
//                     </div>
//                     <label className="label-helper ">
//                       <span className="cn_item logicon ">email</span>
//                     </label>
//                   </div>
//                   {/* <div className="alert alert-danger">
//                 <div>
//                   email is required.
//                 </div>
//               </div> */}
//                   <div className="form-group col-sm-12 fg-float logncol">
//                     <div className="fg-line noClass">
//                       <input
//                         type="password"
//                         formcontrolname="password"
//                         className="form-control"
//                         required
//                         onChange={(e) => setPassword(e.target.value)}
//                       />
//                     </div>
//                     <label className="label-helper ">
//                       <span className="cn_item logicon ">Password </span>
//                     </label>
//                   </div>
//                   {/* <div className="alert alert-danger">
//                 <div>
//                   Password is required.
//                 </div>
//               </div> */}
//                   <div className="col-sm-12 btn-submit">
//                     <div className="float-left-left">
//                       <button type="submit" className="btn logn-btn">
//                         Login
//                       </button>
//                     </div>
//                     <div className="float-right-right reset-email forgotPswd">
//                       <span className="btn-title ">Forgot password?</span>
//                     </div>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
