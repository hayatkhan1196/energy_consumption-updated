// import axios from "axios";
// import { setListOfAllDevices } from "../../reducers/reply-history/fetchDataDevices";
// import { replayHistoryVehicleApi } from "../../../components/allApis/api";

// export const fetchDataDevices = () => async (dispatch) => {
//   const token = localStorage.getItem("TrackerToken");
//   try {
//     const response = await axios({
//       method: "GET",
//       url: replayHistoryVehicleApi,
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const initialData = response.data.data;
//     dispatch(setListOfAllDevices(initialData));
//   } catch (error) {
//     console.log(error);
//   }
// };
