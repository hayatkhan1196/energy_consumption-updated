// actions.js
import axios from "axios";
import {
  setIsLoading,
  setPolicies,
} from "../../reducers/policyData/policyData";
// import { setPolicies, setIsLoading } from "./policySlice"; // Update the import path

export const fetchPolicies = () => async (dispatch) => {
  try {
    // Set isLoading to true before making the API request
    dispatch(setIsLoading(true));

    const Newtoken = localStorage.getItem("CabinetToken");
    const response = await axios.get(
      "http://192.168.0.24:9000/policy/allpolicies",
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${Newtoken}`,
        },
      }
    );
    const initialData = response.data.policies;
    initialData.sort((a, b) => b._id.localeCompare(a._id));
    dispatch(setPolicies(initialData));

    // Set isLoading to false after the API request is complete
    dispatch(setIsLoading(false));
  } catch (error) {
    console.log(error);

    // Make sure to set isLoading to false in case of an error as well
    dispatch(setIsLoading(false));
  }
};
